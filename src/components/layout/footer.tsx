import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
           <Bot className="h-6 w-6 text-primary" />
           <span className="font-bold font-headline">AI for Marketing</span>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AI for Marketing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
