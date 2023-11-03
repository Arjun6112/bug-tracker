import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255),
  desc: z.string().min(1),
});
