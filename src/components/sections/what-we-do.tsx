import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, TrendingUp, Link as LinkIcon } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-8 w-8 text-accent" />,
    title: 'AI Search Visibility',
    description: 'Leverage our generative AI tool to audit your marketing content and get suggestions for better visibility in AI search results on platforms like ChatGPT, Perplexity, and Gemini.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-accent" />,
    title: 'Trending Query Analysis',
    description: "Our AI-powered analysis tool identifies trending queries relevant to your industry, helping you optimize for what your audience is asking AI right now.",
  },
  {
    icon: <LinkIcon className="h-8 w-8 text-accent" />,
    title: 'Citation Optimization',
    description: "Get smart suggestions for internal and external links to enhance your content's authority. Our tool helps you find and generate suitable citation opportunities.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="py-20 md:py-28 bg-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">What We Do</h2>
          <p className="text-lg text-muted-foreground mt-2">We equip your brand for the future of search.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-border/50 hover:border-primary/50 transition-all transform hover:-translate-y-2 duration-300">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-accent/10">{feature.icon}</div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
