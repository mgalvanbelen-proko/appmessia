"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogoSymbol,
  LogoWordmark,
  LogoTagline,
} from "@/components/Logo";

const SUGGESTED_CHIPS = [
  "Estoy ansiosa",
  "Decisión difícil",
  "Necesito orar",
  "Me siento solo",
];

export default function LandingPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    function onScroll() {
      setShowScrollHint(window.scrollY < 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goToChat(message: string) {
    const trimmed = message.trim();
    if (!trimmed) return;
    router.push(`/chat?message=${encodeURIComponent(trimmed)}`);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    goToChat(input);
  }

  return (
    <main style={{ backgroundColor: "#F5EFE6", color: "#3B2817" }}>
      {/* SECTION 1 — Header */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(245, 239, 230, 0.92)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "0.5px solid rgba(155, 107, 61, 0.15)",
          padding: "20px 32px",
        }}
      >
        <span className="md:hidden" style={{ padding: "0", display: "block" }}>
          <HeaderLogo />
        </span>
        <span className="hidden md:flex">
          <HeaderLogo />
        </span>
        <span className="hidden md:flex">
          <LogoTagline />
        </span>
      </header>

      {/* SECTION 2 — Hero (above the fold) */}
      <section
        className="flex flex-col items-center justify-center text-center relative px-6 md:px-0"
        style={{
          minHeight: "calc(100svh - 68px)",
          backgroundColor: "#F5EFE6",
        }}
      >
        <div
          className="flex flex-col items-center w-full"
          style={{ maxWidth: 560 }}
        >
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(40px, 6.5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: 16,
            }}
          >
            <span style={{ color: "#3B2817" }}>Hablá. </span>
            <em style={{ color: "#FF5A4E", fontStyle: "italic" }}>
              Te escucho.
            </em>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#9B6B3D",
              maxWidth: 440,
              marginBottom: 40,
              lineHeight: 1.5,
            }}
          >
            Un asistente espiritual inspirado en las enseñanzas de Jesús. Sin
            juicios, con la Palabra cerca.
          </p>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: 460 }}
          >
            <div
              className="flex items-center gap-3"
              style={{
                background: "white",
                border: "0.5px solid #E0D5C2",
                borderRadius: 16,
                padding: "16px 20px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="¿Qué tenés en el corazón hoy?"
                className="flex-1 outline-none bg-transparent"
                style={{
                  fontSize: 15,
                  color: "#3B2817",
                  border: "none",
                }}
                aria-label="Mensaje inicial"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="flex items-center justify-center transition-colors"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: "#FF5A4E",
                  color: "white",
                  flexShrink: 0,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#E54A3F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#FF5A4E")
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </form>

          {/* Chips */}
          <div
            className="flex flex-wrap justify-center gap-2"
            style={{ marginTop: 20, maxWidth: 460 }}
          >
            {SUGGESTED_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => goToChat(chip)}
                className="transition-colors"
                style={{
                  background: "white",
                  border: "0.5px solid #E0D5C2",
                  borderRadius: 20,
                  padding: "8px 16px",
                  fontSize: 13,
                  color: "#6B4423",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#FAF5ED")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "white")
                }
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 flex flex-col items-center gap-1 pointer-events-none"
          style={{
            bottom: 32,
            opacity: showScrollHint ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: "#9B6B3D",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Seguir leyendo
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9B6B3D"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* SECTION 3 — Demo conversation */}
      <section
        className="px-6 md:px-8"
        style={{
          backgroundColor: "#F5EFE6",
          padding: "64px 24px",
        }}
      >
        <div className="md:py-12 mx-auto" style={{ maxWidth: 720 }}>
          <p
            className="text-center"
            style={{
              fontSize: 11,
              color: "#FF5A4E",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 14,
            }}
          >
            Fe que conversa
          </p>
          <h2
            className="font-serif text-center"
            style={{
              fontSize: "clamp(28px, 4.5vw, 36px)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "#3B2817",
              marginBottom: 14,
              letterSpacing: "-0.01em",
            }}
          >
            No es solo un versículo. Es un{" "}
            <em style={{ color: "#FF5A4E", fontStyle: "italic" }}>
              acompañamiento.
            </em>
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              fontSize: 16,
              color: "#6B4423",
              maxWidth: 480,
              marginBottom: 56,
              lineHeight: 1.5,
            }}
          >
            MessIA escucha, te aconseja con pasos concretos, y te abraza con la
            Palabra cuando más la necesitás.
          </p>

          {/* Conversation mockup */}
          <div
            className="mx-auto"
            style={{
              maxWidth: 520,
              background: "white",
              border: "0.5px solid #E0D5C2",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 4px 16px rgba(59, 40, 23, 0.06)",
            }}
          >
            <div
              className="flex items-center gap-2"
              style={{
                borderBottom: "0.5px solid #F0E8DC",
                paddingBottom: 14,
                marginBottom: 16,
              }}
            >
              <LogoSymbol size={18} />
              <LogoWordmark size={14} />
            </div>

            {/* User msg */}
            <div className="flex justify-end" style={{ marginBottom: 10 }}>
              <div
                style={{
                  background: "#2C3E5C",
                  color: "#F5EFE6",
                  borderRadius: "14px 14px 4px 14px",
                  padding: "10px 14px",
                  fontSize: 14,
                  maxWidth: "80%",
                  lineHeight: 1.5,
                }}
              >
                No me alcanza la plata este mes y estoy paralizada
              </div>
            </div>

            {/* MessIA reply */}
            <div className="flex justify-start">
              <div
                style={{
                  background: "#FAF5ED",
                  color: "#3B2817",
                  borderRadius: "14px 14px 14px 4px",
                  padding: "12px 14px",
                  fontSize: 14,
                  maxWidth: "88%",
                  lineHeight: 1.55,
                }}
              >
                Te entiendo, ese miedo paraliza de verdad. Antes que nada:
                respirá, no estás sola en esto.
                <br />
                <br />
                Hagamos algo concreto: anotá hoy tus 3 gastos más urgentes del
                mes y separalos del resto. A veces el caos es no ver el
                panorama.
                <br />
                <br />
                <em style={{ fontStyle: "italic" }}>
                  &ldquo;Por nada estéis afanosos...&rdquo;
                </em>{" "}
                (Filipenses 4:6) — no es no preocuparse, es entregar la
                preocupación mientras hacés tu parte.
                <br />
                <br />
                ¿Querés que oremos juntos por esto?
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Pillars + Final CTA */}
      <section
        className="px-6 md:px-8"
        style={{
          backgroundColor: "#F5EFE6",
          padding: "64px 24px",
          borderTop: "0.5px solid rgba(155, 107, 61, 0.15)",
        }}
      >
        <div className="md:py-12 mx-auto" style={{ maxWidth: 720 }}>
          <h2
            className="font-serif text-center"
            style={{
              fontSize: "clamp(26px, 4vw, 32px)",
              fontWeight: 400,
              color: "#3B2817",
              marginBottom: 56,
              letterSpacing: "-0.01em",
            }}
          >
            Lo que hace MessIA
          </h2>

          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            <PillarCard
              title="Te escucha"
              description="Contale lo que sea. Sin juicios, con espacio para lo que sentís."
              icon={
                <path d="M3 7 Q3 4 6 4 L14 4 Q17 4 17 7 L17 11 Q17 14 14 14 L9 14 L5 17 L6 14 Q3 14 3 11 Z" />
              }
            />
            <PillarCard
              title="Aconseja con la Palabra"
              description="Pasos concretos para tu día, con base bíblica. No solo versículos sueltos."
              icon={
                <>
                  <path d="M3 4 H9 Q11 4 11 6 V18 Q11 16 9 16 H3 Z" />
                  <path d="M17 4 H11 V18 H17 Q19 18 19 16 V6 Q19 4 17 4 Z" />
                </>
              }
            />
            <PillarCard
              title="Ora con vos"
              description="Te acompaña a poner en palabras lo que tu corazón quiere decir."
              icon={
                <path d="M11 17 C 6.5 13.5, 3.5 11, 3.5 7.5 C 3.5 5, 5.5 3.5, 7.5 3.5 C 9, 3.5, 10.5, 4.5, 11, 6 C 11.5, 4.5, 13, 3.5, 14.5, 3.5 C 16.5, 3.5, 18.5, 5, 18.5, 7.5 C 18.5, 11, 15.5, 13.5, 11, 17 Z" />
              }
            />
          </div>

          {/* Final CTA */}
          <div className="text-center" style={{ marginTop: 64 }}>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center transition-colors"
              style={{
                background: "#FF5A4E",
                color: "white",
                padding: "16px 40px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                boxShadow: "0 6px 18px rgba(255, 90, 78, 0.22)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#E54A3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FF5A4E")
              }
            >
              Empezar conversación
            </Link>
            <p
              style={{
                fontSize: 12,
                color: "#9B6B3D",
                marginTop: 16,
              }}
            >
              Gratis. Sin registro. Empezá ahora.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Footer */}
      <footer
        className="text-center"
        style={{
          backgroundColor: "#F0E8DC",
          padding: "48px 32px",
          borderTop: "0.5px solid #E0D5C2",
        }}
      >
        <div
          className="inline-flex items-center justify-center gap-2"
          style={{ marginBottom: 16 }}
        >
          <LogoSymbol size={20} />
          <LogoWordmark size={16} />
        </div>
        <p
          className="mx-auto"
          style={{
            fontSize: 12,
            color: "#9B6B3D",
            maxWidth: 480,
            lineHeight: 1.5,
          }}
        >
          MessIA es un asistente con inteligencia artificial inspirado en las
          enseñanzas de Jesús. No reemplaza el consejo pastoral, médico ni
          profesional.
        </p>
        <p
          style={{
            fontSize: 11,
            color: "#9B6B3D",
            marginTop: 16,
          }}
        >
          © 2025 MessIA
        </p>
      </footer>
    </main>
  );
}

function HeaderLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoSymbol size={24} />
      <LogoWordmark size={22} />
    </span>
  );
}

function PillarCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="text-center flex flex-col items-center"
      style={{
        background: "white",
        border: "0.5px solid #E0D5C2",
        borderRadius: 16,
        padding: "32px 24px",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          background: "#FAF5ED",
          marginBottom: 16,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 22 22"
          fill="none"
          stroke="#FF5A4E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icon}
        </svg>
      </div>
      <h3
        className="font-serif"
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: "#3B2817",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "#6B4423",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
}
