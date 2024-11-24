"use client";
import { Button } from "flowbite-react";
import { produce } from "immer";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { useEffectOnce } from "react-use";

import { COMPETITION } from "@/constants/competition";
import { localDraftAtom } from "@/store/local-draft";
import { matchAtom } from "@/store/match";
import { MatchCollection } from "@/types/team-properties";

export default function Home() {
  const [response, setResponse] = useState<MatchCollection>();
  const [matchNumber, setMatchNumber] = useAtom(matchAtom);
  const [cursor, setCursor] = useState<number>(0);
  const [localDraft, setLocalDraft] = useAtom(localDraftAtom);

  useEffectOnce(() => {
    fetch("/api/fetch-matches", {
      method: "POST",
      body: JSON.stringify({ collection: COMPETITION, matches: [] }),
    }).then(async (value) => {
      const matchData: MatchCollection = await value.json();
      setResponse(matchData);
    });
  });

  console.log(response);

  return (
    <div className="grid justify-center bg-gradient-to-b from-teal-400 from-20% via-teal-700 via-30% to-teal-900 to-85% text-white">
      <form>
        <select
          className="rounded-md text-black"
          name="matchNumber"
          id="matchNumber"
          defaultValue="Match Number"
          required
        >
          <option className="text-gray-500" disabled>
            Match Number
          </option>
          {!(response === undefined) ? (
            response.map((match) => {
              return (
                <option
                  onClick={() => {
                    setMatchNumber(match.match);
                    produce(localDraft, (draft) => {
                      draft.name = match.teams[cursor].name;
                      draft.team = match.teams[cursor].team;
                      draft.color = match.teams[cursor].color;
                    });
                  }}
                  key={match.match}
                >
                  {match.match}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </select>
        <div className="mb-5" />
        <select
          className="rounded-md text-black"
          name="matchNumber"
          id="matchNumber"
          defaultValue="Team Number"
          required
        >
          <option className="text-gray-500" value={"Team Number"} disabled>
            Team Number
          </option>
          {!(response === undefined) ? (
            response
              ?.find((val) => val.match === matchNumber)
              ?.teams.map((value, i) => {
                return (
                  <option
                    disabled={value.scouted}
                    onClick={() => {
                      setCursor(i);
                      setLocalDraft(
                        produce(localDraft, (draft) => {
                          draft.name = value.name;
                          draft.team = value.team;
                          draft.color = value.color;
                        }),
                      );
                    }}
                    key={i}
                  >
                    {value.team}
                  </option>
                );
              })
          ) : (
            <></>
          )}
        </select>
        <div className="mb-5" />
        <Button type="submit" className="flex justify-center">
          <Link href={"/auto"}> Continue</Link>
        </Button>
      </form>
    </div>
  );
}
