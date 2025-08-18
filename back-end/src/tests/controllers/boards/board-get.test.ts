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

describe("Board controller get actions", () => {
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

  describe("Get all boards action", () => {
    it("should get all boards and return status code of 200", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

      boardService.getBoards.mockResolvedValue([boardMock]);

      await boardController.getBoards(
        req as unknown as Request,
        res as unknown as Response
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([boardMock]);
    });

    it("should not get the boards and return status code of 400", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

      boardService.getBoards.mockRejectedValue(new Error("Unexpected error"));

      await boardController.getBoards(
        req as unknown as Request,
        res as unknown as Response
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });

    it("should get the boards and return status code of 500", async () => {
      boardService.getBoards.mockRejectedValue("Unexpected error");

      await boardController.getBoards(
        req as unknown as Request,
        res as unknown as Response
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });
  });

  describe("Get board by id action", () => {
    it("should get a board by id and return code status of 200", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

      boardService.getBoardById.mockResolvedValue(boardMock);

      await boardController.getBoardById(
        req as unknown as Request,
        res as unknown as Response
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(boardMock);
    });

    it("should not get a board by id and return code status of 400", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

      boardService.getBoardById.mockRejectedValue(
        new Error("Unexpected error")
      );

      await boardController.getBoardById(
        req as unknown as Request,
        res as unknown as Response
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });

    it("should not get a board by id and return code status of 500", async () => {
      boardService.getBoardById.mockRejectedValue("Unexpected error");

      await boardController.getBoardById(
        req as unknown as Request,
        res as unknown as Response
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });
  });
});
