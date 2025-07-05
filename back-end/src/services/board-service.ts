import db from "../db";

export class BoardService {
  async createBoard(title: string, color: string, orgId: string) {
    try {
      if (!orgId) throw new Error("Organization Id is required");

      const board = await db.board.create({
        data: {
          title,
          color,
          orgId,
        },
      });

      return board;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async getBoards(orgId: string) {
    if (!orgId) throw new Error("Organization Id is required");

    try {
      const boards = await db.board.findMany({
        where: {
          orgId,
        },
      });

      return boards;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async deleteBoard(id: string) {
    try {
      await db.board.delete({
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
