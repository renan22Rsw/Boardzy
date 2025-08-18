import { ListController } from "../../../controllers/list-controller";
import { ListService } from "../../../services/list-service";
import { AuditLogService } from "../../../services/audit-log-service";

import { clerkClient } from "@clerk/express";
import { Request, Response } from "express";
import { userMock, listMock } from "../mock";

jest.mock("@clerk/express", () => ({
  clerkClient: {
    users: {
      getUser: jest.fn(),
    },
  },
  getAuth: jest.fn(() => ({ orgId: "orgId_test", userId: "user_123" })),
}));

jest.mock("../../../services/list-service");
jest.mock("../../../services/audit-log-service");

describe("List controller update actions", () => {
  let listController: ListController;
  let listService: jest.Mocked<ListService>;
  let auditLogService: jest.Mocked<AuditLogService>;

  beforeEach(() => {
    listService = new ListService() as jest.Mocked<ListService>;
    auditLogService = new AuditLogService() as jest.Mocked<AuditLogService>;
    listController = new ListController(listService, auditLogService);
  });

  const req = {
    params: { id: "id_test" },
    body: { title: "List 1", items: [{ id: "id_test", order: 1 }] },
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  describe("Update list title action", () => {
    it("should update the list title and return success message", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      listService.updateListTitle.mockResolvedValue(listMock);
      auditLogService.createAuditLog.mockResolvedValue({
        id: "1",
        orgId: "orgId_test",
        createdAt: new Date(),
        updatedAt: new Date(),
        action: "UPDATE",
        entityId: listMock.id,
        entityType: "LIST",
        entityTitle: listMock.title,
        userId: "user_123",
        userImage: userMock.imageUrl,
        userName: `${userMock.firstName} ${userMock.lastName}`,
      });

      await listController.updateListTitle(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.send).toHaveBeenCalledWith({
        message: `The title of your list ${listMock.title} has been updated`,
      });
    });

    it("should not update list title and return a error message with status code of 400", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      listService.updateListTitle.mockRejectedValue(
        new Error("Unexpected error")
      );
      auditLogService.createAuditLog.mockRejectedValue(
        new Error("Unexpected error")
      );

      await listController.updateListTitle(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });

    it("should not update list title and return a error message with status code of 500", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      listService.updateListTitle.mockRejectedValue("Unexpected error");
      auditLogService.createAuditLog.mockRejectedValue("Unexpected error");

      await listController.updateListTitle(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });
  });

  describe("Update list order action", () => {
    it("should update list order and return a success message", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      listService.updateListOrder.mockResolvedValue([listMock]);

      await listController.updateListOrder(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.send).toHaveBeenCalledWith({
        message: "Your list order has been updated",
      });
    });

    it("should not update list order and return an error message with status code of 400", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      listService.updateListOrder.mockRejectedValue(
        new Error("Unexpected error")
      );

      await listController.updateListOrder(
        req as unknown as Request,
        res as unknown as Response
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Unexpected error",
      });
    });

    it("should not update list order and return an error message with status code of 500", async () => {
      (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
      listService.updateListOrder.mockRejectedValue("Unexpected error");

      await listController.updateListOrder(
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
