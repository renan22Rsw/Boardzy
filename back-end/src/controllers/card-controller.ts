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
}
