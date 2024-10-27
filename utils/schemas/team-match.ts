import { AllianceColor, Ascent } from "@/store/drafts";

import { validateTeamMatch } from "../validators/team-match";

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
): Zod.infer<typeof validateTeamMatch> {
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
      lowBasket: 0,
      highBasket: 0,
      lowChamber: 0,
      highChamber: 0,
      net: 0,
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
