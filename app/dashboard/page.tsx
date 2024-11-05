// app/dashboard/page.tsx

"use client";

import { useCookies } from "react-cookie";

export default function DashboardPage() {
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;

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
