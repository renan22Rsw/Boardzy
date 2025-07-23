"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardModalHeader } from "./card-modal-header";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CardModalDescription } from "./card-modal-description";
import { CardModalActions } from "./card-modal-actions";
import { CardModalActivity } from "./card-modal-activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle hidden>{id}</DialogTitle>
          <CardModalHeader
            listId={id as string}
            isOpen={isOpen}
            onClose={onClose}
          />
        </DialogHeader>
        <div className="flex justify-between space-x-4">
          <CardModalDescription />
          <CardModalActions listId={id as string} onClose={onClose} />
        </div>
        <CardModalActivity />
      </DialogContent>
    </Dialog>
  );
};
