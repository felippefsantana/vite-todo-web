import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Escreva um título.").trim(),
  description: z.string().trim(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
