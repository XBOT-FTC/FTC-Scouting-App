import { AllianceColor } from "@/store/drafts";
import { TeamMatchSchema } from "@/utils/schemas";
import { uploadMatch } from "@/utils/upload-match";

let mutable = TeamMatchSchema("TEST3_REMOVE_LATER", 8628, AllianceColor.Red);
mutable = { ...mutable, auto: { ...mutable.auto, highBasket: 10 } };
uploadMatch(mutable, 1 as MatchNumber);
