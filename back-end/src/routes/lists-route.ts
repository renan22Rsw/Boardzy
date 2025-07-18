import { getAuth, requireAuth } from "@clerk/express";
import express from "express";
import { ListService } from "../services/list-service";
import { ListController } from "../controllers/list-controller";

export const listRouter = express.Router();

const listService = new ListService();
const listController = new ListController(listService);

listRouter.use(requireAuth());

listRouter.post("/lists", (req, res) => listController.createList(req, res));

listRouter.get("/lists/:boardId", (req, res) =>
  listController.getList(req, res)
);

listRouter.patch("/lists/:id", (req, res) =>
  listController.updateListTitle(req, res)
);

listRouter.patch("/lists", (req, res) =>
  listController.updateListOrder(req, res)
);

listRouter.delete("/lists/:id", (req, res) =>
  listController.deleteList(req, res)
);
