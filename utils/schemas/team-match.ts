import { AllianceColor, Ascent } from "@/constants/enums";
import { TeamMatch } from "@/types/match";

/**
 * A utility function that constructs draft data. If there is a macro
 * that does this job, please delete this utility function and open a
 * issue. I hate doing this.
 */
export function TeamMatchSchema(
  name: string,
  team: number,
  color: AllianceColor,
  scouted = false,
): TeamMatch {
  return {
    auto: {
      ascent: Ascent.None,
      disabled: false,
      highChamber: 0,
      fouled: false,
      highBasket: 0,
      lowChamber: 0,
      lowBasket: 0,
      net: 0,
    },
    teleop: {
      disabled: false,
      highChamber: 0,
      fouled: false,
      highBasket: 0,
      lowChamber: 0,
      lowBasket: 0,
      net: 0,
    },
    end: {
      ascent: Ascent.None,
      disabled: false,
      fouled: false,
    },
    team: team as TeamNumber,
    operatorRating: 1,
    scouted: scouted,
    driverRating: 1,
    color: color,
    comments: "",
    name: name,
  };
}
