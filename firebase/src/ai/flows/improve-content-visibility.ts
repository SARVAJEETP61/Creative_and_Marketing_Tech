'use server';

/**
 * @fileOverview Analyzes existing content and provides suggestions for improved visibility in AI search results.
 *
 * - improveContentVisibility - A function that analyzes content and provides improvement suggestions.
 * - ImproveContentVisibilityInput - The input type for the improveContentVisibility function.
 * - ImproveContentVisibilityOutput - The return type for the improveContentVisibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveContentVisibilityInputSchema = z.object({
  content: z.string().describe('The content to be analyzed.'),
  keywords: z.string().describe('Relevant keywords for the content.'),
  brandName: z.string().describe('The name of the brand associated with the content.'),
});
export type ImproveContentVisibilityInput = z.infer<
  typeof ImproveContentVisibilityInputSchema
>;

const ImproveContentVisibilityOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions for improving content visibility in AI search results.'),
});
export type ImproveContentVisibilityOutput = z.infer<
  typeof ImproveContentVisibilityOutputSchema
>;

export async function improveContentVisibility(
  input: ImproveContentVisibilityInput
): Promise<ImproveContentVisibilityOutput> {
  return improveContentVisibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveContentVisibilityPrompt',
  input: {schema: ImproveContentVisibilityInputSchema},
  output: {schema: ImproveContentVisibilityOutputSchema},
  prompt: `You are an AI-powered marketing content optimization tool. Your goal is to analyze the provided content and suggest improvements to enhance its visibility in AI search results on platforms like ChatGPT, Perplexity, and Gemini.

  Here's the content to analyze:
  Content: {{{content}}}

  Keywords: {{{keywords}}}

  Brand Name: {{{brandName}}}

  Provide actionable suggestions to make the content more visible in AI-powered search results. Focus on:
  * Improving keyword integration
  * Optimizing for relevant trending queries
  * Enhancing citation opportunities both internally and externally
  * Ensuring the content is well-structured and easily digestible by AI algorithms
  * Making sure the brand is mentioned naturally and appropriately in context.
  * Making sure that the content includes questions which are answered comprehensively.
  * Suggest how to rewrite/restructure the content so it becomes more visible in AI search results.
`,
});

const improveContentVisibilityFlow = ai.defineFlow(
  {
    name: 'improveContentVisibilityFlow',
    inputSchema: ImproveContentVisibilityInputSchema,
    outputSchema: ImproveContentVisibilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
