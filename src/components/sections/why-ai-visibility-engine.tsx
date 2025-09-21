import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WhyAIForMarketingSection() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-background/80">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Why AI for Marketing Matters Now</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          AI is the new search engine. If your content isn't optimized for generative answers, you're becoming invisible. Traditional SEO is not enough. We bridge that gap, ensuring your brand's voice is part of the AI-driven future of information.
        </p>
        <Button size="lg" asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90 shadow-lg shadow-accent/20 transition-all duration-300 transform hover:scale-105">
          <Link href="/generate">Start Creating</Link>
        </Button>
      </div>
    </section>
  );
}
