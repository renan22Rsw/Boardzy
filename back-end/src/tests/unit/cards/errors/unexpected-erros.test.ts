import { CardService } from "../../../../services/card-service";
import db from "../../../../db/index";
import {
  cardMock,
  cardDescriptionMock,
  cardUpdatedMock,
  cardUpdatedOrderMock,
} from "../mock";

jest.mock("../../../../db/index", () => ({
  card: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  list: {
    findUnique: jest.fn(),
  },
  $transaction: jest.fn(async (promises) => Promise.all(promises)),
}));

describe("Card service erros", () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
    jest.clearAllMocks();
  });

  it("should throw unexpected error if error is not instance of Error (create card)", async () => {
    (db.list.findUnique as jest.Mock).mockRejectedValue("Unexpected error");
    (db.card.create as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      cardService.createCard(cardMock.title, cardMock.listId, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if error is not instance of Error (create card description)", async () => {
    (db.card.update as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      cardService.createCardDescription(
        cardDescriptionMock.id,
        cardDescriptionMock.description,
        "orgId_test"
      )
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if error is not instance of Error (get card by id)", async () => {
    (db.card.findUnique as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      cardService.getCardById(cardMock.listId, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if error is not instance of Error (update card title)", async () => {
    (db.card.update as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      cardService.updateCardTitle(
        cardUpdatedMock.id,
        cardUpdatedMock.title,
        "orgId_test"
      )
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if error is not instance of Error (update card order)", async () => {
    (db.card.update as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      cardService.updateCardOrder([cardUpdatedOrderMock], "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });

  it("should throw unexpected error if error is not instance of Error (delete card)", async () => {
    (db.card.delete as jest.Mock).mockRejectedValue("Unexpected error");

    await expect(
      cardService.deleteCard(cardMock.id, "orgId_test")
    ).rejects.toThrow("Unexpected error");
  });
});
