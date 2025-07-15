"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export const AppSideBarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("/board") && (
        <Button onClick={toggleSidebar} className="cursor-pointer lg:hidden">
          <Menu />
        </Button>
      )}
    </>
  );
};
