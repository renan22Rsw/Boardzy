import { ListService } from "../../../services/list-service";
import db from "../../../db/index";

jest.mock("../../../db/index", () => ({
  list: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
}));

describe("List service create action", () => {
  let listService: ListService;
  beforeAll(() => {
    listService = new ListService();
    jest.clearAllMocks();
  });

  it("should not create a list if organization id has not been provided", async () => {
    await expect(
      listService.createList("List 1", "boardId_test", "")
    ).rejects.toThrow("Organization id is required");

    expect(db.list.create).not.toHaveBeenCalled();
    expect(db.list.findFirst).not.toHaveBeenCalled();
  });

  it("should create a list", async () => {
    (db.list.create as jest.Mock).mockResolvedValue({
      id: "1",
      title: "List 1",
      boardId: "boardId_test",
      order: 1,
    });
    const list = await listService.createList(
      "List 1",
      "boardId_test",
      "orgId_test"
    );

    expect(list).toEqual({
      id: "1",
      title: "List 1",
      boardId: "boardId_test",
      order: 1,
    });

    expect(db.list.create).toHaveBeenCalledWith({
      data: {
        title: "List 1",
        boardId: "boardId_test",
        order: 1,
      },
    });
  });

  it("should throw an error if prisma fails", async () => {
    (db.list.create as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(
      listService.createList("List 1", "1", "boardId_test")
    ).rejects.toThrow("Unexpected error");
  });
});
