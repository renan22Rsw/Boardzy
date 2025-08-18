import { BoardService } from "../../../../services/board-service";
import db from "../../../../db/index";
import { boardMock } from "../../mock";

jest.mock("../../../../db/index", () => ({
  board: {
    count: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Board service errors", () => {
  let boardService: BoardService;

  const boardUpdatedTitle = {
    ...boardMock,
    title: "Board 1 updated",
  };

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should throw unexpected error if error is not instance of Error (create board)", async () => {
    (db.board.create as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      boardService.createBoard(boardMock.title, boardMock.color, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if error is not instance of Error (get boards)", async () => {
    (db.board.findMany as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(boardService.getBoards(boardMock.orgId)).rejects.toThrow(
      "Unexpected error"
    );
  });

  it("should throw unexpected error if error is not instance of Error (get board by id)", async () => {
    (db.board.findUnique as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(boardService.getBoardById(boardMock.id)).rejects.toThrow(
      "Unexpected error"
    );
  });

  it("should throw unexpected error if error is not instance of Error (update board title)", async () => {
    (db.board.update as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      boardService.updateBoardTitle(
        boardUpdatedTitle.id,
        boardUpdatedTitle.title
      )
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if error is not instance of Error (delete board)", async () => {
    (db.board.delete as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(boardService.deleteBoard(boardMock.id)).rejects.toThrow(
      "Unexpected error"
    );
  });
});
