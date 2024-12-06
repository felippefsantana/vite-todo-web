import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

const config = envSchema.parse(import.meta.env);

export const env = config;
