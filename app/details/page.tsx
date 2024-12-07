"use client"; // This ensures the component runs on the client side

import {
  Accordion,
  HR,
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
        comments: string;
        name: string;
        specimen: number;
        basket: number;
        climb: number;
        total: number;
        team: number;
      }
    | undefined
  >();

  useEffectOnce(() => {
    fetch("api/fetch-team", {
      method: "POST",
      body: JSON.stringify([Number(team)]),
    }).then((_response) => {
      _response.json().then((response: TeamPropertiesCollection) => {
        setTeamProperties(response[0]);
        fetch("api/fetch-matches", {
          method: "POST",
          body: JSON.stringify({
            collection: COMPETITION,
            matches: response[0].matches,
          } as {
            collection: string;
            matches: Array<number>;
          }),
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
        basket: rnd(calculation.basket),
        climb: rnd(calculation.climb),
        comments: teamMatch.comments,
        specimen: rnd(calculation.specimen),
        total: rnd(calculation.total),
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
          <div className="mb-2" />
          Comments: {status?.comments === "" ? "N/A" : status?.comments}
          <HR />
          Specimen: {status?.specimen}
          <div className="mb-2" />
          Basket: {status?.basket}
          <div className="mb-2" />
          Climb: {status?.climb}
          <div className="mb-2" />
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
                                key={i}
                                onClick={() => {
                                  setSelectedMatch(matchNumber);
                                  setSelectedTeam(data.team);
                                }}
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
