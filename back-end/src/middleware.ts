import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

export const orgIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orgId } = getAuth(req);
  if (!orgId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};
