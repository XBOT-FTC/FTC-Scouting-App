import { Statistics } from "@/types/statistics";

/** Gives a empty statistics schema  */
export function StatisticsSchema(name: string, team: TeamNumber): Statistics {
  return {
    basket: 0,
    climb: 0,
    name: name,
    specimen: 0,
    team: team,
    total: 0,
  };
}
