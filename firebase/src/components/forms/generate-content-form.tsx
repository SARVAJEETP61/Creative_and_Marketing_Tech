"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { generateBrandContent } from "@/ai/flows/generate-brand-content";
import {
  GenerateBrandContentOutput,
  GenerateBrandContentInputSchema,
} from "@/ai/schemas/generate-brand-content";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

type FormValues = z.infer<typeof GenerateBrandContentInputSchema>;

export default function GenerateContentForm() {
  const [generatedContent, setGeneratedContent] =
    useState<GenerateBrandContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(GenerateBrandContentInputSchema),
    defaultValues: {
      brandName: "",
      brandTone: "Friendly",
      contentType: "Instagram Caption",
      campaignGoal: "",
      keywords: "",
      contentLength: "Medium",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedContent(null);
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

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full"
            style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}
          >
            {isLoading ? "Generating..." : "Generate Content"}
          </Button>
        </form>
      </Form>

      {isLoading && <div className="text-center p-8">Loading...</div>}

      {generatedContent && (
        <div className="mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{generatedContent.content}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
