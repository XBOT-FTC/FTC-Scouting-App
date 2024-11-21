import { TeamProperties } from "@/types/team-properties";

/** creates a new PropertiesSchema */
export function TeamPropertiesSchema(
  rank: number,
  teamName: string,
  teamNumber: number,
  matches = new Array<number>(),
): TeamProperties {
  return {
    team: teamNumber as TeamNumber,
    matches: matches as Array<MatchNumber>,
    name: teamName,
    rank: rank,
  };
}
