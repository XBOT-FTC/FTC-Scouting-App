"use client";
import { Modal } from "flowbite-react";
import { useState } from "react";

const items: any[] = [];
const dropdown = document.getElementById("matches");
fetch("/api/fetch-matches", {
  method: "POST",
  body: JSON.stringify({ collection: "League Meet 1", matches: [] }),
}).then(async (value) => {});

items.forEach((item) => {
  const option = document.createElement("option");
  option.value = item.replace("", "");
  option.textContent = item;
  dropdown?.appendChild(option);
});

export default function Home() {
  return (
    <div className="grid justify-center bg-gradient-to-b from-teal-400 from-20% via-teal-700 via-30% to-teal-900 to-85% text-white">
      <form>
        <label htmlFor="matchNumber">Match #:</label>
        <select name="matchNumber" id="matchNumber"></select>
        <br></br>
      </form>
      <div className=""></div>
    </div>
  );
}
