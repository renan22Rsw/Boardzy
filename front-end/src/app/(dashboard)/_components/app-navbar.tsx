"use client";

import Image from "next/image";
import BoardzyLogo from "@/assets/boardzy-logo.png";
import { Button } from "@/components/ui/button";
import { AppSideBarTrigger } from "./app-sidebar-trigger";
import { CreateWorkspaceDialog } from "./create-workspace";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

export const AppNavbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="flex justify-between border-2 p-4">
      <div className="flex items-center">
        <Image src={BoardzyLogo} width={50} height={50} alt="Boardzy Logo" />
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
      </div>
      <div className="flex items-center gap-2">
        <AppSideBarTrigger />
        <Button variant={"ghost"}>Lorem Inc</Button>
        <div className="h-9 w-9 cursor-pointer rounded-full bg-violet-500"></div>
      </div>
    </nav>
  );
};
