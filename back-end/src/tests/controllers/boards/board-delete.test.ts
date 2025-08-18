import { BoardController } from "../../../controllers/board-controller";
import { BoardService } from "../../../services/board-service";
import { AuditLogService } from "../../../services/audit-log-service";

import { clerkClient } from "@clerk/express";
import { userMock } from "../mock";
import { Request, Response } from "express";
import { boardMock } from "../mock";

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

describe("Board controller delete action", () => {
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
    params: { id: "1" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  it("should delete the board and return a sucess message", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

    boardService.deleteBoard(boardMock.id);

    auditLogService.createAuditLog.mockResolvedValue({
      id: "1",
      orgId: "orgId_test",
      createdAt: new Date(),
      updatedAt: new Date(),
      action: "DELETE",
      entityId: boardMock.id,
      entityType: "BOARD",
      entityTitle: boardMock.title,
      userId: "user_123",
      userImage: userMock.imageUrl,
      userName: `${userMock.firstName} ${userMock.lastName}`,
    });

    await boardController.deleteBoard(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.send).toHaveBeenCalledWith({
      message: `The board ${boardMock.title} has been deleted`,
    });
  });

  it("should not delete the board and return a error message with status code of 400", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

    boardService.deleteBoard.mockRejectedValue(new Error("Unexpected error"));

    auditLogService.createAuditLog.mockRejectedValue(
      new Error("Unexpected error")
    );

    await boardController.deleteBoard(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });

  it("should not delete the board and return a error with status code of 500", async () => {
    boardService.deleteBoard.mockRejectedValue("Unexpected error");

    await boardController.deleteBoard(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });
});
