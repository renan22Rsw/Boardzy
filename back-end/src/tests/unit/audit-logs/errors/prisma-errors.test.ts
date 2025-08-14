import { AuditLogService } from "../../../../services/audit-log-service";
import db from "../../../../db/index";
import { auditLogMock, cardsAuditLogMock } from "../mock";

jest.mock("../../../../db/index", () => ({
  auditLog: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

let auditLogService: AuditLogService;

beforeEach(() => {
  auditLogService = new AuditLogService();
  jest.clearAllMocks();
});

describe("Audit log prisma erros", () => {
  it("should throw an error if prisma fails (create audit log)", async () => {
    (db.auditLog.create as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      auditLogService.createAuditLog(auditLogMock, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (get all audit logs)", async () => {
    (db.auditLog.findMany as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(auditLogService.getAllAuditLogs("orgId_test")).rejects.toThrow(
      "Unexpected error"
    );
  });

  it("should throw an error if prisma fails (get cards audit log)", async () => {
    (db.auditLog.findMany as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      auditLogService.getCardAuditLogs(cardsAuditLogMock, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });
});
