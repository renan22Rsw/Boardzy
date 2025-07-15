import { getBoardById } from "@/lib/api/get-boards-by-id";
import { notFound } from "next/navigation";
import { ListNavbar } from "./_components/list-navbar";
import { ListSection } from "./_components/list-section";
import { ListContainer } from "./_components/list-container";
import { getBoardList } from "@/lib/api/get-board-lists";

const BoardIdPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const board = await getBoardById(id);
  const list = await getBoardList(id);

  if (!board?.id) {
    notFound();
  }

  return (
    <ListContainer>
      <ListNavbar
        id={board.id}
        orgId={board.orgId}
        title={board.title}
        backgroundColor={board.color}
      />
      <ListSection data={list} />
    </ListContainer>
  );
};

export default BoardIdPage;
