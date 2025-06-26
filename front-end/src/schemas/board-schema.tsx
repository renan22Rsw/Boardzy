import { z } from "zod";

export const boardSchema = z.object({
  board: z.string().min(3, "Board name must be at least 3 characters long"),
  boardColor: z.string().min(4, "Board color must be selected"),
});
