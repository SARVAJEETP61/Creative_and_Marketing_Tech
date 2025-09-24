'use server';

/**
 * @fileOverview This file defines a Genkit flow for discovering trending queries in a specific industry.
 *
 * - `discoverTrendingQueries`:  A function that takes an industry description as input and returns a list of trending queries.
 * - `DiscoverTrendingQueriesInput`: The input type for the `discoverTrendingQueries` function.
 * - `DiscoverTrendingQueriesOutput`: The output type for the `discoverTrendingQueries` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscoverTrendingQueriesInputSchema = z.object({
  industry: z.string().describe('The industry to discover trending queries for.'),
});
export type DiscoverTrendingQueriesInput = z.infer<typeof DiscoverTrendingQueriesInputSchema>;

const DiscoverTrendingQueriesOutputSchema = z.object({
  trendingQueries: z.array(z.string()).describe('A list of trending queries in the specified industry.'),
});
export type DiscoverTrendingQueriesOutput = z.infer<typeof DiscoverTrendingQueriesOutputSchema>;

export async function discoverTrendingQueries(input: DiscoverTrendingQueriesInput): Promise<DiscoverTrendingQueriesOutput> {
  return discoverTrendingQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'discoverTrendingQueriesPrompt',
  input: {schema: DiscoverTrendingQueriesInputSchema},
  output: {schema: DiscoverTrendingQueriesOutputSchema},
  prompt: `You are an expert in identifying trending search queries.
  Given the following industry, identify the top 5 trending search queries that are relevant to the industry.
  Industry: {{{industry}}}
  Format the output as a list of strings.
  `,
});

const discoverTrendingQueriesFlow = ai.defineFlow({
    name: 'discoverTrendingQueriesFlow',
    inputSchema: DiscoverTrendingQueriesInputSchema,
    outputSchema: DiscoverTrendingQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
