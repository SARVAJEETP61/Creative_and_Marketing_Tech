'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { generateBrandContent, GenerateBrandContentOutput } from '@/ai/flows/generate-brand-content';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clipboard, Download, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '../ui/toaster';

const formSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required.'),
  brandTone: z.enum(['Witty', 'Professional', 'Friendly']),
  contentType: z.enum(['Instagram Caption', 'Blog Post', 'Ad Copy']),
  campaignGoal: z.string().optional(),
  keywords: z.string().optional(),
  contentLength: z.enum(['Short', 'Medium', 'Long']),
  enableGenAIStructure: z.boolean(),
  simulatePrompt: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function GenerateContentForm() {
  const [generatedContent, setGeneratedContent] = useState<GenerateBrandContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequest, setLastRequest] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: '',
      brandTone: 'Friendly',
      contentType: 'Instagram Caption',
      campaignGoal: '',
      keywords: '',
      contentLength: 'Medium',
      enableGenAIStructure: true,
      simulatePrompt: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedContent(null);
    setLastRequest(values);
    try {
      const result = await generateBrandContent(values);
      setGeneratedContent(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegenerate() {
    if (lastRequest) {
      await onSubmit(lastRequest);
    }
  }

  function copyToClipboard() {
    if (generatedContent?.content) {
      navigator.clipboard.writeText(generatedContent.content);
      toast({ title: 'Copied to clipboard!' });
    }
  }

  function downloadAsTxt() {
    if (generatedContent?.content) {
      const blob = new Blob([generatedContent.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${form.getValues('brandName')}-${form.getValues('contentType')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }


  return (
    <>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., AeroStride" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="brandTone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Voice / Tone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Witty">Witty</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Instagram Caption">Instagram Caption</SelectItem>
                      <SelectItem value="Blog Post">Blog Post</SelectItem>
                      <SelectItem value="Ad Copy">Ad Copy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="campaignGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Objective (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Announce a new product launch" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords or Hashtags (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., running, marathon, fitness" {...field} />
                </FormControl>
                <FormDescription>Comma-separated keywords or hashtags.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentLength"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Length Preference</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Short" />
                      </FormControl>
                      <FormLabel className="font-normal">Short</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Medium" />
                      </FormControl>
                      <FormLabel className="font-normal">Medium</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Long" />
                      </FormControl>
                      <FormLabel className="font-normal">Long</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="enableGenAIStructure"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>GenAI Optimisation</FormLabel>
                    <FormDescription>Structure the output for better AI visibility.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="simulatePrompt"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Prompt Simulation</FormLabel>
                    <FormDescription>Show how the content might appear in an AI response.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} size="lg" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            {isLoading ? 'Generating...' : 'Generate Content'}
          </Button>
        </form>
      </Form>

      {isLoading && <div className="text-center p-8">Loading...</div>}

      {generatedContent && (
        <div className="mt-12 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Generated Content</CardTitle>
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" onClick={copyToClipboard}><Clipboard /></Button>
                         <Button variant="ghost" size="icon" onClick={downloadAsTxt}><Download /></Button>
                         <Button variant="ghost" size="icon" onClick={handleRegenerate}><RefreshCw /></Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap">{generatedContent.content}</p>
                </CardContent>
            </Card>

            {generatedContent.promptSimulation && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Prompt Simulation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{generatedContent.promptSimulation}</p>
                    </CardContent>
                </Card>
            )}
        </div>
      )}
    </>
  );
}
