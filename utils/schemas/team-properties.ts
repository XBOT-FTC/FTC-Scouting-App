import { validateTeamProperties } from "../validators/team-properties";

/** creates a new PropertiesSchema */
export function TeamPropertiesSchema(
  rank: number,
  teamName: string,
  teamNumber: number,
): Zod.infer<typeof validateTeamProperties> {
  return {
    team: teamNumber as TeamNumber,
    matches: [],
    name: teamName,
    rank: rank,
  };
}
