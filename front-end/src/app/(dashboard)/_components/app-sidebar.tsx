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
import { SidebarSkeleton } from "./sidebar-skeleton";

export const AppSidebar = () => {
  const { isLoaded } = useOrganization();
  const pathName = usePathname();

  const { userMemberships, isLoaded: isUserMembershipsLoaded } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  return (
    !pathName.includes("board") && (
      <Sidebar variant="sidebar" className="pt-4">
        <SidebarContent>
          {!isLoaded ||
          !isUserMembershipsLoaded ||
          userMemberships.isLoading ? (
            <SidebarSkeleton />
          ) : (
            <>
              <SidebarGroup>
                <SidebarGroupLabel className="font-bold">
                  Workspacess
                </SidebarGroupLabel>
                <SidebarGroupAction
                  title="Add Project"
                  className="hidden lg:block"
                >
                  <CreateWorkspace />
                  <span className="sr-only">Add Project</span>
                </SidebarGroupAction>
              </SidebarGroup>
              <Accordion type="multiple">
                {userMemberships.data.map(({ organization }) => (
                  <AccordianItems
                    pathname={pathName as string}
                    key={organization?.id}
                    organization={organization as Organization}
                  />
                ))}
              </Accordion>
            </>
          )}
        </SidebarContent>
      </Sidebar>
    )
  );
};
