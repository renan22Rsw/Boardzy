import { ListService } from "../../../../services/list-service";
import db from "../../../../db/index";
import { listMock, listUpdatedMock, listUpdatedOrderMock } from "../mock";

jest.mock("../../../../db/index", () => ({
  list: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $transaction: jest.fn(async (promises) => Promise.all(promises)),
}));

describe("List prisma erros", () => {
  let listService: ListService;

  beforeEach(() => {
    listService = new ListService();
    jest.clearAllMocks();
  });

  it("should throw an error if prisma fails (create list)", async () => {
    (db.list.create as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      listService.createList(listMock.title, listMock.boardId, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (get lists)", async () => {
    (db.list.findMany as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      listService.getLists(listMock.boardId, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (update list title)", async () => {
    (db.list.update as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );
    await expect(
      listService.updateListTitle(listUpdatedMock.id, listUpdatedMock.title)
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (update list order)", async () => {
    (db.list.update as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );
    await expect(
      listService.updateListOrder([listUpdatedOrderMock], "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (delete list)", async () => {
    (db.list.delete as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(listService.deleteList(listMock.id)).rejects.toThrow(
      "Unexpected error"
    );
  });
});
