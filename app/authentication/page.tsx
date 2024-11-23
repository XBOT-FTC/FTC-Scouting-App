// ./app/authentication/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const SlackCallbackPage = () => {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);

  const [cookies, setCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCode(params.get("code"));
      setError(params.get("error"));
    }

    const fetchAccessToken = async () => {
      if (error) {
        console.error("Authentication error:", error);
        setResponseError(error);
        return;
      }

      if (code) {
        try {
          const response = await fetch(
            "https://slack.com/api/openid.connect.token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!,
                client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET!,
                code,
                redirect_uri: process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI!,
              }),
            },
          );

          const data = await response.json();
          if (data.access_token) {
            setAccessToken(data.access_token); // Store the access token
            setCookie("accessToken", data.access_token, {
              path: "/", // Makes the cookie accessible across the app
              secure: true, // Use true if your app is served over HTTPS
              httpOnly: false, // Must be false since it's accessed on the client
              sameSite: "strict", // Provides some CSRF protection
            });
            router.push("/dashboard"); // Redirect to dashboard after successful authentication
          } else {
            console.error("Failed to get access token:", data);
            setResponseError(data.error || "Unknown error");
          }
        } catch (err) {
          console.error("Error fetching access token:", err);
          setResponseError("Network or server error");
        }
      }
    };

    fetchAccessToken();
  }, [code, error, router]);

  return (
    <div>
      <p>Authenticating with Slack...</p>
      {code && <p>Code: {code}</p>}
      {accessToken && <p>Access Token: {accessToken}</p>}
      {responseError && <p>Error: {responseError}</p>}
    </div>
  );
};

export default SlackCallbackPage;