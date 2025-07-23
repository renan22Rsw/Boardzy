"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft } from "lucide-react";
import { useRef, useState } from "react";

export const CardModalDescription = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!textAreaRef.current?.value) return;
    console.log(textAreaRef.current?.value);
    textAreaRef.current.value = "";
    setIsEditing(false);
  };

  return (
    <div className="w-4/5 space-y-2">
      <div className="flex items-center gap-x-2">
        <AlignLeft size={20} />
        <h5 className="text-md font-semibold text-zinc-700">Description</h5>
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
              onClick={handleSubmit}
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
