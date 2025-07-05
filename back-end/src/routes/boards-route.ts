import express from "express";
import { requireAuth } from "@clerk/express";
import { BoardService } from "../services/board-service";
import { BoardController } from "../controllers/board-controller";

export const router = express.Router();

const boardService = new BoardService();
const boardController = new BoardController(boardService);

router.post("/boards", requireAuth(), (req, res) =>
  boardController.createBoard(req, res)
);

router.get("/boards", requireAuth(), (req, res) =>
  boardController.getBoards(req, res)
);

router.delete("/boards/:id", requireAuth(), (req, res) => {
  boardController.deleteBoard(req, res);
});
