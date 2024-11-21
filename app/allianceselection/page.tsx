"use client";
import { MatchCollection } from "@/types/team-properties";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function Home() {
  const [response, setResponse] = useState<MatchCollection>();

  useEffectOnce(() => {
    fetch("/api/fetch-matches", {
      method: "POST",
      body: JSON.stringify({ collection: "League Meet 1", matches: [] }),
    }).then(async (value) => {
      const matchData: MatchCollection = await value.json();
      setResponse(matchData);
      alert("match data:" + matchData.length);
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
        <label htmlFor="matchNumber"></label>
        <select
          className="rounded-md text-black"
          name="matchNumber"
          id="matchNumber"
        >
          <option disabled>Match Number</option>
          {response?.map((matchNum) => {
            return <option>{matchNum.match}</option>;
          })}
        </select>
        <br></br>
      </form>
    </div>
  );
}
