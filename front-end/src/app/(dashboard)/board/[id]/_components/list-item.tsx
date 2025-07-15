"use client";

import { List } from "@/types/lists";
import { ListHeader } from "./list-header";

export const ListItem = ({ id, title }: List) => {
  return (
    <div className="h-full xl:w-[272px]">
      <div className="w-full rounded-md bg-zinc-200 dark:bg-zinc-800">
        <ListHeader title={title} id={id} />
      </div>
    </div>
  );
};
