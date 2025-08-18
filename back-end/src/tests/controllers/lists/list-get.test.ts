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

describe("List controller get action", () => {
  let listController: ListController;
  let listService: jest.Mocked<ListService>;
  let auditLogService: jest.Mocked<AuditLogService>;

  beforeEach(() => {
    listService = new ListService() as jest.Mocked<ListService>;
    auditLogService = new AuditLogService() as jest.Mocked<AuditLogService>;
    listController = new ListController(listService, auditLogService);
  });

  const req = {
    params: { boardId: "boardId_test" },
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  it("should get lists and return status code of 200", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.getLists.mockResolvedValue([listMock]);

    await listController.getList(
      req as unknown as Request,
      res as unknown as Response
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([listMock]);
  });

  it("should not get lists and return status code of 400", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.getLists.mockRejectedValue(new Error("Unexpected error"));

    await listController.getList(
      req as unknown as Request,
      res as unknown as Response
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });

  it("should not get lists and return status code of 500", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    listService.getLists.mockRejectedValue("Unexpected error");

    await listController.getList(
      req as unknown as Request,
      res as unknown as Response
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });
});
