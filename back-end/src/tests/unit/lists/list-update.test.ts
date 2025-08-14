import { ListService } from "../../../services/list-service";
import db from "../../../db/index";
import { listUpdatedMock, listUpdatedOrderMock } from "./mock";

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
      listService.updateListTitle("", listUpdatedMock.title)
    ).rejects.toThrow("List id is required");

    expect(db.list.update).not.toHaveBeenCalled();
  });

  it("should update list title", async () => {
    (db.list.update as jest.Mock).mockResolvedValue(listUpdatedMock);

    const list = await listService.updateListTitle(
      listUpdatedMock.id,
      listUpdatedMock.title
    );

    expect(list).toEqual(listUpdatedMock);

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
    await expect(
      listService.updateListOrder([listUpdatedOrderMock], "")
    ).rejects.toThrow("Organization id is required");

    expect(db.list.update).not.toHaveBeenCalled();
  });

  it("should update list order", async () => {
    (db.list.update as jest.Mock).mockResolvedValue(listUpdatedOrderMock);

    const lists = await listService.updateListOrder(
      [listUpdatedOrderMock],
      "orgId_test"
    );
    expect(lists).toEqual([listUpdatedOrderMock]);

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
});
