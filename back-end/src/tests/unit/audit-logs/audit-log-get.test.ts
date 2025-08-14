import { AuditLogService } from "../../../services/audit-log-service";
import db from "../../../db/index";
import { auditLogMock, cardsAuditLogMock } from "./mock";

jest.mock("../../../db/index", () => ({
  auditLog: {
    findMany: jest.fn(),
  },
}));

describe("Audit log service get action", () => {
  let auditLogService: AuditLogService;

  beforeEach(() => {
    auditLogService = new AuditLogService();
    jest.clearAllMocks();
  });
  it("should not get audit logs if organization id has not been provided", async () => {
    await expect(auditLogService.getAllAuditLogs("")).rejects.toThrow(
      "Organization id is required"
    );

    expect(db.auditLog.findMany).not.toHaveBeenCalled();
  });

  it("should get all audit logs", async () => {
    (db.auditLog.findMany as jest.Mock).mockResolvedValue(auditLogMock);

    const auditLogs = await auditLogService.getAllAuditLogs("orgId_test");

    expect(auditLogs).toEqual(auditLogMock);

    expect(db.auditLog.findMany).toHaveBeenCalledWith({
      where: {
        orgId: "orgId_test",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  });

  it("should not get cards audit log if organization id has not been provided", async () => {
    await expect(
      auditLogService.getCardAuditLogs(cardsAuditLogMock, "")
    ).rejects.toThrow("Organization id is required");

    expect(db.auditLog.findMany).not.toHaveBeenCalled();
  });

  it("should get cards audit log", async () => {
    (db.auditLog.findMany as jest.Mock).mockResolvedValue(cardsAuditLogMock);

    const cardAuditLogs = await auditLogService.getCardAuditLogs(
      cardsAuditLogMock,
      "orgId_test"
    );

    expect(cardAuditLogs).toEqual(cardsAuditLogMock);

    expect(db.auditLog.findMany).toHaveBeenCalledWith({
      where: {
        orgId: "orgId_test",
        entityId: "1",
        entityType: "CARD",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
  });
});
