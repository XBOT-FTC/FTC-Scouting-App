"use client";
import { Button } from "flowbite-react";
import { produce } from "immer";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffectOnce } from "react-use";

import { COMPETITION } from "@/constants/competition";
import { matchAtom } from "@/store/match";
import { scoutAtom } from "@/store/scout";
import { MatchCollection } from "@/types/team-properties";
import { TeamMatchSchema } from "@/utils/schemas";

export default function Home() {
  const [response, setResponse] = useState<MatchCollection>();
  const [matchNumber, setMatchNumber] = useAtom(matchAtom);
  const [team, setTeam] = useState<number>(0);
  const [cursor, setCursor] = useState<number>(0);
  const [scoutData, setScoutData] = useAtom(scoutAtom);
  const router = useRouter();

  useEffectOnce(() => {
    fetch("/api/fetch-matches", {
      body: JSON.stringify({ collection: COMPETITION, matches: [] }),
      method: "POST",
    }).then(async (value) => {
      const matchData: MatchCollection = await value.json();
      setResponse(matchData);
    });
  });

  return (
    <div className="grid justify-center bg-gradient-to-b from-teal-400 from-20% via-teal-700 via-30% to-teal-900 to-85% text-white">
      <select
        onChange={(event) => {
          setMatchNumber(Number(event.currentTarget.value));
          const match = response!.find(
            (value) => value.match === Number(event.currentTarget.value),
          )!;
          setScoutData(
            produce(scoutData, (draft) => {
              draft.name = match.teams[cursor].name;
              draft.team = match.teams[cursor].team;
              draft.color = match.teams[cursor].color;
            }),
          );
        }}
        className="rounded-md text-black"
        defaultValue="Match Number"
        name="matchNumber"
        id="matchNumber"
      >
        <option className="text-gray-500" disabled>
          Match Number
        </option>
        {!(response === undefined) ? (
          response.map((match) => {
            return <option key={match.match}>{match.match}</option>;
          })
        ) : (
          <></>
        )}
      </select>
      <div className="mb-5" />
      <select
        onChange={(event) => {
          setTeam(Number(event.currentTarget.value));
          const match = response!.find((value) => value.match === matchNumber)!;
          setCursor(
            match.teams.findIndex(
              (value) => value.team === Number(event.currentTarget.value),
            ),
          );
          setScoutData(
            produce(scoutData, (draft) => {
              const result = response
                ?.find((match) => match.match === matchNumber)
                ?.teams.find(
                  (team) => team.team === Number(event.currentTarget.value),
                );
              draft.name = result!.name;
              draft.team = result!.team;
              draft.color = result!.color;
            }),
          );
        }}
        className="rounded-md text-black"
        defaultValue="Team Number"
        name="matchNumber"
        id="matchNumber"
      >
        <option
          className="text-gray-500"
          value={"Team Number"}
          key={team}
          disabled
        >
          Team Number
        </option>
        {response ? (
          response
            ?.find((val) => val.match === matchNumber)
            ?.teams.map((value, i) => {
              return (
                <option disabled={value.scouted} key={i}>
                  {value.team}
                </option>
              );
            })
        ) : (
          <></>
        )}
      </select>
      <div className="mb-5" />
      <Button
        onClick={() => {
          if (!(team === 0 || matchNumber === 0)) {
            const result = response
              ?.find((match) => match.match === matchNumber)
              ?.teams.find((value) => value.team === team);
            setScoutData(
              TeamMatchSchema(result!.name, result!.team, result!.color),
            );
            router.push("/auto");
          }
        }}
        disabled={team === 0 || matchNumber === 0}
      >
        Continue
      </Button>
    </div>
  );
}
