import { Statistics } from "@/types/statistics";

/** Gives a empty statistics schema  */
export function StatisticsSchema(name: string, team: TeamNumber): Statistics {
  return {
    autoBasket: 0,
    autoClimb: 0,
    autoSpecimen: 0,
    teleopBasket: 0,
    teleopSpecimen: 0,
    endClimb: 0,
    basket: 0,
    climb: 0,
    specimen: 0,
    name: name,
    team: team,
    total: 0,
  };
}
