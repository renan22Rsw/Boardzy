import express from "express";
import { CardService } from "../services/card-service";
import { CardController } from "../controllers/card-controller";
import { requireAuth } from "@clerk/express";

export const cardRouter = express.Router();

const cardService = new CardService();
const cardController = new CardController(cardService);

cardRouter.use(requireAuth());

cardRouter.post("/cards", (req, res) => cardController.createCard(req, res));

cardRouter.post("/cards/:id/description", (req, res) =>
  cardController.createCardDescription(req, res)
);

cardRouter.get("/cards/:id", (req, res) =>
  cardController.getCardById(req, res)
);

cardRouter.patch("/cards", (req, res) =>
  cardController.updateCardOrder(req, res)
);

cardRouter.patch("/cards/:id", (req, res) =>
  cardController.updateCardTitle(req, res)
);

cardRouter.delete("/cards/:id", (req, res) =>
  cardController.deleteCard(req, res)
);
