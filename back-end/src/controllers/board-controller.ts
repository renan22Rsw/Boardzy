import { clerkClient, getAuth } from "@clerk/express";
import { BoardService } from "../services/board-service";
import { Request, Response } from "express";
import { AuditLogService } from "../services/audit-log-service";
import { ACTION, ENTITY_TYPE } from "../generated/prisma";

export class BoardController {
  constructor(
    private boardServices: BoardService,
    private auditLogService: AuditLogService
  ) {}

  async createBoard(req: Request, res: Response): Promise<any> {
    try {
      const { orgId, userId } = getAuth(req);

      const { title, color } = req.body as {
        title: string;
        color: string;
      };

      const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
        userId as string
      );

      const board = await this.boardServices.createBoard(
        title,
        color,
        orgId as string
      );

      await this.auditLogService.createAuditLog(
        {
          entityId: board.id,
          entityTitle: title,
          entityType: ENTITY_TYPE.BOARD,
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
        message: `The board ${title} has been created`,
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

  async getBoardById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params as { id: string };

      const board = await this.boardServices.getBoardById(id as string);

      return res.status(200).send(board);
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
      const { orgId, userId } = getAuth(req);

      const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
        userId as string
      );
      await this.boardServices.updateBoardTitle(id, title);

      await this.auditLogService.createAuditLog(
        {
          entityId: id,
          entityTitle: title,
          entityType: ENTITY_TYPE.BOARD,
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
        message: `The title of your board ${title} has been updated`,
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
      const { id } = req.params as { id: string; title: string };
      const { title } = req.body as { title: string };
      const { orgId, userId } = getAuth(req);

      const { firstName, lastName, imageUrl } = await clerkClient.users.getUser(
        userId as string
      );

      await this.boardServices.deleteBoard(id);

      await this.auditLogService.createAuditLog(
        {
          entityId: id,
          entityTitle: title,
          entityType: ENTITY_TYPE.BOARD,
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

      return res.send({
        message: `The board ${title} has been deleted`,
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
