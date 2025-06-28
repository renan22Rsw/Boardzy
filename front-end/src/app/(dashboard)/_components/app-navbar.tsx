import Image from "next/image";
import BoardzyLogo from "@/assets/boardzy-logo.png";
import { Button } from "@/components/ui/button";
import { AppSideBarTrigger } from "./app-sidebar-trigger";
import { AppNavbarMobile } from "./app-navbar-mobile";
import { UserButton } from "@clerk/nextjs";

export const AppNavbar = () => {
  return (
    <nav className="flex justify-between border-2 p-4">
      <div className="flex items-center">
        <Image src={BoardzyLogo} width={50} height={50} alt="Boardzy Logo" />
        <AppNavbarMobile />
      </div>
      <div className="flex items-center gap-2">
        <AppSideBarTrigger />
        <Button variant={"ghost"}>Lorem Inc</Button>
        <UserButton />
      </div>
    </nav>
  );
};
