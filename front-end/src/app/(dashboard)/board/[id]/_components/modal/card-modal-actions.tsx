"use client";

import { Button } from "@/components/ui/button";
import useCardData from "@/hooks/use-cards-data";
import { useAuth } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CardModalActionsProps {
  listId: string;
  onClose: () => void;
}

export const CardModalActions = ({
  listId,
  onClose,
}: CardModalActionsProps) => {
  const { getToken } = useAuth();
  const router = useRouter();
  const { cards } = useCardData(listId);

  const handleDelete = async () => {
    onClose();
    try {
      const token = await getToken();
      const response = await fetch(`/api/cards/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ id: cards?.id, title: cards?.title }),
      });
      const data = await response.json();
      toast.success(data.message);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      console.log(err);
    }
  };

  return (
    <div className="space-y-2 pt-2">
      <h6 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
        Actions
      </h6>
      <Button
        variant={"outline"}
        className="h-[30px] w-[100px] cursor-pointer font-semibold text-zinc-700"
        onClick={handleDelete}
      >
        <Trash size={20} />
        Delete
      </Button>
    </div>
  );
};
