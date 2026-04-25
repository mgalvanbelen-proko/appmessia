type LogoVariant = "full" | "horizontal" | "symbol";

type LogoProps = {
  variant?: LogoVariant;
  size?: number;
  className?: string;
};

function Symbol({ size = 32 }: { size?: number }) {
  const w = size;
  const h = (size * 95) / 105;
  return (
    <svg
      viewBox="0 0 105 95"
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d="M 10 25 Q 10 5 30 5 L 75 5 Q 95 5 95 25 L 95 55 Q 95 75 75 75 L 45 75 L 28 90 L 32 75 Q 10 75 10 55 Z"
        fill="#2C3E5C"
      />
      <circle cx="52" cy="40" r="6" fill="#FF5A4E" />
      <line x1="52" y1="20" x2="52" y2="14" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="60" x2="52" y2="66" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="40" x2="26" y2="40" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="72" y1="40" x2="78" y2="40" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="26" x2="34" y2="22" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="66" y1="26" x2="70" y2="22" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="54" x2="34" y2="58" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="66" y1="54" x2="70" y2="58" stroke="#F5EFE6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="font-serif leading-none"
      style={{ fontSize: size, color: "var(--tierra)" }}
    >
      Mess
      <em
        className="not-italic"
        style={{ fontStyle: "italic", color: "var(--coral)" }}
      >
        IA
      </em>
    </span>
  );
}

function Tagline() {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        style={{
          width: 3,
          height: 3,
          borderRadius: 999,
          backgroundColor: "var(--coral)",
          display: "inline-block",
        }}
      />
      <span
        style={{
          color: "var(--azul-noche)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        fe que conversa
      </span>
    </span>
  );
}

export default function Logo({
  variant = "horizontal",
  size,
  className = "",
}: LogoProps) {
  if (variant === "symbol") {
    return (
      <span className={className}>
        <Symbol size={size ?? 32} />
      </span>
    );
  }

  if (variant === "full") {
    const symbolSize = size ?? 64;
    const wordmarkSize = Math.round(symbolSize * 0.6);
    return (
      <span className={`flex flex-col items-center gap-3 ${className}`}>
        <Symbol size={symbolSize} />
        <Wordmark size={wordmarkSize} />
        <Tagline />
      </span>
    );
  }

  // horizontal
  const symbolSize = size ?? 28;
  const wordmarkSize = Math.round(symbolSize * 1.1);
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Symbol size={symbolSize} />
      <Wordmark size={wordmarkSize} />
    </span>
  );
}
