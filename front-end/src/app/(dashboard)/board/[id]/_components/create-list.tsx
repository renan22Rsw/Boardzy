"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { CreateListSchema } from "@/schemas/list-schema";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export const CreateList = () => {
  const [addList, setAddList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const router = useRouter();

  const { getToken } = useAuth();

  const handleClick = () => {
    setAddList(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const safeParsed = CreateListSchema.safeParse({
      title: inputRef.current?.value,
      boardId: params.id,
    });

    if (!safeParsed.success) {
      const zodError = safeParsed.error.format();
      const message = zodError.title?._errors[0] || "Invalid input";
      toast.error(message);
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(safeParsed.data),
      });
      const data = await response.json();
      setAddList(false);
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
    <div>
      {!addList ? (
        <Button
          className="flex w-[200px] cursor-pointer justify-start py-4 text-start font-semibold"
          variant={"outline"}
          onClick={handleClick}
        >
          <Plus />
          Add a list...
        </Button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-md bg-zinc-900 p-4 xl:w-[250px]"
        >
          <Input
            placeholder="Enter list title...."
            className="xl:w-[200px]"
            id="list-title"
            ref={inputRef}
          />

          <div className="flex items-center space-x-4">
            <Button
              type="submit"
              variant={"outline"}
              className="cursor-pointer"
            >
              Add List
            </Button>

            <X className="cursor-pointer" onClick={() => setAddList(false)} />
          </div>
        </form>
      )}
    </div>
  );
};
