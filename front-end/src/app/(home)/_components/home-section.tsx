"use client";

import { ReactTyped } from "react-typed";

export const HomeSection = () => {
  return (
    <span className="rounded-sm bg-linear-to-bl from-violet-500 to-fuchsia-500 p-2 text-lg font-bold text-zinc-100 lg:text-5xl">
      <ReactTyped
        strings={[
          "Organize your tasks.",
          "Collaborate with your team.",
          "Track your progress.",
        ]}
        typeSpeed={30}
        backSpeed={50}
        loop
      />
    </span>
  );
};
