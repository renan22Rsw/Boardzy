import { Activity } from "lucide-react";

export const CardModalActivity = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-x-2">
        <Activity size={20} />
        <h6 className="text-sm font-semibold text-zinc-700">Activity</h6>
      </div>
      <div>
        <div className="mx-6 flex gap-x-2">
          <div className="h-[30px] w-[30px] rounded-full bg-purple-700">
            {" "}
            {/*Imagem do usuário */}
          </div>
          <span className="gap-x-0.5 text-sm font-semibold text-zinc-600">
            <h6 className="text-zinc-800">Renan added a card Team 7</h6>
            <span className="text-xs text-zinc-500">July 20, 2025</span>
          </span>
        </div>
      </div>
    </div>
  );
};
