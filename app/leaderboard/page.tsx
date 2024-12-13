"use client";
import {
  Button,
  HR,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { WithId } from "mongodb";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useEffectOnce } from "react-use";

import { COMPETITION } from "@/constants/competition";
import { Statistics } from "@/types/statistics";
import { Match, TeamPropertiesCollection } from "@/types/team-properties";
import { CalculatePoints } from "@/utils/calculate-points";
import { StatisticsSchema } from "@/utils/schemas";

export default function Leaderboard() {
  const router = useRouter();
  const [low, setLow] = useState<Map<TeamNumber, Statistics>>(new Map());
  const [high, setHigh] = useState<Map<TeamNumber, Statistics>>(new Map());
  const [average, setAverage] = useState<Map<TeamNumber, Statistics>>(
    new Map(),
  );
  const [display, setDisplay] = useState<Array<Statistics>>([]);
  const [filter, setFilter] = useState<
    "specimen" | "basket" | "climb" | "total"
  >("total");
  const [sort, setSort] = useState<"average" | "minimum" | "maximum">(
    "average",
  );
  const [team, setTeam] = useState<number>();
  const [show, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<
    | {
        teleopSpecimen: number;
        autoSpecimen: number;
        teleopBasket: number;
        autoBasket: number;
        autoClimb: number;
        specimen: number;
        endClimb: number;
        basket: number;
        climb: number;
        total: number;
        name: string;
        team: number;
      }
    | undefined
  >();

  useEffectOnce(() => {
    fetch("/api/fetch-matches", {
      body: JSON.stringify({ collection: COMPETITION, matches: [] }),
      method: "POST",
    }).then(async (value) => {
      const average: Map<TeamNumber, Statistics> = new Map();
      const low: Map<TeamNumber, Statistics> = new Map();
      const high: Map<TeamNumber, Statistics> = new Map();
      const occurrence = new Map<TeamNumber, number>();
      const teamProperties: TeamPropertiesCollection = await (
        await fetch("api/fetch-team")
      ).json();
      const matches: Array<WithId<Match>> = await value.json();

      matches.forEach((match) => {
        match.teams.forEach((matchData) => {
          if (matchData.scouted) {
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
                autoClimb: calculation.autoClimb,
                endClimb: calculation.endClimb,
                climb: calculation.climb,
              });
            }
            if (calculation.specimen > high.get(matchData.team)!.specimen) {
              high.set(matchData.team, {
                ...high.get(matchData.team)!,
                teleopSpecimen: calculation.teleopSpecimen,
                autoSpecimen: calculation.autoSpecimen,
                specimen: calculation.specimen,
              });
            }
            if (calculation.basket > high.get(matchData.team)!.basket) {
              high.set(matchData.team, {
                ...high.get(matchData.team)!,
                teleopBasket: calculation.teleopBasket,
                autoBasket: calculation.basket,
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
                autoClimb: calculation.autoClimb,
                endClimb: calculation.endClimb,
                climb: calculation.climb,
              });
            }
            if (calculation.specimen < low.get(matchData.team)!.specimen) {
              low.set(matchData.team, {
                ...low.get(matchData.team)!,
                teleopSpecimen: calculation.teleopSpecimen,
                autoSpecimen: calculation.specimen,
                specimen: calculation.specimen,
              });
            }
            if (calculation.basket < low.get(matchData.team)!.basket) {
              low.set(matchData.team, {
                ...low.get(matchData.team)!,
                teleopBasket: calculation.teleopBasket,
                autoBasket: calculation.autoBasket,
                basket: calculation.basket,
              });
            }

            average.set(matchData.team, {
              ...average.get(matchData.team)!,
              teleopSpecimen:
                average.get(matchData.team)!.teleopSpecimen +
                calculation.teleopSpecimen,
              autoSpecimen:
                average.get(matchData.team)!.autoSpecimen +
                calculation.autoSpecimen,
              teleopBasket:
                average.get(matchData.team)!.teleopBasket +
                calculation.teleopBasket,
              autoBasket:
                average.get(matchData.team)!.autoBasket +
                calculation.autoBasket,
              autoClimb:
                average.get(matchData.team)!.autoClimb + calculation.autoClimb,
              endClimb:
                average.get(matchData.team)!.endClimb + calculation.endClimb,
              specimen:
                average.get(matchData.team)!.specimen + calculation.specimen,
              basket: average.get(matchData.team)!.basket + calculation.basket,
              climb: average.get(matchData.team)!.climb + calculation.climb,
              total: average.get(matchData.team)!.total + calculation.total,
            });

            occurrence.set(
              matchData.team,
              (occurrence.get(matchData.team) || 0) + 1,
            );
          }
        });
      });

      occurrence.forEach((divide, teamNumber) => {
        const prev = average.get(teamNumber)!;
        average.set(teamNumber, {
          teleopSpecimen: prev.teleopSpecimen / divide,
          autoSpecimen: prev.autoSpecimen / divide,
          teleopBasket: prev.teleopBasket / divide,
          autoBasket: prev.autoBasket / divide,
          autoClimb: prev.autoClimb / divide,
          specimen: prev.specimen / divide,
          endClimb: prev.endClimb / divide,
          basket: prev.basket / divide,
          climb: prev.climb / divide,
          total: prev.total / divide,
          name: prev.name,
          team: prev.team,
        });
      });
      teamProperties.forEach((value) => {
        if (!average.has(value.team)) {
          low.set(value.team, StatisticsSchema(value.name, value.team));
          high.set(value.team, StatisticsSchema(value.name, value.team));
          average.set(value.team, StatisticsSchema(value.name, value.team));
        }
      });
      setLow(low);
      setHigh(high);
      setAverage(average);
    });
  });

  useMemo(() => {
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

    if (low.size === 0) return;
    const compareBy = (key: keyof Statistics) => {
      // @ts-expect-error must be integer
      return (a: Statistics, b: Statistics) => b[key] - a[key];
    };

    setDisplay(arrHigh.sort(compareBy("total")));

    if (filter === "total") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort(compareBy("total")));
      } else if (sort === "minimum") {
        setDisplay(arrLow.sort(compareBy("total")).reverse());
      } else if (sort === "average") {
        setDisplay(arrAverage.sort(compareBy("total")));
      }
    }
    if (filter === "climb") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort(compareBy("climb")));
      } else if (sort === "minimum") {
        setDisplay(arrLow.sort(compareBy("climb")).reverse());
      } else if (sort === "average") {
        setDisplay(arrAverage.sort(compareBy("climb")));
      }
    }
    if (filter === "specimen") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort(compareBy("specimen")));
      } else if (sort === "minimum") {
        setDisplay(arrLow.sort(compareBy("specimen")).reverse());
      } else if (sort === "average") {
        setDisplay(arrAverage.sort(compareBy("specimen")));
      }
    }
    if (filter === "basket") {
      if (sort === "maximum") {
        setDisplay(arrHigh.sort(compareBy("basket")));
      } else if (sort === "minimum") {
        setDisplay(arrLow.sort(compareBy("basket")).reverse());
      } else if (sort === "average") {
        setDisplay(arrAverage.sort(compareBy("basket")));
      }
    }
  }, [average, filter, low, high, sort, setDisplay]);

  useMemo(() => {
    const result = display.find((value) => value.team === team);
    const rnd = Math.round;
    if (result)
      setStatus({
        teleopSpecimen: rnd(result.teleopSpecimen),
        autoSpecimen: rnd(result.autoSpecimen),
        teleopBasket: rnd(result.teleopBasket),
        autoBasket: rnd(result.autoBasket),
        autoClimb: rnd(result.autoClimb),
        specimen: rnd(result.specimen),
        endClimb: rnd(result.endClimb),
        basket: rnd(result.basket),
        climb: rnd(result.climb),
        total: rnd(result.total),
        name: result.name,
        team: result.team,
      });
  }, [display, team]);

  return (
    <>
      {display.length === 0 ? <text>Loading</text> : <></>}
      <Modal onClose={() => setShow(false)} show={show}>
        <ModalHeader>Details</ModalHeader>
        <ModalBody>
          {team} {status?.name}
          <div className="mb-2" />
          Total Specimen: {status?.specimen}
          <div />
          Total Basket: {status?.basket}
          <div />
          Total Climb: {status?.climb}
          <div className="mb-2" />
          Auto Basket: {status?.autoBasket}
          <div />
          Auto Specimen: {status?.autoSpecimen}
          <div className="mb-2" />
          Teleop Basket: {status?.teleopBasket}
          <div />
          Teleop Specimen: {status?.teleopSpecimen}
          <div className="mb-2" />
          Total Score: {status?.total}
          <HR />
          The data shows <b>all</b> match data after using <i>{sort}</i> method.
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              router.push(`/details?team=${team}`);
            }}
          >
            View Further Details
          </Button>
        </ModalFooter>
      </Modal>
      <div className="flex justify-center">
        <select
          onChange={(event) => {
            setFilter(event.currentTarget.value as "basket");
          }}
          className="rounded-md text-center dark:text-black"
        >
          <option>basket</option>
          <option>specimen</option>
          <option>climb</option>
          <option>total</option>
        </select>
        <div className="mr-5" />
        <select
          onChange={(event) => {
            setSort(event.currentTarget.value as "average");
          }}
          className="rounded-md text-center dark:text-black"
        >
          <option>average</option>
          <option>minimum</option>
          <option>maximum</option>
        </select>
      </div>
      <div className="mb-5" />
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Team</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
            <TableHeadCell />
          </TableHead>
          <TableBody className="divide-y">
            {display?.map((value, index) => {
              return (
                <TableRow
                  onClick={() => {
                    setTeam(value.team);
                    setShow(true);
                  }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <TableCell className="max-w-5">
                    <text className="text-xs">{`${value.team}`}</text>
                  </TableCell>
                  <TableCell>{Math.round(value.total)}</TableCell>
                  <TableCell className="text-blue-500 underline">
                    View
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
