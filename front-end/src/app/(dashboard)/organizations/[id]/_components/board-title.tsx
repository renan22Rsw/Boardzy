"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BoardDropdown } from "./board-dropdown";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const BoardTitle = ({ title, id }: { title: string; id: string }) => {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newTitle.length <= 2) {
      console.log("Title must be at least 3 characters long");
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
        body: JSON.stringify({ id, title: newTitle }),
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
          />
        </form>
      ) : (
        <h6 className="font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h6>
      )}
      <BoardDropdown id={id} setRename={setIsEditing} />
    </>
  );
};
