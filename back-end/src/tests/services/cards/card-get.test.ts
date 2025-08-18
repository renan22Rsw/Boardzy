import { CardService } from "../../../services/card-service";
import db from "../../../db/index";
import { cardMock } from "../mock";

jest.mock("../../../db/index", () => ({
  card: {
    findUnique: jest.fn(),
  },
}));

describe("Card service get action", () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
    jest.clearAllMocks();
  });

  it("should not get a card if organization id has not been provided", async () => {
    await expect(cardService.getCardById("listId_test", "")).rejects.toThrow(
      "Organization id is required"
    );

    expect(db.card.findUnique).not.toHaveBeenCalled();
  });

  it("should get card by id", async () => {
    (db.card.findUnique as jest.Mock).mockResolvedValue(cardMock);

    const card = await cardService.getCardById(cardMock.listId, "orgId_test");

    expect(card).toEqual(cardMock);

    expect(db.card.findUnique).toHaveBeenCalledWith({
      where: {
        id: "listId_test",
        list: {
          board: {
            orgId: "orgId_test",
          },
        },
      },
    });
  });
});
