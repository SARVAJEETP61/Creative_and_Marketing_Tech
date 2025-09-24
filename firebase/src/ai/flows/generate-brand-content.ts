import type {
  GenerateBrandContentInput,
  GenerateBrandContentOutput,
} from "@/ai/schemas/generate-brand-content";

export async function generateBrandContent(
  input: GenerateBrandContentInput
): Promise<GenerateBrandContentOutput> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return { content: data.content };
}
