import { NextRequest } from "next/server";
import {
  parseReference,
  TRANSLATIONS,
  Translation,
  translationLabel,
  translationShortLabel,
} from "@/lib/bible-books";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BollsVerse = {
  pk: number;
  verse: number;
  text: string;
};

function cleanText(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref") ?? "";
  const translationParam = (searchParams.get("translation") ?? "RV1960") as Translation;

  if (!TRANSLATIONS.includes(translationParam)) {
    return Response.json(
      { error: `Traducción no soportada. Usá una de: ${TRANSLATIONS.join(", ")}.` },
      { status: 400 }
    );
  }

  const parsed = parseReference(ref);
  if (!parsed) {
    return Response.json(
      {
        error:
          "No pude entender la referencia. Probá con algo como \"Juan 3:16\" o \"Salmos 23\".",
      },
      { status: 400 }
    );
  }

  const url = `https://bolls.life/get-text/${translationParam}/${parsed.book.id}/${parsed.chapter}/`;

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 },
    });
  } catch {
    return Response.json({ error: "No pude conectar con la fuente bíblica. Probá de nuevo." }, { status: 502 });
  }

  if (!upstream.ok) {
    return Response.json(
      { error: `Error de la fuente bíblica (${upstream.status}).` },
      { status: 502 }
    );
  }

  let data: BollsVerse[];
  try {
    data = (await upstream.json()) as BollsVerse[];
  } catch {
    return Response.json({ error: "Respuesta inesperada de la fuente bíblica." }, { status: 502 });
  }

  if (!Array.isArray(data) || data.length === 0) {
    return Response.json(
      { error: `No encontré ${parsed.book.name} ${parsed.chapter} en ${translationShortLabel(translationParam)}.` },
      { status: 404 }
    );
  }

  let verses = data;
  if (parsed.verseStart !== undefined) {
    const end = parsed.verseEnd ?? parsed.verseStart;
    verses = data.filter((v) => v.verse >= parsed.verseStart! && v.verse <= end);
    if (verses.length === 0) {
      return Response.json(
        { error: "No encontré esos versículos en ese capítulo." },
        { status: 404 }
      );
    }
  }

  const reference =
    parsed.verseStart !== undefined
      ? parsed.verseEnd && parsed.verseEnd !== parsed.verseStart
        ? `${parsed.book.name} ${parsed.chapter}:${parsed.verseStart}-${parsed.verseEnd}`
        : `${parsed.book.name} ${parsed.chapter}:${parsed.verseStart}`
      : `${parsed.book.name} ${parsed.chapter}`;

  return Response.json({
    reference,
    translation: translationParam,
    translationLabel: translationLabel(translationParam),
    translationShort: translationShortLabel(translationParam),
    verses: verses.map((v) => ({ verse: v.verse, text: cleanText(v.text) })),
  });
}
