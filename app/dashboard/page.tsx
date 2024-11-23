// app/dashboard/page.tsx

"use client";

import { useCookies } from "react-cookie";

export default function DashboardPage() {
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;
  // const { WebClient } = require("@slack/web-api");

  // const web = new WebClient(accessToken);

  // const conversationId = "C07TZGGFULR";

  // (async () => {
  //   // Post a message to the channel, and await the result.
  //   // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
  //   const result = await web.chat.postMessage({
  //     text: "Hello world!",
  //     channel: conversationId,
  //   });

  //   // The result contains an identifier for the message, `ts`.
  //   console.log(
  //     `Successfully send message ${result.ts} in conversation ${conversationId}`,
  //   );
  // })();

  return (
    <div>
      <h1>Dashboard</h1>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>No Access Token Found</p>
      )}
    </div>
  );
}
