import { Ascent } from "@/constants/enums";
import { TeamMatch } from "@/types/match";

/** a utility function that calculates the
 * points depending on the draft schema
 */
export function CalculatePoints(draft: TeamMatch) {
  function InferAscent(level: Ascent) {
    switch (level) {
      case Ascent.Observation:
        return 3;
      case Ascent.Level1:
        return 3;
      case Ascent.Level2:
        return 15;
      case Ascent.Level3:
        return 30;
      default:
        return 0;
    }
  }
  const autoPoints =
    draft.auto.net * 2 +
    draft.auto.lowBasket * 4 +
    draft.auto.highBasket * 8 +
    draft.auto.lowChamber * 6 +
    draft.auto.highChamber * 10 +
    InferAscent(draft.auto.ascent);
  const teleopPoints =
    draft.teleop.net * 2 +
    draft.teleop.lowBasket * 4 +
    draft.teleop.highBasket * 8 +
    draft.teleop.lowChamber * 6 +
    draft.teleop.highChamber * 10;
  const endPoints = InferAscent(draft.end.ascent);
  return {
    auto: autoPoints,
    teleop: teleopPoints,
    end: endPoints,
    total: autoPoints + teleopPoints + endPoints,
    climb: InferAscent(draft.end.ascent) + InferAscent(draft.auto.ascent),
    basket:
      draft.teleop.net * 2 +
      draft.teleop.lowBasket * 4 +
      draft.teleop.highBasket * 8 +
      draft.auto.net * 2 +
      draft.auto.lowBasket * 4 +
      draft.auto.highBasket * 8,
    specimen:
      draft.teleop.lowChamber * 4 +
      draft.teleop.highChamber * 8 +
      draft.auto.lowChamber * 4 +
      draft.auto.highChamber * 8,
  };
}
