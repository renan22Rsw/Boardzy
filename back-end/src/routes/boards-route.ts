import express from "express";
import { requireAuth } from "@clerk/express";
import { BoardService } from "../services/board-service";
import { BoardController } from "../controllers/board-controller";
import { AuditLogService } from "../services/audit-log-service";

export const router = express.Router();

const boardService = new BoardService();
const auditLogService = new AuditLogService();
const boardController = new BoardController(boardService, auditLogService);

router.use(requireAuth());

router.post("/boards", (req, res) => boardController.createBoard(req, res));

router.get("/boards", (req, res) => boardController.getBoards(req, res));

router.get("/boards/:id", (req, res) => boardController.getBoardById(req, res));

router.patch("/boards/:id", (req, res) =>
  boardController.updateBoardTitle(req, res)
);

router.delete("/boards/:id", (req, res) => {
  boardController.deleteBoard(req, res);
});
