"use client";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Checkbox, HR } from "flowbite-react";
import { enableMapSet, produce } from "immer";
import { useState } from "react";
import { useEffectOnce } from "react-use";

import { ScoringInput } from "@/components/scoring-input";
import { AllianceColor } from "@/constants/enums";
import { TeamMatch } from "@/types/match";
import {
  MatchCollection,
  TeamPropertiesCollection,
} from "@/types/team-properties";
import { MatchesSchema, TeamMatchSchema } from "@/utils/schemas";

const client = new ApolloClient({
  uri: "https://api.ftcscout.org/graphql",
  cache: new InMemoryCache(),
});

export interface Root {
  networkStatus: number;
  loading: boolean;
  data: Data;
}

export interface Team2 {
  number: number;
  name: string;
}

export interface Data {
  eventByCode: EventByCode;
}

export interface EventByCode {
  teams: Team[];
}

export interface Team {
  team: Team2;
}

type MatchStatus = Map<
  number,
  Array<{ color: AllianceColor; selected: boolean; team: number }>
>;

export default function Manual() {
  const [matchAmount, setMatchAmount] = useState<Array<number>>([]);
  const [result, setResult] = useState<Root>();
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  const [matchStatus, setMatchStatus] = useState<MatchStatus>(new Map());
  const [database, setDatabase] = useState<MatchCollection>([]);
  const [matchesPerTeam, setMatchesPerTeam] = useState<number>();

  enableMapSet();

  useEffectOnce(() => {
    client
      .query({
        query: gql`
          query {
            eventByCode(code: "USWAPALT1", season: 2024) {
              teams {
                team {
                  number
                  name
                }
              }
            }
          }
        `,
      })
      .then((result: Root) => {
        setResult(result);
      });
  });
  if (!result) return <>Loading</>;
  return (
    <>
      <ScoringInput
        onChange={(num) => {
          if (num > matchAmount.length) {
            setMatchAmount(
              produce(matchAmount, (draft) => {
                draft.push(num);
              }),
            );
            setMatchStatus(
              produce(matchStatus, (draft) => {
                const populate: Array<{
                  color: AllianceColor;
                  selected: boolean;
                  team: number;
                }> = [];
                result.data.eventByCode.teams.forEach((team) => {
                  populate.push({
                    color: AllianceColor.Red,
                    team: team.team.number,
                    selected: false,
                  });
                });
                draft.set(num, populate);
              }),
            );
          } else {
            setMatchAmount(
              produce(matchAmount, (draft) => {
                draft.pop();
              }),
            );
            setMatchStatus(
              produce(matchStatus, (draft) => {
                draft.delete(num);
              }),
            );
          }
        }}
        description="Match Amount"
        defaultValue={0}
      />
      <HR />
      <ScoringInput
        onChange={(num) => {
          setMatchesPerTeam(num);
        }}
        description="Matches Per Team"
        defaultValue={0}
      />
      <HR />
      <form>
        <select>
          {matchAmount.map((value, index) => {
            return (
              <option
                onClick={(event) => {
                  setCurrentMatch(Number(event.currentTarget.value));
                }}
                key={index}
              >
                {value}
              </option>
            );
          })}
        </select>
      </form>
      <HR />
      {!(currentMatch === 0)
        ? result.data.eventByCode.teams.map((team) => {
            return (
              <div key={team.team.number}>
                <Checkbox
                  onClick={() => {
                    setMatchStatus(
                      produce(matchStatus, (draft) => {
                        const result = draft
                          .get(currentMatch)
                          ?.find((value) => value.team === team.team.number);
                        result!.selected = !result!.selected;
                      }),
                    );
                  }}
                  checked={
                    matchStatus
                      .get(currentMatch)
                      ?.find((value) => value.team === team.team.number)
                      ?.selected
                  }
                  key={team.team.number}
                />
                {team.team.number}
                <button
                  onClick={() => {
                    setMatchStatus(
                      produce(matchStatus, (draft) => {
                        const result = draft
                          .get(currentMatch)
                          ?.find((value) => value.team === team.team.number);
                        result!.color = AllianceColor.Red;
                      }),
                    );
                  }}
                  className={
                    matchStatus
                      .get(currentMatch)
                      ?.find((value) => value.team === team.team.number)
                      ?.color === AllianceColor.Red
                      ? "bg-red-500"
                      : "bg-red-100"
                  }
                >
                  Red
                </button>
                <button
                  onClick={() => {
                    setMatchStatus(
                      produce(matchStatus, (draft) => {
                        const result = draft
                          .get(currentMatch)
                          ?.find((value) => value.team === team.team.number);
                        result!.color = AllianceColor.Blue;
                      }),
                    );
                  }}
                  className={
                    matchStatus
                      .get(currentMatch)
                      ?.find((value) => value.team === team.team.number)
                      ?.color === AllianceColor.Blue
                      ? "bg-blue-500"
                      : "bg-blue-100"
                  }
                >
                  Blue
                </button>
                <div />
              </div>
            );
          })
        : undefined}
      <HR />
      <button
        onClick={() => {
          const collection: MatchCollection = [];
          const occurrences = new Array<number>();
          matchStatus.forEach((team, key) => {
            const extract: Array<TeamMatch> = [];
            team.forEach((detail) => {
              if (detail.selected) {
                occurrences.push(detail.team);
                extract.push(
                  TeamMatchSchema(
                    result!.data.eventByCode.teams.find(
                      (value) => value.team.number === detail.team,
                    )!.team.name,
                    detail.team,
                    detail.color,
                  ),
                );
              }
            });
            collection.push(
              MatchesSchema(
                key,
                extract[0],
                extract[1],
                extract[2],
                extract[3],
              ),
            );
          });
          result.data.eventByCode.teams.forEach((team) => {
            if (
              !(
                occurrences.filter((value) => value === team.team.number)
                  .length === matchesPerTeam ||
                occurrences.filter((value) => value === team.team.number)
                  .length === 0
              )
            ) {
              alert(
                `enter data doesn't match the correct matches per team for ${team}`,
              );
            }
          });
          setDatabase(collection);
          navigator.clipboard.writeText(JSON.stringify(collection));
        }}
      >
        Copy Matches
      </button>
      <button
        onClick={() => {
          const data = new Map<number, Array<number>>();
          if (database.length === 0) alert("Please select copy matches");
          database.forEach((value) => {
            value.teams.forEach((teamMatch) => {
              if (data.get(teamMatch.team)) {
                data.set(
                  teamMatch.team,
                  produce(data.get(teamMatch.team)!, (draft) => {
                    draft.push(value.match);
                  }),
                );
              } else {
                data.set(teamMatch.team, [value.match]);
              }
            });
          });
          const collection: TeamPropertiesCollection = [];
          data.forEach((matches, team) => {
            collection.push({
              name: database
                .find(
                  (match) =>
                    match.teams.find((value) => value.team)?.team === team,
                )
                ?.teams.find((value) => value.team === team)!.name as string,
              matches: matches as MatchNumber[],
              team: team as TeamNumber,
              rank: -1,
            });
          });
          navigator.clipboard.writeText(JSON.stringify(collection));
        }}
      >
        Copy Team Properties
      </button>
    </>
  );
}
