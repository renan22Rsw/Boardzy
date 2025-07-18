"use client";

import { List } from "@/types/lists";

export const CardItem = ({ title, id }: List) => {
  return (
    <div
      className="w-full cursor-pointer rounded-md border-2 px-3 py-2 text-sm shadow-sm hover:border-black dark:bg-zinc-900"
      onClick={() => console.log(id)}
    >
      {title}
    </div>
  );
};
