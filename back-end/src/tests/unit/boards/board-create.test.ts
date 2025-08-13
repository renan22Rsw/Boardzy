import { BoardService } from "../../../services/board-service";
import db from "../../../db/index";

jest.mock("../../../db/index", () => ({
  board: {
    create: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
  },
}));

describe("Board service create actions", () => {
  let boardService: BoardService;

  beforeEach(() => {
    boardService = new BoardService();
    jest.clearAllMocks();
  });

  it("should not create a board if organization id has not been provided", async () => {
    await expect(
      boardService.createBoard("Board 1", "#000000", "")
    ).rejects.toThrow("Organization id is required");

    expect(db.board.count).not.toHaveBeenCalled();
    expect(db.board.create).not.toHaveBeenCalled();
  });

  it("should create a board", async () => {
    (db.board.count as jest.Mock).mockResolvedValue(0);

    (db.board.create as jest.Mock).mockResolvedValue({
      id: "1",
      title: "Board 1",
      color: "#000000",
      orgId: "orgId_test",
    });

    const board = await boardService.createBoard(
      "Board 1",
      "#000000",
      "orgId_test"
    );

    expect(board).toEqual({
      id: "1",
      title: "Board 1",
      color: "#000000",
      orgId: "orgId_test",
    });

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
      boardService.createBoard("Board 1", "#000000", "orgId_test")
    ).rejects.toThrow("You have reached the maximum number of boards");
  });

  it("should throw an error if prisma fails", async () => {
    (db.board.count as jest.Mock).mockResolvedValue(0);

    (db.board.create as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      boardService.createBoard("Board 1", "#000000", "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });
});
