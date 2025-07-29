export interface Logs {
  id: string;
  orgId: string;
  action: ACTION;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  userId: string;
  userImage: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ACTION {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum ENTITY_TYPE {
  CARD = "CARD",
  LIST = "LIST",
  BOARD = "BOARD",
}
