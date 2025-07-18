"use client";

import { ListHeader } from "./list-header";
import { TextareaForm } from "./textarea-form";
import { useState } from "react";
import { AddCardButton } from "./add-card-button";
import { CardItem } from "./card-item";
import { Card } from "@/types/cards";

interface ListItemProps {
  id: string;
  title: string;
  listId: string;
  data: Card[];
}

export const ListItem = ({ id, title, listId, data }: ListItemProps) => {
  const [isAddCard, setAddCard] = useState<boolean>(false);

  return (
    <div className="px-2 2xl:w-[272px]">
      <div className="w-full rounded-md bg-zinc-200 dark:bg-zinc-800">
        <ListHeader title={title} id={id} />

        {data.map(({ id, title }) => (
          <CardItem id={id} title={title} key={id} />
        ))}

        {isAddCard ? (
          <TextareaForm listId={listId as string} setAddCard={setAddCard} />
        ) : (
          <AddCardButton setAddCard={setAddCard} />
        )}
      </div>
    </div>
  );
};
