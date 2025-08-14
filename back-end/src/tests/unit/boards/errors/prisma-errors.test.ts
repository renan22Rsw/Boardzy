import { BoardService } from "../../../../services/board-service";
import db from "../../../../db/index";
import { boardMock } from "../mock";

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

describe("Board prisma errors", () => {
  let boardService: BoardService;

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should throw an error if prisma fails (create board) ", async () => {
    (db.board.count as jest.Mock).mockResolvedValue(0);

    (db.board.create as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      boardService.createBoard(boardMock.title, boardMock.color, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (get boards)", async () => {
    (db.board.findMany as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(boardService.getBoards("orgId_test")).rejects.toThrow(
      "Unexpected error"
    );
  });

  it("should throw an error if prisma fails (get board by id)", async () => {
    (db.board.findUnique as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(boardService.getBoardById("orgId_test")).rejects.toThrow(
      "Unexpected error"
    );
  });

  it("should throw an error if prisma fails (update board title)", async () => {
    (db.board.update as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      boardService.updateBoardTitle("1", "Board 1 updated")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (delete board)", async () => {
    (db.board.delete as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(boardService.deleteBoard("1")).rejects.toThrow(
      "Unexpected error"
    );
  });
});
