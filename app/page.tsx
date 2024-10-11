import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      <div className="box-content border-black bg-white p-10">
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
            <input type="text" placeholder="Name" required></input>
            <div className="m-20 grid justify-center rounded-lg bg-blue-400 box-decoration-slice p-3 text-white">
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
