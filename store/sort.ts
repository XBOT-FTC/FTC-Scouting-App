import { atomWithStorage } from "jotai/utils";

import { Statistics } from "@/types/statistics";
/** Atom to store sorted data so the user doesn't need to wait after the initial fetch */
export const sortAtom = atomWithStorage<Array<Statistics>>("cacheSort", []);
