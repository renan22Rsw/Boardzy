"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { Accordion } from "@/components/ui/accordion";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { CreateWorkspace } from "./create-workspace";
import { AccordianItems } from "./accordian-items";
import { Organization } from "@/types/organization";
import { usePathname } from "next/navigation";

export const AppSidebar = () => {
  const { isLoaded } = useOrganization();
  const pathName = usePathname().split("/")[2];

  const { userMemberships, isLoaded: isUserMembershipsLoaded } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  if (!isLoaded || !isUserMembershipsLoaded || userMemberships.isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <Sidebar variant="sidebar" className="pt-4">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            Workspacess
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Project" className="hidden lg:block">
            <CreateWorkspace />
            <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
        </SidebarGroup>
        <Accordion type="multiple">
          {userMemberships.data.map(({ organization }) => (
            <AccordianItems
              id={pathName as string}
              key={organization?.id}
              organization={organization as Organization}
            />
          ))}
        </Accordion>
      </SidebarContent>
    </Sidebar>
  );
};
