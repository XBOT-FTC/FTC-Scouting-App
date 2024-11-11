/* eslint-disable prefer-const */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useAtom } from "jotai";
import { WithId } from "mongodb";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";

import { SelectInputText } from "@/components/select-input-text";
import { sortAtom } from "@/store/sort";
import { Statistics } from "@/types/statistics";
import { Match } from "@/types/team-properties";
import { CalculatePoints } from "@/utils/calculate-points";
import { StatisticsSchema } from "@/utils/schemas";

//DESIGNS:
//Highest Points, Basket, Specimen, Climb, Total
//Lowest Points, Basket, Specimen, Climb, Total
//Average Points, Basket, Specimen, Climb, Total

export default function Leaderboard() {
  const [low, setLow] = useState<Map<TeamNumber, Statistics>>(new Map());
  const [high, setHigh] = useState<Map<TeamNumber, Statistics>>(new Map());
  const [average, setAverage] = useState<Map<TeamNumber, Statistics>>(
    new Map(),
  );
  const [display, setDisplay] = useAtom<Array<Statistics>>(sortAtom);
  const [filter, setFilter] = useState<
    "basket" | "specimen" | "climb" | "total"
  >("total");
  const [sort, setSort] = useState<"average" | "minimum" | "maximum">(
    "minimum",
  );

  useEffectOnce(() => {
    fetch("/api/fetch-matches", {
      method: "POST",
      body: JSON.stringify([]),
    }).then(async (value) => {
      const average: Map<TeamNumber, Statistics> = new Map();
      const low: Map<TeamNumber, Statistics> = new Map();
      const high: Map<TeamNumber, Statistics> = new Map();
      const occurrence = new Map<TeamNumber, number>();
      const response: Array<WithId<Match>> = await value.json();

      response.forEach((match) => {
        match.teams.forEach((matchData) => {
          const calculation = CalculatePoints(matchData);
          if (average.get(matchData.team) === undefined) {
            average.set(
              matchData.team,
              StatisticsSchema(matchData.name, matchData.team),
            );
            low.set(
              matchData.team,
              StatisticsSchema(matchData.name, matchData.team),
            );
            high.set(
              matchData.team,
              StatisticsSchema(matchData.name, matchData.team),
            );
          }

          if (calculation.total > high.get(matchData.team)!.total) {
            high.set(matchData.team, {
              ...high.get(matchData.team)!,
              total: calculation.total,
            });
          }
          if (calculation.climb > high.get(matchData.team)!.climb) {
            high.set(matchData.team, {
              ...high.get(matchData.team)!,
              climb: calculation.climb,
            });
          }
          if (calculation.specimen > high.get(matchData.team)!.specimen) {
            high.set(matchData.team, {
              ...high.get(matchData.team)!,
              specimen: calculation.specimen,
            });
          }
          if (calculation.basket > high.get(matchData.team)!.basket) {
            high.set(matchData.team, {
              ...high.get(matchData.team)!,
              basket: calculation.basket,
            });
          }

          if (calculation.total < low.get(matchData.team)!.total) {
            low.set(matchData.team, {
              ...low.get(matchData.team)!,
              total: calculation.total,
            });
          }
          if (calculation.climb < low.get(matchData.team)!.climb) {
            low.set(matchData.team, {
              ...low.get(matchData.team)!,
              climb: calculation.climb,
            });
          }
          if (calculation.specimen < low.get(matchData.team)!.specimen) {
            low.set(matchData.team, {
              ...low.get(matchData.team)!,
              specimen: calculation.specimen,
            });
          }
          if (calculation.basket < low.get(matchData.team)!.basket) {
            low.set(matchData.team, {
              ...low.get(matchData.team)!,
              basket: calculation.basket,
            });
          }

          average.set(matchData.team, {
            ...average.get(matchData.team)!,
            basket: average.get(matchData.team)!.basket + calculation.basket,
            climb: average.get(matchData.team)!.climb + calculation.climb,
            specimen:
              average.get(matchData.team)!.specimen + calculation.specimen,
            total: average.get(matchData.team)!.total + calculation.total,
          });
          occurrence.set(
            matchData.team,
            (occurrence.get(matchData.team) || 0) + 1,
          );
        });
      });
      setLow(low);
      setHigh(high);
      occurrence.forEach((divide, teamNumber) => {
        const prev = average.get(teamNumber)!;
        average.set(teamNumber, {
          basket: prev.basket / divide,
          climb: prev.climb / divide,
          name: prev.name,
          specimen: prev.specimen / divide,
          team: prev.team,
          total: prev.total / divide,
        });
      });
      setAverage(average);
    });
  });

  useEffect(() => {
    const arrLow = new Array<Statistics>();
    const arrHigh = new Array<Statistics>();
    const arrAverage = new Array<Statistics>();

    low.forEach((value) => {
      arrLow.push(value);
    });
    high.forEach((value) => {
      arrHigh.push(value);
    });
    average.forEach((value) => {
      arrAverage.push(value);
    });

    //potential function to reduce lines
    // function thing(
    //   filter: "total" | "climb" | "specimen" | "basket",
    //   sort: "maximum" | "minimum" | "average",
    // ) {
    //   if (sort === "maximum") {
    //     setDisplay(arrHigh.sort((a, b) => a[filter] - b[filter]));
    //   }
    //   if (sort === "minimum") {
    //     setDisplay(arrLow.sort((a, b) => a[filter] - b[filter]));
    //   }
    //   if (sort === "average") {
    //     setDisplay(arrAverage.sort((a, b) => a[filter] - b[filter]));
    //   }
    // }
    if (low.size === 0) return;
    if (filter === "total") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort((a, b) => a.total + b.total));
      }
      if (sort === "minimum") {
        //valid
        setDisplay(arrLow.sort((a, b) => a.total + b.total));
      }
      if (sort === "average") {
        setDisplay(arrAverage.sort((a, b) => a.total + b.total));
      }
    }
    if (filter === "climb") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort((a, b) => a.climb + b.climb));
      }
      if (sort === "minimum") {
        setDisplay(arrLow.sort((a, b) => a.climb + b.climb));
      }
      if (sort === "average") {
        setDisplay(arrAverage.sort((a, b) => a.climb + b.climb));
      }
    }
    if (filter === "specimen") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort((a, b) => a.specimen + b.specimen));
      }
      if (sort === "minimum") {
        setDisplay(arrLow.sort((a, b) => a.specimen + b.specimen));
      }
      if (sort === "average") {
        setDisplay(arrAverage.sort((a, b) => a.specimen + b.specimen));
      }
    }
    if (filter === "basket") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort((a, b) => a.basket + b.basket));
      }
      if (sort === "minimum") {
        setDisplay(arrLow.sort((a, b) => a.basket + b.basket));
      }
      if (sort === "average") {
        setDisplay(arrAverage.sort((a, b) => a.basket + b.basket));
      }
    }
  }, [average, filter, low, high, sort, setDisplay]);

  // useEffect(() => {
  //   alert(JSON.stringify(display));
  // }, [display]);

  return (
    <>
      <SelectInputText
        onChange={(value) => {
          setFilter(value as "basket");
        }}
        description="Filter"
      >
        <option>basket</option>
        <option>specimen</option>
        <option>climb</option>
        <option>total</option>
      </SelectInputText>
      <SelectInputText
        onChange={(value) => {
          setSort(value as "average");
        }}
        description="Sort"
      >
        <option>average</option>
        <option>minimum</option>
        <option>maximum</option>
      </SelectInputText>
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Team</TableHeadCell>
          <TableHeadCell>Specimen</TableHeadCell>
          <TableHeadCell>Basket</TableHeadCell>
          <TableHeadCell>Climb</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {display?.map((value, index) => {
            return (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <TableCell>{`${value.team}: ${value.name}`}</TableCell>
                <TableCell>{value.specimen}</TableCell>
                <TableCell>{value.basket}</TableCell>
                <TableCell>{value.climb}</TableCell>
                <TableCell>{value.total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
