import { z } from "zod";

export const GenerateBrandContentInputSchema = z.object({
  // Use Option A (trim + min). If your Zod doesn't support .trim(), swap to Option B above.
  brandName: z.string().trim().min(1, "Brand name is required"),
  brandTone: z.enum(["Witty", "Professional", "Friendly"]),
  contentType: z.enum(["Instagram Caption", "Blog Post", "Ad Copy"]),
  campaignGoal: z.string().optional(),
  keywords: z.string().optional(),
  contentLength: z.enum(["Short", "Medium", "Long"]),
});

export type GenerateBrandContentInput = z.infer<typeof GenerateBrandContentInputSchema>;

export const GenerateBrandContentOutputSchema = z.object({
  content: z.string(),
});
export type GenerateBrandContentOutput = z.infer<typeof GenerateBrandContentOutputSchema>;
