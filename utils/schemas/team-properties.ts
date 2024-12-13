import { TeamProperties } from "@/types/team-properties";

/** creates a new PropertiesSchema */
export function TeamPropertiesSchema(
  rank: number,
  teamName: string,
  teamNumber: number,
  matches = new Array<number>(),
): TeamProperties {
  return {
    matches: matches as Array<MatchNumber>,
    team: teamNumber as TeamNumber,
    name: teamName,
    rank: rank,
  };
}
