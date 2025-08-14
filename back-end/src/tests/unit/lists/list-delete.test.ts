import { ListService } from "../../../services/list-service";
import db from "../../../db/index";

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

    await listService.deleteList("1");

    expect(db.list.delete).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });
  });

  it("should throw an error if prisma fails", async () => {
    (db.list.delete as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(listService.deleteList("1")).rejects.toThrow(
      "Unexpected error"
    );
  });
});
