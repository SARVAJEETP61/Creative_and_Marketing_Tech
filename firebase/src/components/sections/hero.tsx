import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background">
      <div aria-hidden="true" className="absolute inset-0 top-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/80">
          Marketing That Shows Up in AI
          <br />
          — Not Just Google
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Optimize your content for the new era of search. Our tools help your brand get discovered in AI-powered answers on ChatGPT, Perplexity, and Gemini.
        </p>
        <Button size="lg" asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90 shadow-lg shadow-accent/20 transition-all duration-300 transform hover:scale-105">
          <Link href="/generate">Start Creating</Link>
        </Button>
      </div>
    </section>
  );
}
