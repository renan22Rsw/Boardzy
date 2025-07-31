"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@clerk/nextjs";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface BoardDropdownProps {
  id: string;
  title?: string;
  setRename: Dispatch<SetStateAction<boolean>>;
  apiRoute: string;
  label: string;
}

export const BoardDropdown = ({
  id,
  title,
  setRename,
  apiRoute,
  label,
}: BoardDropdownProps) => {
  const { getToken } = useAuth();
  const router = useRouter();

  const deleteBoard = async (id: string) => {
    try {
      const token = await getToken();

      const response = await fetch(`${apiRoute}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ id, title }),
      });

      const data = await response.json();
      toast.success(data.message);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label} actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setRename(true)}>
          <Pencil />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteBoard(id)}>
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
