import { ListService } from "../../../services/list-service";
import db from "../../../db/index";
import { listMock } from "../mock";

jest.mock("../../../db/index", () => ({
  list: {
    delete: jest.fn(),
  },
}));

describe("List service delete action", () => {
  let listService: ListService;
  beforeEach(() => {
    listService = new ListService();
    jest.clearAllMocks();
  });

  it("should not delete list if list id has not been provided", async () => {
    await expect(listService.deleteList("")).rejects.toThrow(
      "List id is required"
    );

    expect(db.list.delete).not.toHaveBeenCalled();
  });

  it("should delete list", async () => {
    (db.list.delete as jest.Mock).mockResolvedValue(null);

    await listService.deleteList(listMock.id);

    expect(db.list.delete).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });
  });
});
