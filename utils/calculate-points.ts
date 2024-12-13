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
    (draft.auto.net * 2 +
      draft.auto.lowBasket * 4 +
      draft.auto.highBasket * 8 +
      draft.auto.lowChamber * 6 +
      draft.auto.highChamber * 10) *
      2 +
    InferAscent(draft.auto.ascent);
  const teleopPoints =
    draft.teleop.net * 2 +
    draft.teleop.lowBasket * 4 +
    draft.teleop.highBasket * 8 +
    draft.teleop.lowChamber * 6 +
    draft.teleop.highChamber * 10;
  const endPoints = InferAscent(draft.end.ascent);
  return {
    basket:
      draft.teleop.net * 2 +
      draft.teleop.lowBasket * 4 +
      draft.teleop.highBasket * 8 +
      (draft.auto.net * 2 +
        draft.auto.lowBasket * 4 +
        draft.auto.highBasket * 8) *
        2,
    specimen:
      draft.teleop.lowChamber * 4 +
      draft.teleop.highChamber * 8 +
      (draft.auto.lowChamber * 4 + draft.auto.highChamber * 8) * 2,
    autoBasket:
      (draft.auto.net * 2 +
        draft.auto.lowBasket * 4 +
        draft.auto.highBasket * 8) *
      2,
    teleopBasket:
      draft.teleop.net * 2 +
      draft.teleop.lowBasket * 4 +
      draft.teleop.highBasket * 8,
    teleopSpecimen: draft.teleop.lowChamber * 4 + draft.teleop.highChamber * 8,
    autoSpecimen: (draft.auto.lowChamber * 4 + draft.auto.highChamber * 8) * 2,
    climb: InferAscent(draft.end.ascent) + InferAscent(draft.auto.ascent),
    total: autoPoints + teleopPoints + endPoints,
    autoClimb: InferAscent(draft.auto.ascent),
    endClimb: InferAscent(draft.end.ascent),
    teleop: teleopPoints,
    auto: autoPoints,
    end: endPoints,
  };
}
