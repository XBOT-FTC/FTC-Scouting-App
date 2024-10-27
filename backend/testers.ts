/* eslint-disable @cspell/spellchecker */

import { AllianceColor } from "@/store/drafts";
import {
  MatchesSchema,
  TeamMatchSchema,
  TeamPropertiesSchema,
} from "@/utils/schemas";

fetch("http://localhost:3000/api/add-team", {
  method: "POST",
  body: JSON.stringify(TeamPropertiesSchema(1, "da lao", 3231)),
}).then(async (value) => {
  const val = await value.json();
  console.log("add team: ", val);
});

fetch("http://localhost:3000/api/add-match", {
  method: "POST",
  body: JSON.stringify(
    MatchesSchema(
      1,
      TeamMatchSchema("xbot", 488, AllianceColor.Red),
      TeamMatchSchema("xbot", 488, AllianceColor.Red),
      TeamMatchSchema("xbot", 488, AllianceColor.Red),
      TeamMatchSchema("xbot", 488, AllianceColor.Red),
    ),
  ),
}).then(async (value) => {
  const val = await value.json();
  console.log("add match:", val);
});

fetch("http://localhost:3000/api/add-team", {
  method: "POST",
  body: JSON.stringify(TeamPropertiesSchema(1, "hello", 3333)),
})
  .then(async (value) => {
    const val = await value.json();
    console.log(val);
  })
  .then(() => {
    fetch("http://localhost:3000/api/update-team", {
      method: "POST",
      body: JSON.stringify(TeamPropertiesSchema(1, "hello", 3333)),
    }).then(async (value) => {
      const val = await value.json();
      console.log(val);
    });
  });
