import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";
import { boardMockUpdated } from "./mock";

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
      boardService.updateBoardTitle("", boardMockUpdated.title)
    ).rejects.toThrow("Board id is required");

    expect(db.board.update).not.toHaveBeenCalled();
  });

  it("should update board title", async () => {
    (db.board.update as jest.Mock).mockResolvedValue(boardMockUpdated);

    const board = await boardService.updateBoardTitle(
      boardMockUpdated.id,
      boardMockUpdated.title
    );

    expect(board).toEqual(boardMockUpdated);

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
