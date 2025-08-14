import { ListService } from "../../../services/list-service";
import db from "../../../db/index";
import { listMock } from "./mock";

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
      listService.createList(listMock.title, listMock.boardId, "")
    ).rejects.toThrow("Organization id is required");

    expect(db.list.create).not.toHaveBeenCalled();
    expect(db.list.findFirst).not.toHaveBeenCalled();
  });

  it("should create a list", async () => {
    (db.list.create as jest.Mock).mockResolvedValue(listMock);

    const list = await listService.createList(
      listMock.title,
      listMock.boardId,
      "orgId_test"
    );

    expect(list).toEqual(listMock);

    expect(db.list.create).toHaveBeenCalledWith({
      data: {
        title: "List 1",
        boardId: "boardId_test",
        order: 1,
      },
    });
  });
});
