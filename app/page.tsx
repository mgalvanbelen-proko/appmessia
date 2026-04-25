import Link from "next/link";
import Logo from "@/components/Logo";

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 32 32"
      fill="none"
      stroke="#FF5A4E"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const features = [
  {
    title: "Te escucho",
    body: "Contame lo que sea. Sin juicios, con espacio para lo que sentís.",
    icon: (
      <FeatureIcon>
        <path d="M6 14a10 10 0 0 1 20 0v4a4 4 0 0 1-4 4h-2v-8h6" />
        <path d="M6 14v4a4 4 0 0 0 4 4h2v-8H6" />
      </FeatureIcon>
    ),
  },
  {
    title: "Consejo con la Palabra",
    body: "No solo versículos. Pasos concretos para tu día a día, con base bíblica.",
    icon: (
      <FeatureIcon>
        <path d="M6 5h13a3 3 0 0 1 3 3v18a2 2 0 0 0-2-2H6Z" />
        <path d="M6 5v21" />
        <path d="M11 12h6" />
      </FeatureIcon>
    ),
  },
  {
    title: "Una oración cuando lo necesitás",
    body: "Te acompaño a poner en palabras lo que tu corazón quiere decir.",
    icon: (
      <FeatureIcon>
        <path d="M16 4c2 4 5 6 9 6-1 7-5 13-9 18-4-5-8-11-9-18 4 0 7-2 9-6Z" />
      </FeatureIcon>
    ),
  },
];

function Ornament() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3"
      style={{ color: "rgba(155, 107, 61, 0.4)" }}
    >
      <span style={{ height: 1, width: 40, background: "currentColor", display: "block" }} />
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          background: "var(--coral)",
          display: "block",
        }}
      />
      <span style={{ height: 1, width: 40, background: "currentColor", display: "block" }} />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: "var(--crema)",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123, 149, 184, 0.08) 0%, transparent 60%), radial-gradient(ellipse 70% 40% at 50% 100%, rgba(255, 90, 78, 0.05) 0%, transparent 60%)",
      }}
    >
      {/* Header */}
      <header className="px-6 sm:px-10 py-6 z-10">
        <Logo variant="horizontal" size={28} />
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-8 pb-16 sm:pt-16 sm:pb-24 z-10">
        {/* Big full logo as protagonist */}
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <Logo variant="full" size={140} />
        </div>

        <h1
          className="font-serif leading-[1.05]"
          style={{
            color: "var(--tierra)",
            fontSize: "clamp(40px, 7vw, 64px)",
            letterSpacing: "-0.02em",
          }}
        >
          Tu compañero espiritual,
          <br />
          siempre cerca.
        </h1>

        <p
          className="mt-6"
          style={{
            color: "var(--tabaco)",
            maxWidth: "520px",
            lineHeight: 1.6,
            fontSize: "clamp(15px, 2.2vw, 18px)",
          }}
        >
          Conversaciones cálidas, consejos prácticos y la Palabra que necesitás.
          Inspirado en las enseñanzas de Jesús.
        </p>

        <Link
          href="/chat"
          className="mt-10 inline-flex items-center justify-center transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: "var(--coral)",
            color: "white",
            padding: "18px 36px",
            borderRadius: 14,
            fontWeight: 500,
            fontSize: 16.5,
            letterSpacing: "0.2px",
            boxShadow: "0 8px 24px rgba(255, 90, 78, 0.25)",
          }}
        >
          Empezar conversación
        </Link>

        <p
          className="mt-5"
          style={{
            color: "var(--tabaco)",
            fontSize: 13,
            opacity: 0.85,
          }}
        >
          Charlemos, de lo que quieras
        </p>

        {/* Ornament divider */}
        <div className="mt-20 sm:mt-28 mb-12 sm:mb-16">
          <Ornament />
        </div>

        {/* Features */}
        <div
          className="grid gap-10 sm:gap-12 w-full"
          style={{
            maxWidth: 980,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {features.map((f) => (
            <div key={f.title} className="text-left flex flex-col gap-3 px-2">
              <div>{f.icon}</div>
              <h3
                className="font-serif"
                style={{
                  color: "var(--tierra)",
                  fontSize: 22,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--tabaco)",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 sm:px-10 py-10 mt-12 flex flex-col items-center gap-5 text-center z-10"
        style={{ borderTop: "1px solid rgba(155, 107, 61, 0.25)" }}
      >
        <Logo variant="horizontal" size={24} />
        <p
          style={{
            color: "var(--tabaco)",
            fontSize: 12,
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          MessIA es un asistente con inteligencia artificial inspirado en las
          enseñanzas de Jesús. No reemplaza el consejo pastoral, médico ni
          profesional.
        </p>
        <p style={{ color: "var(--tabaco)", fontSize: 11 }}>© 2025 MessIA</p>
      </footer>
    </main>
  );
}
