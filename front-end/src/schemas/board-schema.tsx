import { z } from "zod";

export const boardSchema = z.object({
  title: z.string().min(3, "Board name must be at least 3 characters long"),
  color: z.string().min(4, "Board color must be selected"),
});
