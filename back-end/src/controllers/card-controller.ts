import { getAuth } from "@clerk/express";
import { CardService } from "../services/card-service";
import { Request, Response } from "express";

export class CardController {
  constructor(private cardService: CardService) {}

  async createCard(req: Request, res: Response): Promise<any> {
    const { title, listId } = req.body;
    const { orgId } = getAuth(req);
    try {
      await this.cardService.createCard(title, listId, orgId as string);
      return res.status(201).send({
        message: "Card has been created",
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

  async createCardDescription(req: Request, res: Response): Promise<any> {
    const { id } = req.params as { id: string };
    const { description } = req.body as { description: string };
    const { orgId } = getAuth(req);
    try {
      await this.cardService.createCardDescription(
        id,
        description,
        orgId as string
      );
      return res.status(201).send({
        message: "Card description has been created",
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

  async getCardById(req: Request, res: Response): Promise<any> {
    const { id } = req.params as { id: string };
    const { orgId } = getAuth(req);
    try {
      const card = await this.cardService.getCardById(id, orgId as string);
      return res.status(200).send(card);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.message,
        });
      }
      return res.status(500).send({ error: "Unexpected error" });
    }
  }

  async updateCardOrder(req: Request, res: Response): Promise<any> {
    const { items } = req.body as {
      items: { id: string; order: number; listId: string }[];
    };
    const { orgId } = getAuth(req);

    try {
      if (!orgId) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      await this.cardService.updateCardOrder(items, orgId as string);

      return res.status(200).send({
        message: "Your card has been reordered",
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

  async updateCardTitle(req: Request, res: Response): Promise<any> {
    const { id } = req.params as { id: string };
    const { title } = req.body as { title: string };
    const { orgId } = getAuth(req);
    try {
      await this.cardService.updateCardTitle(id, title, orgId as string);
      return res.status(200).send({
        message: "Your card title has been updated",
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

  async deleteCard(req: Request, res: Response): Promise<any> {
    const { id } = req.params as { id: string };
    const { orgId } = getAuth(req);
    try {
      await this.cardService.deleteCard(id, orgId as string);
      return res.status(200).send({
        message: "Card has been deleted",
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
