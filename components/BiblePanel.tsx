"use client";

import { useEffect, useRef, useState } from "react";
import { TRANSLATIONS, Translation } from "@/lib/bible-books";

type Verse = { verse: number; text: string };

type LookupResult = {
  reference: string;
  translation: Translation;
  translationLabel: string;
  translationShort: string;
  verses: Verse[];
};

type Favorite = {
  id: string;
  reference: string;
  translation: Translation;
  translationShort: string;
  verses: Verse[];
  addedAt: string;
};

const STORAGE_KEY = "messia.favoriteVerses.v1";

function loadFavorites(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: Favorite[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch {}
}

function favoriteKey(ref: string, t: Translation): string {
  return `${t}::${ref}`;
}

export default function BiblePanel({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("Juan 3:16");
  const [translation, setTranslation] = useState<Translation>("RV1960");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [tab, setTab] = useState<"buscar" | "favoritos">("buscar");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  async function lookup(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `/api/bible?ref=${encodeURIComponent(q)}&translation=${translation}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error buscando el versículo.");
      } else {
        setResult(data as LookupResult);
      }
    } catch {
      setError("No pude buscar ahora. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite() {
    if (!result) return;
    const id = favoriteKey(result.reference, result.translation);
    const exists = favorites.some((f) => f.id === id);
    let next: Favorite[];
    if (exists) {
      next = favorites.filter((f) => f.id !== id);
    } else {
      const fav: Favorite = {
        id,
        reference: result.reference,
        translation: result.translation,
        translationShort: result.translationShort,
        verses: result.verses,
        addedAt: new Date().toISOString(),
      };
      next = [fav, ...favorites];
    }
    setFavorites(next);
    saveFavorites(next);
  }

  function removeFavorite(id: string) {
    const next = favorites.filter((f) => f.id !== id);
    setFavorites(next);
    saveFavorites(next);
  }

  const isFav =
    result !== null &&
    favorites.some(
      (f) => f.id === favoriteKey(result.reference, result.translation)
    );

  return (
    <div className="flex flex-col h-full" style={{ color: "var(--tierra)" }}>
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(155, 107, 61, 0.25)" }}
      >
        <div className="flex items-center gap-2">
          <BookIcon />
          <span className="font-serif" style={{ fontSize: 18, color: "var(--tierra)" }}>
            La Palabra
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Cerrar panel"
            className="lg:hidden"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              color: "var(--tabaco)",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex" style={{ borderBottom: "1px solid rgba(155, 107, 61, 0.2)" }}>
        <TabButton
          active={tab === "buscar"}
          onClick={() => setTab("buscar")}
          label="Buscar"
        />
        <TabButton
          active={tab === "favoritos"}
          onClick={() => setTab("favoritos")}
          label={`Favoritos${favorites.length ? ` · ${favorites.length}` : ""}`}
        />
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4">
        {tab === "buscar" ? (
          <>
            <form onSubmit={lookup} className="flex flex-col gap-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: Juan 3:16, Salmos 23, 1 Co 13:4-7"
                className="outline-none"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(155, 107, 61, 0.35)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 14,
                  color: "var(--tierra)",
                }}
              />
              <div className="flex items-center gap-2">
                <select
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value as Translation)}
                  className="outline-none"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid rgba(155, 107, 61, 0.35)",
                    borderRadius: 10,
                    padding: "8px 10px",
                    fontSize: 13,
                    color: "var(--tierra)",
                    flex: 1,
                  }}
                >
                  {TRANSLATIONS.map((t) => (
                    <option key={t} value={t}>
                      {t === "RV1960" ? "RVR60" : t}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: "var(--coral)",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: loading ? "wait" : "pointer",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </form>

            {error && (
              <div
                className="mt-4"
                style={{
                  fontSize: 13,
                  color: "#a3361f",
                  background: "rgba(255, 90, 78, 0.08)",
                  border: "1px solid rgba(255, 90, 78, 0.25)",
                  padding: "10px 12px",
                  borderRadius: 10,
                }}
              >
                {error}
              </div>
            )}

            {result && (
              <div className="mt-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div
                      className="font-serif"
                      style={{ fontSize: 17, color: "var(--tierra)" }}
                    >
                      {result.reference}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--tabaco)", letterSpacing: "1px", textTransform: "uppercase", marginTop: 2 }}>
                      {result.translationShort}
                    </div>
                  </div>
                  <button
                    onClick={toggleFavorite}
                    aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                    title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      border: "1px solid rgba(155, 107, 61, 0.3)",
                      background: isFav ? "var(--coral)" : "white",
                      color: isFav ? "white" : "var(--tabaco)",
                      cursor: "pointer",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StarIcon filled={isFav} />
                  </button>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "var(--tierra)",
                  }}
                >
                  {result.verses.map((v) => (
                    <span key={v.verse}>
                      <sup style={{ color: "var(--coral)", fontWeight: 600, marginRight: 3 }}>
                        {v.verse}
                      </sup>
                      {v.text}{" "}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!result && !error && !loading && (
              <p style={{ fontSize: 13, color: "var(--tabaco)", marginTop: 16, lineHeight: 1.5 }}>
                Escribí una referencia y elegí la traducción. Podés guardar tus
                favoritos con la estrella.
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {favorites.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--tabaco)", lineHeight: 1.5 }}>
                Todavía no guardaste favoritos. Cuando busques un versículo,
                tocá la estrella para guardarlo acá.
              </p>
            ) : (
              favorites.map((f) => (
                <div
                  key={f.id}
                  style={{
                    border: "1px solid rgba(155, 107, 61, 0.25)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    background: "white",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="font-serif" style={{ fontSize: 15, color: "var(--tierra)" }}>
                        {f.reference}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--tabaco)", letterSpacing: "1px", textTransform: "uppercase", marginTop: 2 }}>
                        {f.translationShort}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFavorite(f.id)}
                      aria-label="Eliminar favorito"
                      title="Eliminar"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        border: "none",
                        background: "transparent",
                        color: "var(--tabaco)",
                        cursor: "pointer",
                        flexShrink: 0,
                        fontSize: 14,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--tierra)" }}>
                    {f.verses.map((v) => (
                      <span key={v.verse}>
                        <sup style={{ color: "var(--coral)", fontWeight: 600, marginRight: 2 }}>
                          {v.verse}
                        </sup>
                        {v.text}{" "}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 8px",
        background: "transparent",
        border: "none",
        borderBottom: active ? "2px solid var(--coral)" : "2px solid transparent",
        color: active ? "var(--tierra)" : "var(--tabaco)",
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5A4E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h11a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4Z" />
      <path d="M4 4v17" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
    </svg>
  );
}
