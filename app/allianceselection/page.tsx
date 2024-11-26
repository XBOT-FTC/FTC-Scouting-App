"use client";
import { SetStateAction, useState } from "react";
import { useEffectOnce } from "react-use";

import { MatchCollection } from "@/types/team-properties";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [response, setResponse] = useState<MatchCollection>();

  useEffectOnce(() => {
    fetch("/api/fetch-matches", {
      method: "POST",
      body: JSON.stringify({
        collection: "League Meet 1",
        matches: [],
      }),
    }).then(async (value) => {
      const matchData: MatchCollection = await value.json();
      setResponse(matchData);
      alert("match data: " + matchData.length);
      // const selectElement = document.getElementById("matchNumber");
      // for (let i = 1; i < matchData.length + 1; i++) {
      //   const option = document.createElement("option");
      //   option.value = i.toString();
      //   option.text = i.toString();
      //   selectElement?.appendChild(option);
      // }
    });
  });

  return (
    <div className="grid justify-center bg-gradient-to-b from-teal-400 from-20% via-teal-700 via-30% to-teal-900 to-85% text-white">
      <form>
        <label htmlFor="matchNumber" />
        <select
          className="rounded-md text-black"
          name="matchNumber"
          id="matchNumber"
          onChange={(event) => {
            setSelectedValue(Number(event.target.value));
            alert(selectedValue);
          }}
          required
        >
          <option disabled>Match Number</option>
          {response?.map((match) => {
            return (
              <option value={match.match} key={match.match}>
                {match.match}
              </option>
            );
          })}
        </select>
        <select className="" name="teamNums" id="teamNums" aria-hidden={true}>
          <div className="aspect-square w-28 flex-auto justify-center bg-blue-700">
            blahblahblah
          </div>
        </select>
      </form>
      <div className="grid justify-center bg-transparent p-2 text-xl md:p-4 lg:p-8">
        Blue Alliance
        <div className="flex aspect-square justify-center bg-blue-800 text-xl text-white"></div>
      </div>
    </div>
  );
}
