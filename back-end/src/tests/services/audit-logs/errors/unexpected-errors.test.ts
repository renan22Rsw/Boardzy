import { AuditLogService } from "../../../../services/audit-log-service";
import db from "../../../../db/index";
import { auditLogMock, cardsAuditLogMock } from "../mock";

jest.mock("../../../../db/index", () => ({
  auditLog: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe("Audit log service errors", () => {
  let auditLogService: AuditLogService;

  beforeEach(() => {
    auditLogService = new AuditLogService();
    jest.clearAllMocks();
  });

  it("should throw unexpected error if error is not instance of Error (create audit log)", async () => {
    (db.auditLog.create as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      auditLogService.createAuditLog(auditLogMock, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if is not instance of Error (get all audit logs)", async () => {
    (db.auditLog.findMany as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(auditLogService.getAllAuditLogs("orgId_test")).rejects.toThrow(
      "Unexpected error"
    );
  });

  it("should throw unexpected error if is not instance of Error (get cards audit log)", async () => {
    (db.auditLog.findMany as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      auditLogService.getCardAuditLogs(cardsAuditLogMock, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });
});
