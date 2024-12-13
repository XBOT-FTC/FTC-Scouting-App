import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="grid justify-center text-white">
      <div className="grid justify-center bg-transparent">
        <Image
          src="images/image.png"
          alt="Picture of logo"
          height={191}
          width={201}
        />
      </div>
      <div className="mt-5 box-content rounded-md border-2 border-black bg-white p-5">
        <div className="mb-10 grid justify-center text-2xl text-black">
          <p>
            <b>Welcome</b>
          </p>
        </div>

        <div className="grid justify-center border-black bg-white text-black">
          <form action={"/allianceselection"} method="GET">
            <div className="text-left text-black">
              <p>
                <b>Enter Name</b>
              </p>
            </div>
            <input
              className="rounded-md"
              placeholder="Name"
              type="text"
              required
            />
            <div className="m-20 grid justify-center rounded-md bg-blue-400 box-decoration-slice p-3 text-white hover:bg-blue-800">
              <Link href={"/allianceselection"}>
                <button type="submit">Next</button>
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-10 grid justify-center text-gray-400">
          <p>XBOT ROBOTICS</p>
        </div>
      </div>
    </div>
  );
}
