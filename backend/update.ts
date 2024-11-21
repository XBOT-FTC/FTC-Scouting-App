import { AllianceColor } from "@/store/drafts";
import { TeamMatch } from "@/types/match";
import { TeamMatchSchema } from "@/utils/schemas";
import { uploadMatch } from "@/utils/upload-match";

uploadMatch(
  TeamMatchSchema("xbot", 488, AllianceColor.Red, false) as TeamMatch,
  2 as MatchNumber,
);
