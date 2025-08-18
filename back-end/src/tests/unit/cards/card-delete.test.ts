import { CardService } from "../../../services/card-service";
import db from "../../../db/index";
import { cardMock } from "./mock";

jest.mock("../../../db/index", () => ({
  card: {
    delete: jest.fn(),
  },
}));

describe("Card service delete action", () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
    jest.clearAllMocks();
  });

  it("should not delete card if organization id has not been provided", async () => {
    await expect(cardService.deleteCard("1", "")).rejects.toThrow(
      "Organization id is required"
    );

    expect(db.card.delete).not.toHaveBeenCalled();
  });

  it("should delete card", async () => {
    (db.card.delete as jest.Mock).mockResolvedValue(cardMock);

    await cardService.deleteCard("1", "orgId_test");

    expect(db.card.delete).toHaveBeenCalledWith({
      where: {
        id: "1",
        list: {
          board: {
            orgId: "orgId_test",
          },
        },
      },
    });
  });
});
