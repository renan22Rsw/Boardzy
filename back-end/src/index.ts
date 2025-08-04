import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";
import { requireAuth } from "@clerk/express";

import { boardRouter } from "./routes/boards-route";
import { listRouter } from "./routes/lists-route";
import { cardRouter } from "./routes/cards-route";
import { auditLogRouter } from "./routes/audit-log-route";
import { orgIdMiddleware } from "./middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(clerkMiddleware());
app.use(requireAuth());
app.use(orgIdMiddleware);

app.use("/api", boardRouter);
app.use("/api", listRouter);
app.use("/api", cardRouter);
app.use("/api", auditLogRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
