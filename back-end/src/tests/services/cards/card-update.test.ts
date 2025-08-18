import { CardService } from "../../../services/card-service";
import db from "../../../db/index";
import { cardMock } from "../mock";

jest.mock("../../../db/index", () => ({
  card: {
    update: jest.fn(),
  },
  $transaction: jest.fn(async (promises) => Promise.all(promises)),
}));

describe("Card service update actions", () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
    jest.clearAllMocks();
  });

  describe("Update card title action", () => {
    const cardUpdatedTitleMock = {
      ...cardMock,
      title: "Card 1 updated",
    };

    it("should not update a card title if organization id has not been provided", async () => {
      await expect(
        cardService.updateCardTitle("1", "Card 1 updated", "")
      ).rejects.toThrow("Organization id is required");

      expect(db.card.update).not.toHaveBeenCalled();
    });

    it("it should update card title action", async () => {
      (db.card.update as jest.Mock).mockResolvedValue(cardUpdatedTitleMock);

      const card = await cardService.updateCardTitle(
        cardMock.id,
        "Card 1 updated",
        "orgId_test"
      );

      expect(card).toEqual(cardUpdatedTitleMock);

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
          title: "Card 1 updated",
        },
      });
    });
  });

  describe("Update card order action", () => {
    const cardUpdatedOrderMock = {
      ...cardMock,
      order: 2,
      listId: "listId_test",
    };
    it("should not update card order if organization id has not been provided", async () => {
      await expect(cardService.updateCardOrder([], "")).rejects.toThrow(
        "Organization id is required"
      );

      expect(db.card.update).not.toHaveBeenCalled();
    });

    it("should update card order", async () => {
      (db.card.update as jest.Mock).mockResolvedValue(cardUpdatedOrderMock);

      const card = await cardService.updateCardOrder(
        [cardUpdatedOrderMock],
        "orgId_test"
      );

      expect(card).toEqual([cardUpdatedOrderMock]);

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
          order: 2,
          listId: "listId_test",
        },
      });
    });
  });
});
