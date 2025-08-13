import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";

jest.mock("../../../db/index", () => ({
  board: {
    update: jest.fn(),
  },
}));

describe("Board service update action", () => {
  let boardService: BoardService;

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should not update board title if board id has not been provided", async () => {
    await expect(
      boardService.updateBoardTitle("", "Board 1 updated")
    ).rejects.toThrow("Board id is required");

    expect(db.board.update).not.toHaveBeenCalled();
  });

  it("should update board title", async () => {
    (db.board.update as jest.Mock).mockResolvedValue({
      id: "1",
      title: "Board 1 updated",
      color: "#000000",
      orgId: "1",
    });

    const board = await boardService.updateBoardTitle("1", "Board 1 updated");

    expect(board).toEqual({
      id: "1",
      title: "Board 1 updated",
      color: "#000000",
      orgId: "1",
    });

    expect(db.board.update).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
      data: {
        title: "Board 1 updated",
      },
    });
  });

  it("should throw an error if prisma fails", async () => {
    (db.board.update as jest.Mock).mockRejectedValue(
      new Error("Prisma failed")
    );

    await expect(
      boardService.updateBoardTitle("1", "Board 1 updated")
    ).rejects.toThrow("Prisma failed");

    expect(db.board.update).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
      data: {
        title: "Board 1 updated",
      },
    });
  });
});
