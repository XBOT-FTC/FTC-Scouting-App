"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [testString, setTestString] = useState("");
  const api = fetch("http://localhost:3000/api");

  useEffect(() => {
    api.then((value) => {
      value.json().then((value) => {
        console.log(value);
        setTestString(value);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-2xl dark:text-white">{JSON.stringify(testString)}</h1>
    </>
  );
}
