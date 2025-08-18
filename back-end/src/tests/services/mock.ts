export const boardMock = {
  id: "1",
  title: "Board 1",
  color: "#000000",
  orgId: "orgId_test",
};

export const listMock = {
  id: "1",
  title: "List 1",
  boardId: "boardId_test",
  order: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  card: [
    {
      id: "1",
      title: "Card 1",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "Description 1",
      listId: "listId_test",
    },
  ],
};

export const cardMock = {
  id: "1",
  title: "Card 1",
  listId: "listId_test",
  order: 1,
};
