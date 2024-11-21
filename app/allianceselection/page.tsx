"use client";
import { Modal } from "flowbite-react";
import { useState } from "react";

fetch("/api/fetch-matches", {
  method: "POST",
  body: JSON.stringify({ collection: "League Meet 1", matches: [] }),
}).then(async (value) => {
  if (value.ok) {
    console.log(value);
  }
});

export default function Home() {
  return (
    <div className="grid justify-center bg-gradient-to-b from-teal-400 from-20% via-teal-700 via-30% to-teal-900 to-85% text-white">
      <form>
        <label htmlFor="matchNumber"></label>
        <select
          className="rounded-md text-black"
          name="matchNumber"
          id="matchNumber"
        >
          <option>Match Number</option>
          <option>1</option>
        </select>
        <br></br>
      </form>
    </div>
  );
}
