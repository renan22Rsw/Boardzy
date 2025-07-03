import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import express from "express";
import { Request, Response } from "express";

export const router = express.Router();

router.get(
  "/boards",
  requireAuth(),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId } = getAuth(req);

      const user = await clerkClient.users.getUser(userId as string);

      return res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);
