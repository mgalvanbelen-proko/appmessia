import Link from "next/link";
import Logo from "@/components/Logo";

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="32"
      height="32"
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

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--crema)" }}>
      {/* Header */}
      <header className="px-6 sm:px-10 py-6">
        <Logo variant="horizontal" size={26} />
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 sm:py-20">
        <Logo variant="symbol" size={80} />

        <h1
          className="font-serif mt-8 leading-tight"
          style={{
            color: "var(--tierra)",
            fontSize: "clamp(36px, 6vw, 48px)",
          }}
        >
          Tu compañero espiritual,
          <br />
          siempre cerca.
        </h1>

        <p
          className="mt-5 text-base sm:text-lg"
          style={{
            color: "var(--tabaco)",
            maxWidth: "480px",
            lineHeight: 1.6,
            fontSize: "clamp(15px, 2.2vw, 18px)",
          }}
        >
          Conversaciones cálidas, consejos prácticos y la Palabra que necesitás.
          Inspirado en las enseñanzas de Jesús.
        </p>

        <Link
          href="/chat"
          className="mt-10 inline-flex items-center justify-center transition-colors"
          style={{
            backgroundColor: "var(--coral)",
            color: "white",
            padding: "16px 32px",
            borderRadius: 12,
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: "0.2px",
          }}
        >
          Empezar conversación
        </Link>

        {/* Features */}
        <div
          className="grid gap-8 mt-20 sm:mt-24 w-full"
          style={{
            maxWidth: 960,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {features.map((f) => (
            <div key={f.title} className="text-left flex flex-col gap-3 px-2">
              <div>{f.icon}</div>
              <h3
                className="font-serif"
                style={{ color: "var(--tierra)", fontSize: 20, lineHeight: 1.3 }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--tabaco)",
                  fontSize: 15,
                  lineHeight: 1.55,
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
        className="px-6 sm:px-10 py-10 mt-12 flex flex-col items-center gap-5 text-center"
        style={{ borderTop: "1px solid rgba(155, 107, 61, 0.3)" }}
      >
        <Logo variant="horizontal" size={22} />
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
