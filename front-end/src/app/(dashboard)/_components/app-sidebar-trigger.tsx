"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export const AppSideBarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button onClick={toggleSidebar} className="cursor-pointer lg:hidden">
      <Menu />
    </Button>
  );
};
