"use client";

import { Button } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

import { Overflow } from "@/components/overflow";
import { getRandomInteger } from "@/utils/random-range";

export default function Home() {
  const [number, setNumber] = useState(1);
  const [congrats, setCongrats] = useState(false);
  const [rolling, setRolling] = useState(false);
  function roll() {
    for (let i = 0; i < 50; i++) {
      setRolling(true);
      setTimeout(
        () => {
          setNumber(getRandomInteger(1, 21));
        },
        i * 100 + (i ** 3 - i ** 2.99),
      );
    }
    setTimeout(
      () => {
        setCongrats(true);
      },
      50 * 100 + (50 ** 3 - 50 ** 2.99) + 1000,
    );
  }

  const { width, height } = useWindowSize();

  return (
    <>
      <div className="grid justify-center text-center">
        {rolling ? (
          <Overflow>
            <div className="flex size-full min-h-screen items-center justify-center bg-black opacity-80">
              <div className="flex min-h-screen items-center justify-center text-5xl text-white">
                {number}
              </div>
            </div>
            {congrats ? (
              <ReactConfetti
                numberOfPieces={1000}
                recycle={false}
                width={width}
                height={height}
              />
            ) : (
              <></>
            )}
          </Overflow>
        ) : (
          <></>
        )}

        <Image
          alt="scouter's rng"
          src={"images/thumbnail.jpg"}
          width={1000}
          height={100}
        />
        <Button
          disabled={rolling}
          onClick={() => {
            roll();
          }}
        >
          Roll
        </Button>
      </div>
      <ReactConfetti
        numberOfPieces={1000}
        recycle={false}
        width={width}
        height={height}
      />
    </>
  );
}
