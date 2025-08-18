import { Props, User } from "../../../services/audit-log-service";

export const UserMock: User = {
  id: "1",
  firstName: "Renan",
  lastName: "Victor",
  image: "https://example.com/image.jpg",
};

export const auditLogMock: Props = {
  entityId: "1",
  entityType: "BOARD",
  entityTitle: "Board 1",
  action: "CREATE",
  user: UserMock,
};

export const cardsAuditLogMock: Props = {
  entityId: "1",
  entityType: "CARD",
  entityTitle: "Card 1",
  action: "CREATE",
  user: UserMock,
};
