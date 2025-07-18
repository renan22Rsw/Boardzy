import { getAuth } from "@clerk/express";
import { ListService } from "../services/list-service";
import { Request, Response } from "express";

export class ListController {
  constructor(private listService: ListService) {}

  async createList(req: Request, res: Response): Promise<any> {
    const { title, boardId } = req.body as { title: string; boardId: string };
    const { orgId } = getAuth(req);

    try {
      await this.listService.createList(title, boardId, orgId as string);

      return res.status(201).send({
        message: "A list has been created",
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

  async getList(req: Request, res: Response): Promise<any> {
    const { boardId } = req.params as { boardId: string };
    const { orgId } = getAuth(req);

    try {
      const lists = await this.listService.getLists(boardId, orgId as string);

      return res.status(200).send(lists);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.message,
        });
      }
      return res.status(500).send({ error: "Unexpected error" });
    }
  }

  async updateListTitle(req: Request, res: Response): Promise<any> {
    const { id } = req.params as { id: string };
    const { title } = req.body as { title: string };

    try {
      await this.listService.updateListTitle(id, title);

      return res.send({
        message: "Your list title has been updated",
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

  async updateListOrder(req: Request, res: Response): Promise<any> {
    const { items } = req.body as { items: { id: string; order: number }[] };
    const { orgId } = getAuth(req);

    try {
      if (!orgId) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      await this.listService.updateListOrder(items, orgId as string);

      return res.status(200).send({
        message: "Your list order has been updated",
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

  async deleteList(req: Request, res: Response): Promise<any> {
    const { id } = req.params as { id: string };

    try {
      await this.listService.deleteList(id);

      return res.status(200).send({
        message: "List deleted successfully",
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
