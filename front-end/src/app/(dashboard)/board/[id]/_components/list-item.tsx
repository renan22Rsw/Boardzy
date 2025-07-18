"use client";

import { ListHeader } from "./list-header";
import { TextareaForm } from "./textarea-form";
import { useState } from "react";
import { AddCardButton } from "./add-card-button";
import { CardItem } from "./card-item";
import { Card } from "@/types/cards";

import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  id: string;
  title: string;
  listId: string;
  data: Card[];
  index: number;
}

export const ListItem = ({ id, title, listId, data, index }: ListItemProps) => {
  const [isAddCard, setAddCard] = useState<boolean>(false);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="px-2 2xl:w-[272px]"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="w-full rounded-md bg-zinc-200 dark:bg-zinc-800"
            {...provided.dragHandleProps}
          >
            <ListHeader title={title} id={id} />

            <Droppable droppableId={id} type="card">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map(({ id, title }, index) => (
                    <CardItem id={id} title={title} key={id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {isAddCard ? (
              <TextareaForm listId={listId as string} setAddCard={setAddCard} />
            ) : (
              <AddCardButton setAddCard={setAddCard} />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
