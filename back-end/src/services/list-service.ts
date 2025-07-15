import db from "../db";

export class ListService {
  async createList(title: string, boardId: string, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization Id is required");
      }

      const lasList = await db.list.findFirst({
        where: {
          boardId,
        },
        orderBy: {
          order: "desc",
        },
        select: {
          order: true,
        },
      });

      const newOrder = lasList ? lasList.order + 1 : 1;

      const list = await db.list.create({
        data: {
          title,
          boardId,
          order: newOrder,
        },
      });

      return list;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async getLists(boardId: string, orgId: string) {
    try {
      const lists = await db.list.findMany({
        where: {
          boardId,
          board: {
            orgId,
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

      return lists;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async updateListTitle(id: string, title: string) {
    try {
      await db.list.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async deleteList(id: string) {
    try {
      await db.list.delete({
        where: {
          id,
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
