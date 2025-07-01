"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AppNavbarMobile = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Button>
          <Link href={"/select-org"} className="font-bold">
            Create
          </Link>
        </Button>
      ) : (
        <Link href={"/"}>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            Boardzy
          </h3>
        </Link>
      )}
    </>
  );
};
