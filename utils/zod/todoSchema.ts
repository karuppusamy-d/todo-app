import { z } from "zod";

export const subTodoSchema = z
  .object({
    title: z.string().min(1).max(25),
    description: z.string().max(100),
    date: z.number(),
    important: z.boolean(),
    completed: z.boolean(),
    id: z.string(),
  })
  .strict();

export const todoSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().max(100),
  date: z.number(),
  important: z.boolean(),
  completed: z.boolean(),
  subTodos: subTodoSchema.array().optional(),
});

export const todoWithIdSchema = todoSchema.extend({
  id: z.string(),
  uid: z.string(),
});
