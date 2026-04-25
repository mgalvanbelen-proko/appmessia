"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import BiblePanel from "@/components/BiblePanel";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE = `Hola, qué bueno que estés acá.
Soy MessIA, un asistente inspirado en las enseñanzas de Jesús.
Contame qué tenés en el corazón hoy.`;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const maxHeight = 24 * 4 + 24;
    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + "px";
  }, [input]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const apiMessages: Message[] = [...messages.slice(1), userMsg];

    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) throw new Error("Network error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Disculpá, hubo un problema. Probá de nuevo en un momento.",
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const lastMsg = messages[messages.length - 1];
  const showLoadingDots =
    isStreaming && lastMsg?.role === "assistant" && lastMsg.content === "";

  return (
    <div
      className="flex h-[100dvh]"
      style={{ backgroundColor: "var(--azul-noche)" }}
    >
      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header
          className="sticky top-0 z-10 flex items-center justify-between"
          style={{
            backgroundColor: "rgba(245, 239, 230, 0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(155, 107, 61, 0.25)",
            padding: "14px 16px",
          }}
        >
          <span style={{ width: 36 }} aria-hidden="true" />
          <Logo variant="horizontal" size={24} />
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir Biblia"
            className="lg:hidden"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid rgba(155, 107, 61, 0.3)",
              background: "white",
              color: "var(--tierra)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h11a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4Z" />
              <path d="M4 4v17" />
            </svg>
          </button>
        </header>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto chat-scroll"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(123, 149, 184, 0.12) 0%, transparent 60%), var(--azul-noche)",
          }}
        >
          <div
            className="mx-auto px-4 sm:px-6 py-6 flex flex-col gap-3"
            style={{ maxWidth: 720 }}
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}
            {showLoadingDots && <LoadingDots />}
            <div style={{ height: 8 }} />
          </div>
        </div>

        {/* Input */}
        <div
          className="sticky bottom-0"
          style={{
            backgroundColor: "rgba(245, 239, 230, 0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(155, 107, 61, 0.25)",
          }}
        >
          <div
            className="mx-auto flex items-end gap-2 px-4 sm:px-6 py-3"
            style={{ maxWidth: 720 }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribí lo que sentís..."
              rows={1}
              disabled={isStreaming}
              className="flex-1 resize-none outline-none"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(155, 107, 61, 0.3)",
                borderRadius: 24,
                padding: "10px 16px",
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--tierra)",
                minHeight: 44,
                maxHeight: 24 * 4 + 24,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isStreaming || !input.trim()}
              aria-label="Enviar"
              className="flex items-center justify-center transition-opacity"
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                backgroundColor: "var(--coral)",
                color: "white",
                flexShrink: 0,
                opacity: isStreaming || !input.trim() ? 0.5 : 1,
                cursor: isStreaming || !input.trim() ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop side panel */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          width: 340,
          flexShrink: 0,
          backgroundColor: "var(--crema)",
          borderLeft: "1px solid rgba(155, 107, 61, 0.25)",
        }}
      >
        <BiblePanel />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          onClick={() => setDrawerOpen(false)}
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full flex flex-col"
            style={{
              width: "min(360px, 90vw)",
              backgroundColor: "var(--crema)",
              boxShadow: "-8px 0 24px rgba(0,0,0,0.2)",
            }}
          >
            <BiblePanel onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ role, content }: Message) {
  const isUser = role === "user";
  return (
    <div className="flex" style={{ justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "85%",
          padding: "12px 16px",
          fontSize: 15,
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          backgroundColor: isUser ? "var(--cielo-polvo)" : "var(--crema)",
          color: isUser ? "white" : "var(--tierra)",
          border: isUser ? "none" : "1px solid rgba(245, 239, 230, 0.15)",
          borderRadius: 18,
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,
          boxShadow: isUser
            ? "0 1px 2px rgba(0,0,0,0.15)"
            : "0 1px 3px rgba(0,0,0,0.18)",
        }}
      >
        {content}
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex" style={{ justifyContent: "flex-start" }}>
      <div
        style={{
          padding: "14px 18px",
          backgroundColor: "var(--crema)",
          borderRadius: 18,
          borderBottomLeftRadius: 4,
          display: "flex",
          gap: 5,
          boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-dot-pulse"
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: "var(--tabaco)",
              animationDelay: `${i * 0.15}s`,
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
}
