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

describe("List controller create action", () => {
  let listController: ListController;
  let listService: jest.Mocked<ListService>;
  let auditLogService: jest.Mocked<AuditLogService>;

  beforeEach(() => {
    listService = new ListService() as jest.Mocked<ListService>;
    auditLogService = new AuditLogService() as jest.Mocked<AuditLogService>;
    listController = new ListController(listService, auditLogService);
  });

  const req = {
    body: { title: "List 1", boardId: "boardId_test" },
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  it("should create a list and return status code of 201", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.createList.mockResolvedValue(listMock);

    auditLogService.createAuditLog.mockResolvedValue({
      id: "1",
      orgId: "orgId_test",
      createdAt: new Date(),
      updatedAt: new Date(),
      action: "CREATE",
      entityId: listMock.id,
      entityType: "LIST",
      entityTitle: listMock.title,
      userId: "user_123",
      userImage: userMock.imageUrl,
      userName: `${userMock.firstName} ${userMock.lastName}`,
    });

    await listController.createList(req as Request, res as unknown as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "The list List 1 has been created",
    });
  });

  it("should not create a list and return status code of 400", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.createList.mockRejectedValue(new Error("Unexpected error"));
    auditLogService.createAuditLog.mockRejectedValue(
      new Error("Unexpected error")
    );

    await listController.createList(req as Request, res as unknown as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });

  it("should not create a list and return status code of 500", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.createList.mockRejectedValue("Unexpected error");
    auditLogService.createAuditLog.mockRejectedValue("Unexpected error");

    await listController.createList(req as Request, res as unknown as Response);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });
});
