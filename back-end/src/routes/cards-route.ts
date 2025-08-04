import express from "express";

import { CardService } from "../services/card-service";
import { CardController } from "../controllers/card-controller";
import { AuditLogService } from "../services/audit-log-service";

export const cardRouter = express.Router();

const cardService = new CardService();
const auditLogService = new AuditLogService();
const cardController = new CardController(cardService, auditLogService);

cardRouter.post("/cards", (req, res) => cardController.createCard(req, res));

cardRouter.post("/cards/:id/description", (req, res) =>
  cardController.createCardDescription(req, res)
);

cardRouter.get("/cards/:id", (req, res) =>
  cardController.getCardById(req, res)
);

cardRouter.get("/cards/:id/logs", (req, res) =>
  cardController.getCardsAuditLogs(req, res)
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
