"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createCardSchema } from "@/schemas/card-schema";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

interface TextareaFormProps {
  listId: string;
  setAddCard: Dispatch<SetStateAction<boolean>>;
}

export const TextareaForm = ({ listId, setAddCard }: TextareaFormProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const params = useParams();
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeParsed = createCardSchema.safeParse({
      title: textAreaRef.current?.value,
      boardId: params.id,
      listId: listId,
    });

    if (!safeParsed.success) {
      const zodError = safeParsed.error.format();
      const message = zodError.title?._errors[0] || "Invalid input";
      toast.error(message);
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(safeParsed.data),
      });
      const data = await response.json();
      setAddCard(false);
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
    <form onSubmit={handleSubmit} className="space-y-3 px-2 py-1.5 md:w-4/5">
      <Textarea
        placeholder="Enter card title..."
        className="resize-none bg-zinc-100 text-sm outline-none dark:bg-zinc-900"
        ref={textAreaRef}
      />

      <div className="flex items-center space-x-2">
        <Button type="submit" variant={"outline"} className="cursor-pointer">
          Add Card
        </Button>

        <Button
          type="button"
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() => setAddCard(false)}
        >
          <X />
        </Button>
      </div>
    </form>
  );
};
