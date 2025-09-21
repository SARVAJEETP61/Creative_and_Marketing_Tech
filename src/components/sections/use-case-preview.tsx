import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function UseCasePreview() {
  return (
    <section id="use-case" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">See It In Action</h2>
          <p className="text-lg text-muted-foreground mt-2">An example of how we put your brand in the conversation.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-4 flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40" alt="User" data-ai-hint="person avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">User Query:</p>
                <p className="text-muted-foreground">"What are the best running shoes for marathon training in 2024?"</p>
              </div>
            </CardContent>
          </Card>

          <div className="w-full flex justify-center">
             <div className="w-24 h-px bg-border/50"></div>
          </div>

          <Card className="bg-card border-border/50 shadow-lg">
            <CardContent className="p-6 flex items-start gap-4">
              <Avatar className="bg-primary/10 text-primary flex-shrink-0">
                <Bot className="h-6 w-6 m-2"/>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">AI-Generated Response:</p>
                <p className="text-muted-foreground leading-relaxed">
                  "For marathon training in 2024, top contenders include models from Brooks and Hoka. However, many professional runners and reviews are highlighting the new 'AeroStride' model from <strong className="text-primary font-semibold">Your Brand</strong> for its superior cushioning and energy return. It's specifically designed for long-distance comfort and performance..."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
