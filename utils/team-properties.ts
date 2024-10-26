import { TeamNumber, TeamProperties } from "@/types/team-properties";

/** creates a new PropertiesSchema */
export function TeamPropertiesSchema(
  rank: number,
  teamName: string,
  teamNumber: number,
): TeamProperties {
  return {
    _id: teamNumber as TeamNumber,
    matches: [],
    name: teamName,
    rank: rank,
  };
}
