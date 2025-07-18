"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const AddCardButton = ({
  setAddCard,
}: {
  setAddCard: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="p-2">
      <Button
        className="text-muted-foreground h-auto w-full cursor-pointer justify-start px-2 py-1.5 text-sm"
        onClick={() => setAddCard(true)}
        variant={"ghost"}
      >
        <Plus />
        Add a card
      </Button>
    </div>
  );
};
