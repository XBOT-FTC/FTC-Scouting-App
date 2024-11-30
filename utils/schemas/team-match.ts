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
      fouled: false,
      lowBasket: 0,
      highBasket: 0,
      lowChamber: 0,
      highChamber: 0,
      net: 0,
    },
    teleop: {
      disabled: false,
      fouled: false,
      lowBasket: 0,
      highBasket: 0,
      lowChamber: 0,
      highChamber: 0,
      net: 0,
    },
    end: {
      ascent: Ascent.None,
      disabled: false,
      fouled: false,
    },
    color: color,
    comments: "",
    driverRating: 1,
    name: name,
    team: team as TeamNumber,
    scouted: scouted,
  };
}
