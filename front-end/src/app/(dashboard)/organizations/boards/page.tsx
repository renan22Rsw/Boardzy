import BoardContainer from "./_components/board-container";
import { BoardHeader } from "./_components/board-header";
import { BoardSection } from "./board-section";

const Boards = () => {
  return (
    <BoardContainer>
      <BoardHeader />
      <BoardSection />
    </BoardContainer>
  );
};

export default Boards;
