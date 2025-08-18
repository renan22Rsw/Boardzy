import { ListService } from "../../../services/list-service";
import db from "../../../db/index";
import { listMock } from "../mock";

jest.mock("../../../db/index", () => ({
  list: {
    update: jest.fn(),
  },
  $transaction: jest.fn(async (promises) => Promise.all(promises)),
}));

describe("List service update actions", () => {
  let listService: ListService;
  beforeEach(() => {
    listService = new ListService();
    jest.clearAllMocks();
  });

  describe("Update list title action", () => {
    const listUpdatedTitleMock = {
      ...listMock,
      title: "List 1 updated",
    };

    it("should not update list title if list id has not been provided", async () => {
      await expect(
        listService.updateListTitle("", listUpdatedTitleMock.title)
      ).rejects.toThrow("List id is required");

      expect(db.list.update).not.toHaveBeenCalled();
    });

    it("should update list title", async () => {
      (db.list.update as jest.Mock).mockResolvedValue(listUpdatedTitleMock);

      const list = await listService.updateListTitle(
        listMock.id,
        "List 1 updated"
      );

      expect(list).toEqual(listUpdatedTitleMock);

      expect(db.list.update).toHaveBeenCalledWith({
        where: {
          id: "1",
        },
        data: {
          title: "List 1 updated",
        },
      });
    });
  });

  describe("Update list order action", () => {
    const listUpdatedOrderMock = {
      ...listMock,
      order: 2,
    };

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
});
