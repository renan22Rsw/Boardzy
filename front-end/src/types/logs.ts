export interface Logs {
  id: string;
  entityTitle: string;
  entityType: EntityType;
  userImage: string;
  action: Action;
}

export enum Action {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum EntityType {
  CARD = "CARD",
  LIST = "LIST",
  BOARD = "BOARD",
}
