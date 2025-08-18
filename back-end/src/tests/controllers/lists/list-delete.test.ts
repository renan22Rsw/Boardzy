import { ListController } from "../../../controllers/list-controller";
import { AuditLogService } from "../../../services/audit-log-service";
import { ListService } from "../../../services/list-service";
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

describe("List controller delete action", () => {
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
    body: { title: "List 1" },
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  it("should delete list and return a success message", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);

    listService.deleteList.mockResolvedValue(listMock);
    auditLogService.createAuditLog.mockResolvedValue({
      id: "1",
      orgId: "orgId_test",
      createdAt: new Date(),
      updatedAt: new Date(),
      action: "DELETE",
      entityId: listMock.id,
      entityType: "LIST",
      entityTitle: listMock.title,
      userId: "user_123",
      userImage: userMock.imageUrl,
      userName: `${userMock.firstName} ${userMock.lastName}`,
    });

    await listController.deleteList(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.send).toHaveBeenCalledWith({
      message: `The list ${listMock.title} has been deleted`,
    });
  });

  it("should not let user delete the list and return a error message with status code of 400", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.deleteList.mockRejectedValue(new Error("Unexpected error"));
    auditLogService.createAuditLog.mockRejectedValue(
      new Error("Unexpected error")
    );

    await listController.deleteList(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });

  it("should not let user delete the list and return a error message with status code of 500", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.deleteList.mockRejectedValue("Unexpected error");
    auditLogService.createAuditLog.mockRejectedValue("Unexpected error");

    await listController.deleteList(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });
});
