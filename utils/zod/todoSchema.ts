import { z } from "zod";

export const subTodoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    important: z.boolean(),
    completed: z.boolean(),
  })
  .strict();

export const todoSchema = subTodoSchema.extend({
  subTodos: subTodoSchema.array().optional(),
});

export const todoWithIdSchema = todoSchema.extend({
  id: z.string(),
  uid: z.string(),
});
