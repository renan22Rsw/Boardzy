"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BoardDropdown } from "./board-dropdown";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { updateBoardTitle } from "@/schemas/board-schema";
export const BoardTitle = ({ title, id }: { title: string; id: string }) => {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { getToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeParsed = updateBoardTitle.safeParse({ title: newTitle, id });

    if (!safeParsed.success) {
      const errorMsg =
        safeParsed.error.format().title?._errors || "Invalid input";
      toast.error(errorMsg);
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
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Input
            className="my-1 h-[25px] w-[110px] px-2 font-semibold text-zinc-800 placeholder:italic md:w-[180px] dark:text-zinc-100"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter board title"
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <Link href={`/board/${id}`}>
          <h6 className="font-semibold text-zinc-800 hover:underline dark:text-zinc-100">
            {title}
          </h6>
        </Link>
      )}
      <BoardDropdown id={id} setRename={setIsEditing} />
    </>
  );
};
