import { validateTeamProperties } from "../validators/team-properties";

/** creates a new PropertiesSchema */
export function TeamPropertiesSchema(
  rank: number,
  teamName: string,
  teamNumber: number,
  matches = new Array<number>(),
): Zod.infer<typeof validateTeamProperties> {
  return {
    team: teamNumber as TeamNumber,
    matches: matches,
    name: teamName,
    rank: rank,
  };
}
