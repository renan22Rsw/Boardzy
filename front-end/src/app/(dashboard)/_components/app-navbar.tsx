import Image from "next/image";
import BoardzyLogo from "@/assets/boardzy-logo.png";

import { AppSideBarTrigger } from "./app-sidebar-trigger";
import { AppNavbarMobile } from "./app-navbar-mobile";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export const AppNavbar = () => {
  return (
    <nav className="flex justify-between border-2 p-4">
      <div className="flex items-center">
        <Image src={BoardzyLogo} width={50} height={50} alt="Boardzy Logo" />
        <AppNavbarMobile />
      </div>
      <div className="flex items-center gap-2">
        <AppSideBarTrigger />
        <OrganizationSwitcher
          hidePersonal
          afterSelectOrganizationUrl="/organizations/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterCreateOrganizationUrl="/organizations/:id"
        />
        <UserButton />
      </div>
    </nav>
  );
};
