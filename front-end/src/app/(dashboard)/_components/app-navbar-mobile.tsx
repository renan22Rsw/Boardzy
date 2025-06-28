"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { CreateWorkspaceDialog } from "./create-workspace";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AppNavbarMobile = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <CreateWorkspaceDialog
          trigger={<Button className="font-semibold">Create</Button>}
        />
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
