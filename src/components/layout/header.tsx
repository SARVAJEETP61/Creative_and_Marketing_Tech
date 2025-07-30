import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">AI Visibility Engine</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#what-we-do" className="transition-colors hover:text-foreground/80 text-foreground/60">What We Do</Link>
            <Link href="#use-case" className="transition-colors hover:text-foreground/80 text-foreground/60">Use Case</Link>
            <Link href="#why-us" className="transition-colors hover:text-foreground/80 text-foreground/60">Why Us</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
            <Link href="#">Start Creating</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
