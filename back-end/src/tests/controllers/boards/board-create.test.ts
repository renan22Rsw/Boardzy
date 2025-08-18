import { BoardController } from "../../../controllers/board-controller";
import { BoardService } from "../../../services/board-service";
import { AuditLogService } from "../../../services/audit-log-service";

import { clerkClient } from "@clerk/express";
import { Request, Response } from "express";
import { userMock, boardMock } from "../mock";

jest.mock("@clerk/express", () => ({
  clerkClient: {
    users: {
      getUser: jest.fn(),
    },
  },
  getAuth: jest.fn(() => ({ orgId: "orgId_test", userId: "user_123" })),
}));

jest.mock("../../../services/board-service");
jest.mock("../../../services/audit-log-service");

describe("Board controller create action", () => {
  let boardController: BoardController;
  let boardService: jest.Mocked<BoardService>;
  let auditLogService: jest.Mocked<AuditLogService>;

  beforeEach(() => {
    boardService = new BoardService() as jest.Mocked<BoardService>;
    auditLogService = new AuditLogService() as jest.Mocked<AuditLogService>;
    boardController = new BoardController(boardService, auditLogService);
  });

  const req = {
    body: { title: "Board 1", color: "#000000" },
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  it("should create a board and return a success message with status code of 201", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

    boardService.createBoard.mockResolvedValue(boardMock);

    auditLogService.createAuditLog.mockResolvedValue({
      id: "1",
      orgId: "orgId_test",
      createdAt: new Date(),
      updatedAt: new Date(),
      action: "CREATE",
      entityId: boardMock.id,
      entityType: "BOARD",
      entityTitle: boardMock.title,
      userId: "user_123",
      userImage: userMock.imageUrl,
      userName: `${userMock.firstName} ${userMock.lastName}`,
    });

    await boardController.createBoard(
      req as Request,
      res as unknown as Response
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "The board Board 1 has been created",
    });
  });

  it("should not create a board and return a error message with status code of 400", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

    boardService.createBoard.mockRejectedValue(new Error("Unexpected error"));

    auditLogService.createAuditLog.mockRejectedValue(
      new Error("Unexpected error")
    );

    await boardController.createBoard(
      req as Request,
      res as unknown as Response
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });

  it("should not create a board and return a error message with status code of 500", async () => {
    boardService.createBoard.mockRejectedValue("Unexpected error");

    await boardController.createBoard(
      req as Request,
      res as unknown as Response
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });
});
