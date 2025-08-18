import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";
import { boardMock } from "../mock";

jest.mock("../../../db/index", () => ({
  board: {
    create: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
  },
}));

describe("Board service create action", () => {
  let boardService: BoardService;

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should not create a board if organization id has not been provided", async () => {
    await expect(
      boardService.createBoard(boardMock.title, boardMock.color, "")
    ).rejects.toThrow("Organization id is required");

    expect(db.board.count).not.toHaveBeenCalled();
    expect(db.board.create).not.toHaveBeenCalled();
  });

  it("should create a board", async () => {
    (db.board.count as jest.Mock).mockResolvedValue(0);

    (db.board.create as jest.Mock).mockResolvedValue(boardMock);

    const board = await boardService.createBoard(
      boardMock.title,
      boardMock.color,
      boardMock.orgId
    );

    expect(board).toEqual(boardMock);

    expect(db.board.count).toHaveBeenCalledWith({
      where: {
        orgId: "orgId_test",
      },
    });

    expect(db.board.create).toHaveBeenCalledWith({
      data: {
        title: "Board 1",
        color: "#000000",
        orgId: "orgId_test",
      },
    });
  });

  it("should not create a board if the user has reached the maximum number of boards", async () => {
    (db.board.count as jest.Mock).mockResolvedValue(5);

    await expect(
      boardService.createBoard(boardMock.title, boardMock.color, "orgId_test")
    ).rejects.toThrow("You have reached the maximum number of boards");
  });
});
