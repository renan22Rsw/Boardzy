import { CreditCard } from "lucide-react";
import Image from "next/image";

export const BoardHeader = () => {
  return (
    <header className="border-b-2">
      <div className="flex">
        <Image
          src={
            "https://png.pngtree.com/png-vector/20220930/ourmid/pngtree-small-building-png-image_6241917.png"
          }
          width={70}
          height={70}
          alt="organization icon"
        />
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Lorem Inc.
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
