import { clerkClient, getAuth } from "@clerk/express";
import { CardService } from "../services/card-service";
import { Request, Response } from "express";
import { AuditLogService } from "../services/audit-log-service";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export class CardController {
  constructor(
    private cardService: CardService,
    private auditLogService: AuditLogService
  ) {}

  async createCard(req: Request, res: Response): Promise<any> {
    const { title, listId } = req.body;
    const { orgId, userId } = getAuth(req);

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userId as string
    );
    try {
      await this.cardService.createCard(title, listId, orgId as string);

      await this.auditLogService.createAuditLog(
        {
          entityId: listId,
          entityTitle: title,
          entityType: ENTITY_TYPE.CARD,
          action: ACTION.CREATE,
          user: {
            id: userId as string,
            firstName: firstName as string,
            lastName: lastName as string,
            image: imageUrl as string,
          },
        },
        orgId as string
      );

      return res.status(201).send({
        message: `The card ${title} has been created`,
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
    const { title } = req.body as { title: string };
    const { description } = req.body as { description: string };
    const { orgId, userId } = getAuth(req);

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userId as string
    );
    try {
      await this.cardService.createCardDescription(
        id,
        description,
        orgId as string
      );

      await this.auditLogService.createAuditLog(
        {
          entityId: id,
          entityTitle: description,
          entityType: ENTITY_TYPE.CARD,
          action: ACTION.UPDATE,
          user: {
            id: userId as string,
            firstName: firstName as string,
            lastName: lastName as string,
            image: imageUrl as string,
          },
        },
        orgId as string
      );

      return res.status(201).send({
        message: `The description of your card ${title} has been created`,
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

  async getCardsAuditLogs(req: Request, res: Response): Promise<any> {
    const { id } = req.params as { id: string };
    const { orgId } = getAuth(req);
    try {
      const logs = await this.auditLogService.getCardAuditLogs(
        {
          entityId: id,
          entityType: ENTITY_TYPE.CARD,
        },
        orgId as string
      );
      return res.status(200).send(logs);
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

    const { orgId, userId } = getAuth(req);

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userId as string
    );
    try {
      await this.cardService.updateCardTitle(id, title, orgId as string);

      await this.auditLogService.createAuditLog(
        {
          entityId: id,
          entityTitle: title,
          entityType: ENTITY_TYPE.CARD,
          action: ACTION.UPDATE,
          user: {
            id: userId as string,
            firstName: firstName as string,
            lastName: lastName as string,
            image: imageUrl as string,
          },
        },

        orgId as string
      );

      return res.status(200).send({
        message: `The title of your card ${title} has been updated`,
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
    const { title } = req.body as { title: string };
    const { orgId, userId } = getAuth(req);

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userId as string
    );
    try {
      await this.cardService.deleteCard(id, orgId as string);

      await this.auditLogService.createAuditLog(
        {
          entityId: id,
          entityTitle: title,
          entityType: ENTITY_TYPE.CARD,
          action: ACTION.DELETE,
          user: {
            id: userId as string,
            firstName: firstName as string,
            lastName: lastName as string,
            image: imageUrl as string,
          },
        },

        orgId as string
      );

      return res.status(200).send({
        message: `The card ${title} has been deleted`,
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
