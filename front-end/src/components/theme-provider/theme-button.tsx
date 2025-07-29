"use client";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

export const ThemeButton = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-4">
      <Button variant={"ghost"} onClick={() => setTheme("light")}>
        <SunIcon />
      </Button>
      <Button variant={"ghost"} onClick={() => setTheme("dark")}>
        <MoonIcon />
      </Button>
    </div>
  );
};
