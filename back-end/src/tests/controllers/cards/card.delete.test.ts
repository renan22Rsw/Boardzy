import { CardController } from "../../../controllers/card-controller";
import { CardService } from "../../../services/card-service";
import { AuditLogService } from "../../../services/audit-log-service";
import { clerkClient } from "@clerk/express";
import { Request, Response } from "express";
import { cardMock, userMock } from "../mock";

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

describe("Card controller update actions", () => {
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
    body: { title: "Card 1" },
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  it("should delete the card and return a success message with status code of 200", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    cardService.deleteCard.mockResolvedValue(cardMock);

    auditLogService.createAuditLog.mockResolvedValue({
      id: "1",
      orgId: "orgId_test",
      createdAt: new Date(),
      updatedAt: new Date(),
      action: "DELETE",
      entityId: cardMock.id,
      entityType: "CARD",
      entityTitle: cardMock.title,
      userId: "user_123",
      userImage: userMock.imageUrl,
      userName: `${userMock.firstName} ${userMock.lastName}`,
    });

    await cardController.deleteCard(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: `The card ${cardMock.title} has been deleted`,
    });
  });

  it("should not delete the card and return an error message with status code of 400", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    cardService.deleteCard.mockRejectedValue(new Error("Unexpected error"));

    auditLogService.createAuditLog.mockRejectedValue(
      new Error("Unexpected error")
    );

    await cardController.deleteCard(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });

  it("should not delete the card and return an error message with status code of 500", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    cardService.deleteCard.mockRejectedValue("Unexpected error");
    auditLogService.createAuditLog.mockRejectedValue("Unexpected error");

    await cardController.deleteCard(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });
});
