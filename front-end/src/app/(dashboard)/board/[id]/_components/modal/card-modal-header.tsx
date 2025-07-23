"use client";

import { Input } from "@/components/ui/input";
import { updateCardTitleSchema } from "@/schemas/card-schema";
import { Card } from "@/types/cards";
import { useAuth } from "@clerk/nextjs";
import { PanelsTopLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface CardModalHeaderProps {
  listId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CardModalHeader = ({
  listId,
  isOpen,
  onClose,
}: CardModalHeaderProps) => {
  const [card, setCard] = useState<Card>();
  const [isRename, setIsRename] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(card?.title || "");
  const router = useRouter();

  const { getToken } = useAuth();

  const getCardsByid = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/cards/${listId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }

      const data: Card = await response.json();
      setCard(data);
    } catch (err) {
      console.log(err);
    }
  }, [getToken, listId]);

  const updateCardTitle = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeParsed = updateCardTitleSchema.safeParse({
      title: newTitle,
    });

    if (!safeParsed.success) {
      const zodError = safeParsed.error.format();
      const message = zodError.title?._errors[0] || "Invalid input";
      toast.error(message);
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`/api/cards/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });

      const data = await response.json();
      toast.success(data.message);
      setIsRename(false);
      onClose();
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

  useEffect(() => {
    if (isOpen) {
      getCardsByid();
    }
  }, [getCardsByid, isOpen]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <PanelsTopLeft size={20} />
        {isRename ? (
          <form onSubmit={updateCardTitle}>
            <Input
              className="w-[300px]"
              onBlur={() => setIsRename(false)}
              placeholder="Enter a new title for this card..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </form>
        ) : (
          <h4
            className="text-lg font-bold text-zinc-700"
            onClick={() => setIsRename(true)}
          >
            {card?.title}
          </h4>
        )}
      </div>
    </div>
  );
};
