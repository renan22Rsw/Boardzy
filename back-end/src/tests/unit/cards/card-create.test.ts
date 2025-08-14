import { CardService } from "../../../services/card-service";
import db from "../../../db/index";
import { mockList, cardMock, cardDescriptionMock } from "./mock";

jest.mock("../../../db/index", () => ({
  card: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  list: {
    findUnique: jest.fn(),
  },
}));

describe("Card service create action", () => {
  let cardService: CardService;
  beforeEach(() => {
    cardService = new CardService();
    jest.clearAllMocks();
  });

  it("should not create a card if organization id has not been provided", async () => {
    await expect(
      cardService.createCard(cardMock.title, cardMock.listId, "")
    ).rejects.toThrow("Organization id is required");

    expect(db.card.create).not.toHaveBeenCalled();
    expect(db.card.findFirst).not.toHaveBeenCalled();
  });

  it("should not create a card if there is no list", async () => {
    (db.list.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      cardService.createCard(cardMock.title, cardMock.listId, "orgId_test")
    ).rejects.toThrow("List not found");

    expect(db.card.create).not.toHaveBeenCalled();
    expect(db.card.findFirst).not.toHaveBeenCalled();
  });

  it("should create a card", async () => {
    (db.list.findUnique as jest.Mock).mockResolvedValue(mockList);

    (db.card.findFirst as jest.Mock).mockResolvedValue(null);

    (db.card.create as jest.Mock).mockResolvedValue(cardMock);

    const card = await cardService.createCard(
      cardMock.title,
      cardMock.listId,
      "orgId_test"
    );

    expect(card).toEqual(cardMock);

    expect(db.card.create).toHaveBeenCalledWith({
      data: {
        title: "Card 1",
        listId: "listId_test",
        order: 1,
      },
    });
  });

  it("should not create a card description", async () => {
    await expect(
      cardService.createCardDescription("", "description_test", "")
    ).rejects.toThrow("Organization id is required");

    expect(db.card.update).not.toHaveBeenCalled();
  });

  it("should create a card description", async () => {
    (db.card.update as jest.Mock).mockResolvedValue(cardDescriptionMock);

    const cardDescription = await cardService.createCardDescription(
      cardDescriptionMock.id,
      cardDescriptionMock.description,
      "orgId_test"
    );

    expect(cardDescription).toEqual(cardDescription);

    expect(db.card.update).toHaveBeenCalledWith({
      where: {
        id: "1",
        list: {
          board: {
            orgId: "orgId_test",
          },
        },
      },
      data: {
        description: "Description 1",
      },
    });
  });
});
