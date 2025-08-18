import { AuditLogController } from "../../../controllers/audit-log-controller";
import { AuditLogService } from "../../../services/audit-log-service";
import { clerkClient } from "@clerk/express";
import { Request, Response } from "express";
import { userMock } from "../mock";

jest.mock("@clerk/express", () => ({
  clerkClient: {
    users: {
      getUser: jest.fn(),
    },
  },
  getAuth: jest.fn(() => ({ orgId: "orgId_test", userId: "user_123" })),
}));

jest.mock("../../../services/audit-log-service");

describe("Audit log controller get action", () => {
  let auditLogController: AuditLogController;
  let auditLogService: jest.Mocked<AuditLogService>;

  beforeEach(() => {
    auditLogService = new AuditLogService() as jest.Mocked<AuditLogService>;
    auditLogController = new AuditLogController(auditLogService);
  });

  const req = {
    headers: { authorization: "Bearer token" },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  const fixedDate = new Date("2025-08-17T22:42:41.975Z");

  it("should get all audit log and return status code of 200", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    auditLogService.getAllAuditLogs.mockResolvedValue([
      {
        id: "auditLog_123",
        orgId: "orgId_test",
        userId: "user_123",
        action: "CREATE",
        createdAt: fixedDate,
        updatedAt: fixedDate,
        entityId: "entity_123",
        entityType: "BOARD",
        entityTitle: "Board 1",
        userImage: userMock.imageUrl,
        userName: `${userMock.firstName} ${userMock.lastName}`,
      },
    ]);

    await auditLogController.getAllAuditLogs(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([
      {
        id: "auditLog_123",
        orgId: "orgId_test",
        userId: "user_123",
        action: "CREATE",
        createdAt: fixedDate,
        updatedAt: fixedDate,
        entityId: "entity_123",
        entityType: "BOARD",
        entityTitle: "Board 1",
        userImage: userMock.imageUrl,
        userName: `${userMock.firstName} ${userMock.lastName}`,
      },
    ]);
  });

  it("should not get all audit log and return status code of 400", async () => {
    (clerkClient.users.getUser as jest.Mock).mockRejectedValue(
      new Error("Error")
    );
    auditLogService.getAllAuditLogs.mockRejectedValue(new Error("Error"));

    await auditLogController.getAllAuditLogs(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: "Error",
    });
  });

  it("should not get all audit log and return status code of 500", async () => {
    (clerkClient.users.getUser as jest.Mock).mockResolvedValue(userMock);
    auditLogService.getAllAuditLogs.mockRejectedValue("Unexpected error");

    await auditLogController.getAllAuditLogs(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Unexpected error",
    });
  });
});
