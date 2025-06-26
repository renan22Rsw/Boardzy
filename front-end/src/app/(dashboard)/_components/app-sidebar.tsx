"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreateWorkspaceDialog } from "./create-workspace";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Activity, Settings, CreditCard, Layout, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const workspaces = [
  {
    id: 1,
    title: "Teste",
    projects: [
      {
        id: 1,
        label: "Boards",
        icon: <Layout size={16} />,
      },
      {
        id: 2,
        label: "Activity",
        icon: <Activity size={16} />,
      },

      {
        id: 3,
        label: "Settings",
        icon: <Settings size={16} />,
      },
      {
        id: 4,
        label: "Billing",
        icon: <CreditCard size={16} />,
      },
    ],
  },
];

export const AppSidebar = () => {
  const pathName = usePathname().split("/")[2];

  return (
    <Sidebar variant="sidebar" className="pt-4">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            Workspacess
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Project" className="hidden lg:block">
            <CreateWorkspaceDialog
              trigger={<Plus className="h-4 w-4" cursor={"pointer"} />}
            />
            <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
        </SidebarGroup>
        {workspaces.map((workspaces) => (
          <Accordion
            type="single"
            key={workspaces.id}
            className="px-4"
            collapsible
          >
            <AccordionItem value={workspaces.title}>
              <AccordionTrigger className="cursor-pointer font-bold text-zinc-600 dark:text-zinc-200">
                {workspaces.title}
              </AccordionTrigger>

              <AccordionContent>
                {workspaces.projects.map((project) => (
                  <SidebarMenuItem
                    key={project.id}
                    className={cn(
                      pathName === project.label.toLowerCase() &&
                        "bg-zinc-100 dark:bg-zinc-800",
                      "flex cursor-pointer items-center gap-2 rounded-md py-3 font-semibold text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
                    )}
                  >
                    {project.icon}
                    {project.label}
                  </SidebarMenuItem>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
