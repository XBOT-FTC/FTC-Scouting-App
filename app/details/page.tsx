"use client";
import {
  Accordion,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useEffectOnce } from "react-use";

import { COMPETITION } from "@/constants/competition";
import { AllianceColor } from "@/constants/enums";
import {
  Match,
  TeamProperties,
  TeamPropertiesCollection,
} from "@/types/team-properties";
import { CalculatePoints } from "@/utils/calculate-points";

export default function MyPage() {
  const searchParams = useSearchParams();
  const team: string | null = searchParams.get("team");
  const [teamProperties, setTeamProperties] = useState<TeamProperties>();
  const [matches, setMatches] = useState<Array<Match>>();
  const [selectedMatch, setSelectedMatch] = useState<number>();
  const [selectedTeam, setSelectedTeam] = useState<number>(Number(team!));
  const [status, setStatus] = useState<
    | {
        operatorRating: number;
        driverRating: number;
        comments: string;
        specimen: number;
        basket: number;
        climb: number;
        total: number;
        name: string;
        team: number;
      }
    | undefined
  >();

  useEffectOnce(() => {
    fetch("api/fetch-team", {
      body: JSON.stringify([Number(team)]),
      method: "POST",
    }).then((_response) => {
      _response.json().then((response: TeamPropertiesCollection) => {
        setTeamProperties(response[0]);
        fetch("api/fetch-matches", {
          body: JSON.stringify({
            matches: response[0].matches,
            collection: COMPETITION,
          } as {
            matches: Array<number>;
            collection: string;
          }),
          method: "POST",
        }).then((_matches) => {
          _matches.json().then((matches) => {
            setMatches(matches);
          });
        });
      });
    });
  });

  useMemo(() => {
    const teamMatch = matches
      ?.find((match) => match.match === selectedMatch)
      ?.teams.find((value) => value.team === selectedTeam);
    if (teamMatch) {
      const rnd = Math.round;
      const calculation = CalculatePoints(teamMatch);
      setStatus({
        operatorRating: teamMatch.operatorRating,
        driverRating: teamMatch.driverRating,
        specimen: rnd(calculation.specimen),
        basket: rnd(calculation.basket),
        climb: rnd(calculation.climb),
        total: rnd(calculation.total),
        comments: teamMatch.comments,
        name: teamMatch.name,
        team: teamMatch.team,
      });
    }
  }, [selectedTeam, selectedMatch, matches]);

  return (
    <>
      <Modal onClose={() => setStatus(undefined)} show={status !== undefined}>
        <ModalHeader>Comments</ModalHeader>
        <ModalBody>
          {status?.team}: {status?.name}
          <div className="mb-3" />
          Comments: {status?.comments === "" ? "N/A" : status?.comments}
          <div />
          Driver Rating: {status?.driverRating}
          <div />
          Operator Rating: {status?.operatorRating}
          <div className="mb-3" />
          Specimen: {status?.specimen}
          <div />
          Basket: {status?.basket}
          <div />
          Climb: {status?.climb}
          <div />
          Total: {status?.total}
        </ModalBody>
      </Modal>
      {teamProperties ? (
        <>
          <p className="text-center">{`${teamProperties.team}: ${teamProperties.name}`}</p>
          <p className="text-center">{`👑 Rank: ${teamProperties.rank === -1 ? "undefined" : teamProperties.rank}`}</p>

          <Accordion>
            {teamProperties.matches.map((matchNumber) => {
              return (
                <Accordion.Panel key={matchNumber}>
                  <Accordion.Title>{` ${matches?.find((match) => match.match === matchNumber)?.teams.find((team) => team.team === teamProperties.team)?.color === AllianceColor.Red ? "🔴" : "🔵"} Match: ${matchNumber}`}</Accordion.Title>
                  <Accordion.Content>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHead>
                          <TableHeadCell>Team</TableHeadCell>
                          <TableHeadCell>Color</TableHeadCell>
                          <TableHeadCell>Total</TableHeadCell>
                        </TableHead>
                        <TableBody className="divide-y">
                          {matches
                            ?.find((match) => match.match === matchNumber)
                            ?.teams.map((data, i) => (
                              <TableRow
                                onClick={() => {
                                  setSelectedMatch(matchNumber);
                                  setSelectedTeam(data.team);
                                }}
                                key={i}
                              >
                                <TableCell className="text-xs">
                                  {`${data.team}`}
                                </TableCell>
                                <TableCell>
                                  {data.color === AllianceColor.Red
                                    ? "🔴"
                                    : "🔵"}
                                </TableCell>
                                <TableCell>
                                  {CalculatePoints(data).total}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        </>
      ) : undefined}
    </>
  );
}
