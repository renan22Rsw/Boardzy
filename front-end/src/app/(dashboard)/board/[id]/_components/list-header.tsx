"use client";

import { List } from "@/types/lists";
import { useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateListTitleSchema } from "@/schemas/list-schema";
import { Input } from "@/components/ui/input";
import { BoardDropdown } from "@/app/(dashboard)/organizations/[id]/_components/board-dropdown";

export const ListHeader = ({ title, id }: List) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { getToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeParsed = updateListTitleSchema.safeParse({
      title: inputRef.current?.value,
      id,
    });

    if (!safeParsed.success) {
      const errorMsg =
        safeParsed.error.format().title?._errors || "Invalid input";
      toast.error(errorMsg);
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`/api/lists/${id}`, {
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
    <div className="flex items-center justify-between gap-x-2 p-2 text-sm font-semibold">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Input
            className="w-full p-2"
            ref={inputRef}
            placeholder="Enter list title"
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <h4 className="h-full w-full px-2 py-2 text-sm font-medium">{title}</h4>
      )}
      <BoardDropdown
        id={id}
        setRename={setIsEditing}
        apiRoute="/api/lists"
        label="List"
      />
    </div>
  );
};
