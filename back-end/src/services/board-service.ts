import db from "../db";

export class BoardService {
  async createBoard(title: string, color: string, orgId: string) {
    try {
      if (!orgId) throw new Error("Organization id is required");

      const boardLength = await db.board.count({
        where: {
          orgId,
        },
      });

      if (boardLength >= 5) {
        throw new Error("You have reached the maximum number of boards");
      }

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
    if (!orgId) throw new Error("Organization id is required");

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

  async getBoardById(id: string) {
    try {
      const board = await db.board.findUnique({
        where: {
          id,
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

  async updateBoardTitle(id: string, title: string) {
    if (!id) throw new Error("Board id is required");

    try {
      const updatedTitle = await db.board.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });

      return updatedTitle;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async deleteBoard(id: string) {
    if (!id) throw new Error("Board id is required");
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
