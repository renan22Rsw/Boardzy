import express from "express";
import { CardService } from "../services/card-service";
import { CardController } from "../controllers/card-controller";
import { requireAuth } from "@clerk/express";

export const cardRouter = express.Router();

const cardService = new CardService();
const cardController = new CardController(cardService);

cardRouter.use(requireAuth());

cardRouter.post("/cards", (req, res) => cardController.createCard(req, res));

cardRouter.patch("/cards", (req, res) =>
  cardController.updateCardOrder(req, res)
);
