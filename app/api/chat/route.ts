import Anthropic from "@anthropic-ai/sdk";
import { MESSIA_SYSTEM_PROMPT } from "@/lib/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) =>
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0
  );

  if (messages.length === 0) {
    return new Response("No messages", { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("Missing ANTHROPIC_API_KEY", { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model: "claude-sonnet-4-5",
          max_tokens: 1024,
          system: MESSIA_SYSTEM_PROMPT,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        controller.close();
      } catch (err) {
        console.error("Anthropic streaming error:", err);
        try {
          controller.enqueue(
            encoder.encode(
              "Disculpá, hubo un problema. Probá de nuevo en un momento."
            )
          );
        } catch {}
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
