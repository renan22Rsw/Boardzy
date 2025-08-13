import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";

jest.mock("../../../db/index", () => ({
  board: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe("Board service get actions", () => {
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
    (db.board.findMany as jest.Mock).mockResolvedValue([
      {
        id: "1",
        title: "Board 1",
        color: "#000000",
        orgId: "orgId_test",
      },
    ]);

    const boards = await boardService.getBoards("orgId_test");

    expect(boards).toEqual([
      {
        id: "1",
        title: "Board 1",
        color: "#000000",
        orgId: "orgId_test",
      },
    ]);

    expect(db.board.findMany).toHaveBeenCalledWith({
      where: {
        orgId: "orgId_test",
      },
    });
  });

  it("should get board by id", async () => {
    (db.board.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      title: "Board 1",
      color: "#000000",
      orgId: "orgId_test",
    });

    const board = await boardService.getBoardById("orgId_test");

    expect(board).toEqual({
      id: "1",
      title: "Board 1",
      color: "#000000",
      orgId: "orgId_test",
    });

    expect(db.board.findUnique).toHaveBeenCalledWith({
      where: {
        id: "orgId_test",
      },
    });
  });

  it("should throw an error if prisma fails", async () => {
    (db.board.findMany as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(boardService.getBoards("orgId_test")).rejects.toThrow(
      "Unexpected error"
    );
  });

  it("should throw an error if prisma fails (get by id)", async () => {
    (db.board.findUnique as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(boardService.getBoardById("orgId_test")).rejects.toThrow(
      "Unexpected error"
    );
  });
});
