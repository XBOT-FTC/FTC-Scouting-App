import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="grid justify-center bg-gradient-to-b from-teal-400 from-20% via-teal-700 via-30% to-teal-900 to-85% text-white">
      <div className="grid justify-center bg-transparent">
        <Image
          src="images/image.png"
          width={201}
          height={191}
          alt="Picture of logo"
        />
      </div>
      <div className="mt-5 box-content border-2 border-black bg-white p-5">
        <div className="mb-10 grid justify-center text-2xl text-black">
          <p>
            <b>Welcome</b>
          </p>
        </div>

        <div className="grid justify-center border-black bg-white text-black">
          <form action={"/url"} method="GET">
            <div className="text-left text-black">
              <p>
                <b>Enter Name</b>
              </p>
            </div>
            <input type="text" placeholder="Name" required />
            <div className="m-20 grid justify-center rounded-sm bg-blue-400 box-decoration-slice p-3 text-white hover:bg-blue-800">
              <Link href={"/url"}>
                <button type="submit">Next</button>
              </Link>
            </div>
          </form>
        </div>

        <a
          href="https://slack.com/oauth/v2/authorize?scope=&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fslack.com%2Fopenid%2Fconnect%2Fauthorize&amp;client_id=7936020884293.7960731240339"
          style={{
            alignItems: "center",
            color: "#000",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            display: "inline-flex",
            fontFamily: "Lato, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            height: "48px",
            justifyContent: "center",
            textDecoration: "none",
            width: "236px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "20px", width: "20px", marginRight: "12px" }}
            viewBox="0 0 122.8 122.8"
          >
            <path
              d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
              fill="#e01e5a"
            />
            <path
              d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
              fill="#36c5f0"
            />
            <path
              d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
              fill="#2eb67d"
            />
            <path
              d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
              fill="#ecb22e"
            />
          </svg>
          Login w/ Slack
        </a>

        <div className="mt-10 grid justify-center text-gray-400">
          <p>XBOT ROBOTICS</p>
        </div>
      </div>
    </div>
  );
}
