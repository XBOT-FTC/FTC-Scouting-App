import { Ascent } from "@/store/drafts";
import { DraftData } from "@/types/draft";

/** a utility function that calculates the
 * points depending on the draft schema
 */
export function CalculatePoints(draft: DraftData) {
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
  };
}
