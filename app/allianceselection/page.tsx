"use client";
import { useQuery, gql } from "@apollo/client";
import { Modal } from "flowbite-react";
import { useState } from "react";

const getAllianceColor = gql`
  query {
    eventByCode(code: "USWAHALT", season: 2023) {
      matches {
        matchNum
        teams {
          alliance
          teamNumber
        }
      }
    }
  }
`;

//get alliance color
function DisplayTeamNum() {
  const { loading, error, data } = useQuery(getAllianceColor);
}

export default function Home() {
  return (
    <div className="grid justify-center bg-gradient-to-b from-teal-400 from-20% via-teal-700 via-30% to-teal-900 to-85% text-white">
      <div>
        <button
          type="button"
          className="mt-10 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100"
        >
          Drop down match#
        </button>
      </div>

      <div className="mt-10 box-content grid justify-center border-black bg-white">
        <div className="grid justify-center text-sm text-black">
          <p>Alliance Color</p>
        </div>
        <div className="gap-x-1.5 justify-self-start bg-transparent">
          <button className="aspect-square bg-blue-700 text-center text-white">
            BLUE
          </button>
          <button className="aspect-square bg-red-700 text-center text-white">
            RED
          </button>
        </div>
      </div>
    </div>
  );
}
