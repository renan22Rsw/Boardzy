"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  id: string;
  title: string;
  index: number;
}

export const CardItem = ({ id, title, index }: CardItemProps) => {
  const cardModel = useCardModal();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full cursor-pointer rounded-md border-2 bg-zinc-100 px-3 py-2 text-sm shadow-sm hover:border-black dark:bg-zinc-900"
          onClick={() => cardModel.onOpen(id)}
        >
          {title}
        </div>
      )}
    </Draggable>
  );
};
