import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";          // ensure Node runtime (not Edge)
export const dynamic = "force-dynamic";   // avoid caching during dev

const API_KEY =
  process.env.GOOGLE_API_KEY ||
  process.env.GEMINI_API_KEY ||
  "";

console.log("[/api/generate] key present?", Boolean(API_KEY), API_KEY?.slice(0,6)); // temp debug; remove later

const genAI = new GoogleGenerativeAI(API_KEY);

type Input = {
  brandName?: string;
  brandTone?: "Witty" | "Professional" | "Friendly";
  contentType?: "Instagram Caption" | "Blog Post" | "Ad Copy";
  campaignGoal?: string;
  keywords?: string;
  contentLength?: "Short" | "Medium" | "Long";
};

// normalize + defaults + trimming
function normalize(body: Input) {
  const brandName = String(body.brandName ?? "").trim();

  const brandTone =
    (["Witty", "Professional", "Friendly"].includes(String(body.brandTone))
      ? body.brandTone
      : "Friendly") as "Witty" | "Professional" | "Friendly";

  const contentType =
    (["Instagram Caption", "Blog Post", "Ad Copy"].includes(String(body.contentType))
      ? body.contentType
      : "Instagram Caption") as "Instagram Caption" | "Blog Post" | "Ad Copy";

  const contentLength =
    (["Short", "Medium", "Long"].includes(String(body.contentLength))
      ? body.contentLength
      : "Medium") as "Short" | "Medium" | "Long";

  return {
    brandName,
    brandTone,
    contentType,
    contentLength,
    campaignGoal: String(body.campaignGoal ?? "").trim(),
    keywords: String(body.keywords ?? "").trim(),
  };
}

function buildPrompt(p: ReturnType<typeof normalize>) {
  const target =
    p.contentLength === "Short" ? "50–80" :
    p.contentLength === "Long"  ? "250–350" : "120–180";

  const kws = p.keywords
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ");

  return [
    `You are a marketing copywriter.`,
    `Write a ${p.contentType} for the brand "${p.brandName}" in a ${p.brandTone.toLowerCase()} voice.`,
    p.campaignGoal ? `Campaign objective: ${p.campaignGoal}.` : ``,
    kws ? `Incorporate these keywords/hashtags where natural: ${kws}.` : ``,
    `Length ~${target} words.`,
    `Output plain text only (no markdown).`,
  ].filter(Boolean).join(" ");
}

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Server misconfig: GOOGLE_API_KEY/GEMINI_API_KEY not set" },
        { status: 500 }
      );
    }

    const raw = (await req.json()) as Input;
    const data = normalize(raw);

    if (!data.brandName) {
      return NextResponse.json({ error: "brandName is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(buildPrompt(data));
    return NextResponse.json({ content: result.response.text() });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
