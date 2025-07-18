import { getBoardById } from "@/lib/api/get-boards-by-id";
import { notFound } from "next/navigation";
import { ListNavbar } from "./_components/list-navbar";
import { ListSection } from "./_components/list-section";
import { getBoardList } from "@/lib/api/get-board-lists";
import { BoardIdPageContainer } from "./_components/container";

const BoardIdPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const board = await getBoardById(id);
  const list = await getBoardList(id);

  if (!board?.id) {
    notFound();
  }

  return (
    <BoardIdPageContainer>
      <ListNavbar
        id={board.id}
        orgId={board.orgId}
        title={board.title}
        backgroundColor={board.color}
      />
      <ListSection data={list} />
    </BoardIdPageContainer>
  );
};

export default BoardIdPage;
