import { z } from "zod";

export const workspaceSchema = z.object({
  workspace: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long"),
});
