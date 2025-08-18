import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";
import { boardMock } from "../mock";

jest.mock("../../../db/index", () => ({
  board: {
    update: jest.fn(),
  },
}));

describe("Board service update action", () => {
  let boardService: BoardService;

  const boardUpdatedTitle = {
    ...boardMock,
    title: "Board 1 updated",
  };

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should not update board title if board id has not been provided", async () => {
    await expect(
      boardService.updateBoardTitle("", boardMock.title)
    ).rejects.toThrow("Board id is required");

    expect(db.board.update).not.toHaveBeenCalled();
  });

  it("should update board title", async () => {
    (db.board.update as jest.Mock).mockResolvedValue(boardUpdatedTitle);

    const board = await boardService.updateBoardTitle(
      boardMock.id,
      "Board 1 updated"
    );

    expect(board).toEqual(boardUpdatedTitle);

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
