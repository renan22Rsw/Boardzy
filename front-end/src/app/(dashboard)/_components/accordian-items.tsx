import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Organization } from "@/types/organization";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AccordianItemsProps {
  pathname: string;
  organization: Organization;
}

export const AccordianItems = ({
  pathname,
  organization,
}: AccordianItemsProps) => {
  const workspaces = [
    {
      id: 1,
      label: "Boards",
      icon: <Layout size={16} />,
      href: `/organizations/${organization.id}`,
    },
    {
      id: 2,
      label: "Activity",
      icon: <Activity size={16} />,
      href: `/organizations/${organization.id}/activity`,
    },

    {
      id: 3,
      label: "Settings",
      icon: <Settings size={16} />,
      href: `/organizations/${organization.id}/settings`,
    },
    {
      id: 4,
      label: "Billing",
      icon: <CreditCard size={16} />,
      href: `/organizations/${organization.id}/billing`,
    },
  ];

  return (
    <AccordionItem value={organization.id}>
      <AccordionTrigger className="cursor-pointer px-4 font-bold text-zinc-600 dark:text-zinc-200">
        <div className="flex items-center gap-2">
          <Image
            src={organization.imageUrl}
            width={30}
            height={30}
            alt="organization icon"
            className="rounded-sm"
          />
          <span>{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        {workspaces.map((project) => (
          <Link key={project.id} href={project.href}>
            <SidebarMenuItem
              className={cn(
                pathname === project.href ? "bg-zinc-100 dark:bg-zinc-800" : "",
                "flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 font-semibold text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
              )}
            >
              {project.icon}
              {project.label}
            </SidebarMenuItem>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
