import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";
import { boardMock } from "../mock";

jest.mock("../../../db/index", () => ({
  board: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe("Board service get action", () => {
  let boardService: BoardService;

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should not get boards if organization id has not been provided", async () => {
    await expect(boardService.getBoards("")).rejects.toThrow(
      "Organization id is required"
    );

    expect(db.board.findMany).not.toHaveBeenCalled();
  });

  it("should get all boards", async () => {
    (db.board.findMany as jest.Mock).mockResolvedValue([boardMock]);

    const boards = await boardService.getBoards("orgId_test");

    expect(boards).toEqual([boardMock]);

    expect(db.board.findMany).toHaveBeenCalledWith({
      where: {
        orgId: "orgId_test",
      },
    });
  });

  it("should get board by id", async () => {
    (db.board.findUnique as jest.Mock).mockResolvedValue(boardMock);

    const board = await boardService.getBoardById(boardMock.id);

    expect(board).toEqual(boardMock);

    expect(db.board.findUnique).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });
  });
});
