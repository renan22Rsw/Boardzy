import { getAuth } from "@clerk/express";
import { BoardService } from "../services/board-service";
import { Request, Response } from "express";

export class BoardController {
  constructor(private boardServices: BoardService) {}

  async createBoard(req: Request, res: Response): Promise<any> {
    try {
      const { orgId } = getAuth(req);
      const { title, color } = req.body as { title: string; color: string };

      await this.boardServices.createBoard(title, color, orgId as string);

      return res.status(201).send({
        message: "Board created successfully",
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.message,
        });
      }
      return res.status(500).send({ error: "Unexpected error" });
    }
  }

  async getBoards(req: Request, res: Response): Promise<any> {
    try {
      const { orgId } = getAuth(req);

      const boards = await this.boardServices.getBoards(orgId as string);

      return res.status(200).send(boards);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.message,
        });
      }
      return res.status(500).send({ error: "Unexpected error" });
    }
  }

  async updateBoardTitle(req: Request, res: Response): Promise<any> {
    try {
      const { title } = req.body as { title: string };
      const { id } = req.params as { id: string };
      await this.boardServices.updateBoardTitle(id, title);

      return res.send({
        message: "Your board title has been updated",
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.message,
        });
      }
      return res.status(500).send({ error: "Unexpected error" });
    }
  }

  async deleteBoard(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      await this.boardServices.deleteBoard(id);

      return res.send({
        message: "Board deleted successfully",
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.message,
        });
      }
      return res.status(500).send({ error: "Unexpected error" });
    }
  }
}
