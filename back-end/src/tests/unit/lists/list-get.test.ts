import { ListService } from "../../../services/list-service";
import db from "../../../db/index";

jest.mock("../../../db/index", () => ({
  list: {
    findMany: jest.fn(),
  },
}));

describe("List service get action", () => {
  let listService: ListService;
  beforeEach(() => {
    listService = new ListService();
    jest.clearAllMocks();
  });

  it("should not get lists if organization id has not been provided", async () => {
    await expect(listService.getLists("", "")).rejects.toThrow(
      "Organization id is required"
    );

    expect(db.list.findMany).not.toHaveBeenCalled();
  });

  it("should get all lists", async () => {
    (db.list.findMany as jest.Mock).mockResolvedValue([
      {
        id: "1",
        title: "List 1",
        boardId: "1",
        order: 1,
      },
    ]);

    const lists = await listService.getLists("1", "1");

    expect(lists).toEqual([
      {
        id: "1",
        title: "List 1",
        boardId: "1",
        order: 1,
      },
    ]);

    expect(db.list.findMany).toHaveBeenCalledWith({
      where: {
        boardId: "1",
        board: {
          orgId: "1",
        },
      },
      include: {
        card: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });
  });

  it("should throw an error if prisma fails", async () => {
    (db.list.findMany as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    await expect(listService.getLists("1", "1")).rejects.toThrow(
      "Unexpected error"
    );
  });
});
