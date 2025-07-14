"use client";

import { Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const ListNavbarRename = ({
  setRename,
}: {
  setRename: Dispatch<SetStateAction<boolean>>;
}) => {
  return <Pencil className="cursor-pointer" onClick={() => setRename(true)} />;
};
