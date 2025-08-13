import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";

jest.mock("../../../db/index", () => ({
  board: {
    delete: jest.fn(),
  },
}));

describe("Board service update action", () => {
  let boardService: BoardService;

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should not delete board if board id has not been provided", async () => {
    await expect(boardService.deleteBoard("")).rejects.toThrow(
      "Board id is required"
    );

    expect(db.board.delete).not.toHaveBeenCalled();
  });

  it("should delete board", async () => {
    (db.board.delete as jest.Mock).mockResolvedValue(null);

    await boardService.deleteBoard("1");

    expect(db.board.delete).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });
  });

  it("should throw an error if prisma fails", async () => {
    (db.board.delete as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(boardService.deleteBoard("1")).rejects.toThrow(
      "Unexpected error"
    );
  });
});
