"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft } from "lucide-react";
import { useRef, useState } from "react";
import { createCardDescriptionSchema } from "@/schemas/card-schema";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export const CardModalDescription = ({ listId }: { listId: string }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { getToken } = useAuth();

  const handleDescription = async () => {
    const safeParsed = createCardDescriptionSchema.safeParse({
      description: textAreaRef.current?.value,
    });

    if (!safeParsed.success) {
      const zodError = safeParsed.error.format();
      const message = zodError.description?._errors[0] || "Invalid input";
      toast.error(message);
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`/api/cards/${listId}/description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(safeParsed.data),
      });

      const data = await response.json();
      toast.success(data.message);
      setIsEditing(false);
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
    <div className="w-4/5 space-y-2">
      <div className="flex items-center gap-x-2">
        <AlignLeft size={20} />
        <h5 className="text-md font-semibold text-zinc-700 dark:text-zinc-200">
          Description
        </h5>
      </div>
      <div className="space-y-2">
        <Textarea
          className="resize-none bg-zinc-100 placeholder:text-sm placeholder:font-semibold dark:bg-zinc-900"
          placeholder="Add a more detailed description..."
          ref={textAreaRef}
          onClick={() => setIsEditing(true)}
        />
        {isEditing && (
          <div className="flex space-x-2">
            <Button
              className="w-[100px] cursor-pointer"
              variant="outline"
              onClick={handleDescription}
            >
              Add
            </Button>
            <Button
              className="w-[100px] cursor-pointer"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
