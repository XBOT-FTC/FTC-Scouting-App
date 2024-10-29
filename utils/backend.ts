/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
//util file that communicates with the backend, provides abstraction yay!
//potential api needed to be implemented
/**
 * update team: Collection: Team Properties
 * update match: Collection
 * add team
 * add match
 */

import { Match, TeamProperties } from "@/types/team-properties";

/**updates the team */
export async function updateTeam({
  team,
  matches,
  name,
  rank,
}: Partial<TeamProperties>) {}

export async function addTeam({ team, matches, name, rank }: TeamProperties) {}

export async function updateMatch({ match, teams }: Partial<Match>) {}

export async function addMatch({ match, teams }: Match) {}
