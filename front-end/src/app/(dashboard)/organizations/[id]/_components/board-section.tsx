import { User } from "lucide-react";
import { CreateBoard } from "./create-board";
import { BoardTitle } from "./board-title";

interface Boards {
  id: string;
  title: string;
  color: string;
}

interface BoardSectionProps {
  boards: Boards[];
}

export const BoardSection = ({ boards }: BoardSectionProps) => {
  return (
    <section className="px-4">
      <span className="flex gap-2 text-lg font-bold text-zinc-800 dark:text-zinc-100">
        <User size={30} />
        Your boards
      </span>

      <div className="grid grid-cols-2 gap-4 py-4 lg:grid-cols-4">
        {boards?.length > 0 &&
          boards.map((board) => (
            <div
              key={board.id}
              className="flex h-[70px] cursor-pointer items-start justify-between rounded-md px-2 lg:h-[100px] lg:w-[240px]"
              style={{ backgroundColor: board.color }}
            >
              <BoardTitle title={board.title} id={board.id} />
            </div>
          ))}
        <CreateBoard boardRemaning={boards?.length} />
      </div>
    </section>
  );
};
