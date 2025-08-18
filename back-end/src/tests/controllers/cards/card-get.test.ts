import { clerkClient } from "@clerk/express";
import { Request, Response } from "express";
import { cardMock, userMock } from "../mock";
import { CardController } from "../../../controllers/card-controller";
import { CardService } from "../../../services/card-service";
import { AuditLogService } from "../../../services/audit-log-service";

jest.mock("@clerk/express", () => ({
  clerkClient: {
    users: {
      getUser: jest.fn(),
    },
  },
  getAuth: jest.fn(() => ({ orgId: "orgId_test", userId: "user_123" })),
}));

jest.mock("../../../services/card-service");
jest.mock("../../../services/audit-log-service");

describe("Card controller get actions", () => {
  let cardController: CardController;
  let cardService: jest.Mocked<CardService>;
  let auditLogService: jest.Mocked<AuditLogService>;
  beforeEach(() => {
    cardService = new CardService() as jest.Mocked<CardService>;
    auditLogService = new AuditLogService() as jest.Mocked<AuditLogService>;
    cardController = new CardController(cardService, auditLogService);
  });

  const req = {
    params: { id: "id_test" },
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  describe("Get cards by id action", () => {
    it("should get cards by id and return a code status of 200", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      cardService.getCardById.mockResolvedValue(cardMock);

      await cardController.getCardById(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(cardMock);
    });

    it("should not get cards by id and return a code status of 400", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      cardService.getCardById.mockRejectedValue(new Error("Unexpected error"));

      await cardController.getCardById(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });

    it("should not get cards by id and return a code status of 500", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      cardService.getCardById.mockRejectedValue("Unexpected error");

      await cardController.getCardById(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });
  });

  describe("Get cards audit logs", () => {
    it("should get cards audit log and return a status code of 200", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      auditLogService.getCardAuditLogs.mockResolvedValue([]);

      await cardController.getCardsAuditLogs(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([]);
    });

    it("should not get cards audit log and return a status code of 400", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      auditLogService.getCardAuditLogs.mockRejectedValue(
        new Error("Unexpected error")
      );

      await cardController.getCardsAuditLogs(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });

    it("should not get cards audit log and return a status code of 500", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      auditLogService.getCardAuditLogs.mockRejectedValue("Unexpected error");

      await cardController.getCardsAuditLogs(
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
