"use client";

import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export const BoardHeader = () => {
  const { organization } = useOrganization();

  return (
    <header className="border-b-2 py-2">
      <div className="flex items-center space-x-2">
        {organization?.imageUrl && (
          <Image
            src={organization?.imageUrl as string}
            width={50}
            height={50}
            alt="organization icon"
            className="rounded-lg"
          />
        )}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
            {organization?.name}
          </h3>
          <span className="flex items-center gap-1 text-sm text-zinc-800 dark:text-zinc-300">
            <CreditCard size={16} />
            Free
          </span>
        </div>
      </div>
    </header>
  );
};
