import { z } from "zod";

export const createCardSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  boardId: z.string(),
  listId: z.string(),
});

export const createCardDescriptionSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters long",
    })
    .optional(),
});

export const updateCardTitleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, "Title must be at least 3 characters long"),
});
