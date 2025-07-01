import { User } from "lucide-react";
import { BoardDropdown } from "./board-dropdown";
import { CreateBoard } from "./create-board";

interface Boards {
  id: number;
  title: string;
  boardColor: string;
}

const boards: Boards[] = [
  {
    id: 1,
    title: "Board 1",
    boardColor: "#128115",
  },
  {
    id: 2,
    title: "Board 2",
    boardColor: "#ffc733 ",
  },
  {
    id: 3,
    title: "Board 3",
    boardColor: "#e633ff",
  },
  {
    id: 4,
    title: "Board 4",
    boardColor: " #336eff",
  },
];

export const BoardSection = () => {
  return (
    <section className="px-4">
      <span className="flex gap-2 text-lg font-bold text-zinc-800 dark:text-zinc-100">
        <User size={30} />
        Your boards
      </span>

      <div className="grid grid-cols-2 gap-4 py-4 lg:grid-cols-4">
        {boards.length > 0 &&
          boards.map((board) => (
            <div
              key={board.id}
              className="flex h-[70px] cursor-pointer items-start justify-between rounded-md px-2 lg:h-[100px] lg:w-[240px]"
              style={{ backgroundColor: board.boardColor }}
            >
              <h6 className="font-semibold text-zinc-800 dark:text-zinc-100">
                {board.title}
              </h6>
              <BoardDropdown boardTitle={board.title} />
            </div>
          ))}
        <CreateBoard boardRemaning={boards.length} />
      </div>
    </section>
  );
};
