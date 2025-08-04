import express from "express";

import { BoardService } from "../services/board-service";
import { BoardController } from "../controllers/board-controller";
import { AuditLogService } from "../services/audit-log-service";

export const boardRouter = express.Router();

const boardService = new BoardService();
const auditLogService = new AuditLogService();
const boardController = new BoardController(boardService, auditLogService);

boardRouter.post("/boards", (req, res) =>
  boardController.createBoard(req, res)
);

boardRouter.get("/boards", (req, res) => boardController.getBoards(req, res));

boardRouter.get("/boards/:id", (req, res) =>
  boardController.getBoardById(req, res)
);

boardRouter.patch("/boards/:id", (req, res) =>
  boardController.updateBoardTitle(req, res)
);

boardRouter.delete("/boards/:id", (req, res) => {
  boardController.deleteBoard(req, res);
});
