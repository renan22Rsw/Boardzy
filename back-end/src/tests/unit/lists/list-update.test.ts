import { ListService } from "../../../services/list-service";
import db from "../../../db/index";

jest.mock("../../../db/index", () => ({
  list: {
    update: jest.fn(),
  },
  $transaction: jest.fn(async (promises) => Promise.all(promises)),
}));

describe("List service update action", () => {
  let listService: ListService;
  beforeEach(() => {
    listService = new ListService();
    jest.clearAllMocks();
  });

  it("should not update list title if list id has not been provided", async () => {
    await expect(
      listService.updateListTitle("", "List 1 updated")
    ).rejects.toThrow("List id is required");

    expect(db.list.update).not.toHaveBeenCalled();
  });

  it("should update list title", async () => {
    (db.list.update as jest.Mock).mockResolvedValue({
      id: "1",
      title: "List 1 updated",
      boardId: "boardId_test",
      order: 1,
    });

    const list = await listService.updateListTitle("1", "List 1 updated");

    expect(list).toEqual({
      id: "1",
      title: "List 1 updated",
      boardId: "boardId_test",
      order: 1,
    });

    expect(db.list.update).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
      data: {
        title: "List 1 updated",
      },
    });
  });

  it("should not update list order if organization id has not been provided", async () => {
    await expect(listService.updateListOrder([], "")).rejects.toThrow(
      "Organization id is required"
    );

    expect(db.list.update).not.toHaveBeenCalled();
  });

  it("should update list order", async () => {
    (db.list.update as jest.Mock).mockResolvedValue({
      id: "1",
      title: "List 1 ",
      boardId: "boardId_test",
      order: 2,
    });

    const lists = await listService.updateListOrder(
      [{ id: "1", order: 2 }],
      "orgId_test"
    );
    expect(lists).toEqual([
      {
        id: "1",
        title: "List 1 ",
        boardId: "boardId_test",
        order: 2,
      },
    ]);

    expect(db.list.update).toHaveBeenCalledWith({
      where: {
        id: "1",
        board: {
          orgId: "orgId_test",
        },
      },
      data: {
        order: 2,
      },
    });
  });

  it("should throw an error if prisma fails", async () => {
    (db.list.update as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );
    await expect(
      listService.updateListTitle("1", "List 1 updated")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw an error if prisma fails (update list order)", async () => {
    (db.list.update as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );
    await expect(
      listService.updateListOrder([{ id: "1", order: 2 }], "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });
});
