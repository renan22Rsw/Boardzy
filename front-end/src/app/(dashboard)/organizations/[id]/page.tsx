import { getBoards } from "@/lib/api/get-boards";
import BoardContainer from "./_components/board-container";
import { BoardHeader } from "./_components/board-header";
import { BoardSection } from "./_components/board-section";

const OrganazationIdPage = async () => {
  const boards = await getBoards();

  return (
    <BoardContainer>
      <BoardHeader />
      <BoardSection boards={boards} />
    </BoardContainer>
  );
};

export default OrganazationIdPage;
