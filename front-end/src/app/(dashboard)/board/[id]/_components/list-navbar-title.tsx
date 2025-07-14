"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { ListNavbarRename } from "./list-navbar-rename";

import Link from "next/link";
import { updateBoardTitle } from "@/schemas/board-schema";

interface ListNavbarTitleProps {
  id: string;
  title: string;
  orgId: string;
}

export const ListNavbarTitle = ({ id, title, orgId }: ListNavbarTitleProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const { getToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeParsed = updateBoardTitle.safeParse({ title: newTitle, id });

    if (!safeParsed.success) {
      const zodError = safeParsed.error.format();
      const message = zodError.title?._errors[0] || "Invalid input";
      toast.error(message);
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`/api/boards/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(safeParsed.data),
      });

      const data = await response.json();
      toast.success(data.message);
      setIsEditing(false);
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
    <header className="flex w-full items-center justify-between space-x-2">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Input
            className="my-1 px-2 font-semibold text-zinc-800 placeholder:italic xl:w-[400px] dark:text-zinc-100"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter board title"
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <Link href={`/organizations/${orgId}`}>
          <h3 className="text-xl font-bold hover:underline">{title}</h3>
        </Link>
      )}
      <ListNavbarRename setRename={setIsEditing} />
    </header>
  );
};
