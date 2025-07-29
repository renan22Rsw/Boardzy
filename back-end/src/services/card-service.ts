import db from "../db";
import { Props } from "./audit-log-service";

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

  async createCardDescription(id: string, description: string, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization Id is required");
      }

      const card = await db.card.update({
        where: {
          id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          description,
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

  async getCardById(listId: string, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization Id is required");
      }

      const card = await db.card.findUnique({
        where: {
          id: listId,
          list: {
            board: {
              orgId,
            },
          },
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

  async updateCardOrder(
    items: { id: string; order: number; listId?: string }[],
    orgId: string
  ) {
    try {
      let cards;

      const transaction = items.map((card) =>
        db.card.update({
          where: {
            id: card.id,
            list: {
              board: {
                orgId,
              },
            },
          },
          data: {
            order: card.order,
            listId: card.listId,
          },
        })
      );
      cards = await db.$transaction(transaction);
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async updateCardTitle(id: string, title: string, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization Id is required");
      }

      const card = await db.card.update({
        where: {
          id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          title,
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

  async deleteCard(id: string, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization Id is required");
      }

      await db.card.delete({
        where: {
          id,
          list: {
            board: {
              orgId,
            },
          },
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }
}
