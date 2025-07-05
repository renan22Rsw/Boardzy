import express from "express";
import { requireAuth } from "@clerk/express";
import { BoardService } from "../services/board-service";
import { BoardController } from "../controllers/board-controller";

export const router = express.Router();

const boardService = new BoardService();
const boardController = new BoardController(boardService);

router.use(requireAuth());

router.post("/boards", (req, res) => boardController.createBoard(req, res));

router.get("/boards", (req, res) => boardController.getBoards(req, res));

router.patch("/boards/:id", (req, res) =>
  boardController.updateBoardTitle(req, res)
);

router.delete("/boards/:id", (req, res) => {
  boardController.deleteBoard(req, res);
});
