import db from "../db";

/**
 * Service for manipulating cards
 */
export class CardService {
  async createCard(title: string, listId: string, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization Id is required");
      }

      const list = await db.list.findUnique({
        where: {
          id: listId,
          board: {
            orgId,
          },
        },
        include: { board: true },
      });

      if (!list) {
        throw new Error("List not found");
      }

      const lastCard = await db.card.findFirst({
        where: {
          listId,
        },
        orderBy: {
          order: "desc",
        },
        select: {
          order: true,
        },
      });

      const newOrder = lastCard ? lastCard.order + 1 : 1;

      const card = await db.card.create({
        data: {
          title,
          listId,
          order: newOrder,
        },
      });

      return card;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }
}
