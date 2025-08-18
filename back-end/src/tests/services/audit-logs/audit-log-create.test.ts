import { AuditLogService } from "../../../services/audit-log-service";
import db from "../../../db/index";
import { auditLogMock } from "./mock";

jest.mock("../../../db/index", () => ({
  auditLog: {
    create: jest.fn(),
  },
}));

describe("Audit log service action", () => {
  let auditLogService: AuditLogService;

  beforeEach(() => {
    auditLogService = new AuditLogService();
    jest.clearAllMocks();
  });

  it("should not create an audit log if organization id has not been provided", async () => {
    await expect(
      auditLogService.createAuditLog(auditLogMock, "")
    ).rejects.toThrow("Organization id is required");

    expect(db.auditLog.create).not.toHaveBeenCalled();
  });

  it("should create an audit log", async () => {
    (db.auditLog.create as jest.Mock).mockResolvedValue(auditLogMock);

    const auditLog = await auditLogService.createAuditLog(
      auditLogMock,
      "orgId_test"
    );

    expect(auditLog).toEqual(auditLogMock);
    expect(db.auditLog.create).toHaveBeenCalledWith({
      data: {
        orgId: "orgId_test",
        entityId: "1",
        entityType: "BOARD",
        entityTitle: "Board 1",
        action: "CREATE",
        userId: "1",
        userImage: "https://example.com/image.jpg",
        userName: "Renan Victor",
      },
    });
  });
});
