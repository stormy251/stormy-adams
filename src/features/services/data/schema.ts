import { z } from "zod"

// Overly simplified schema for the sake of the playground
export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Service = z.infer<typeof serviceSchema>