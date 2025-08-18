import { clerkClient, getAuth } from "@clerk/express";
import { ListService } from "../services/list-service";
import { Request, Response } from "express";
import { AuditLogService } from "../services/audit-log-service";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export class ListController {
  constructor(
    private listService: ListService,
    private auditLogService: AuditLogService
  ) {}

  async createList(req: Request, res: Response): Promise<any> {
    const { title, boardId } = req.body as {
      title: string;
      boardId: string;
    };
    const { orgId, userId } = getAuth(req);

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userId as string
    );

    try {
      await this.listService.createList(title, boardId, orgId as string);

      await this.auditLogService.createAuditLog(
        {
          entityId: boardId,
          entityTitle: title,
          entityType: ENTITY_TYPE.LIST,
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
        message: `The list ${title} has been created`,
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
    const { orgId, userId } = getAuth(req);

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userId as string
    );

    try {
      await this.listService.updateListTitle(id, title);

      await this.auditLogService.createAuditLog(
        {
          entityId: id,
          entityTitle: title,
          entityType: ENTITY_TYPE.LIST,
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

      return res.send({
        message: `The title of your list ${title} has been updated`,
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
    const { title } = req.body as { title: string };
    const { orgId, userId } = getAuth(req);

    const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
      userId as string
    );

    try {
      await this.listService.deleteList(id);

      await this.auditLogService.createAuditLog(
        {
          entityId: id,
          entityTitle: title,
          entityType: ENTITY_TYPE.LIST,
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
        message: `The list ${title} has been deleted`,
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
