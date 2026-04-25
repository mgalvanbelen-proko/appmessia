export type BookEntry = {
  id: number;
  name: string;
  aliases: string[];
};

export const BIBLE_BOOKS: BookEntry[] = [
  { id: 1, name: "Génesis", aliases: ["genesis", "gn", "gen", "ge"] },
  { id: 2, name: "Éxodo", aliases: ["exodo", "ex", "exo"] },
  { id: 3, name: "Levítico", aliases: ["levitico", "lv", "lev", "le"] },
  { id: 4, name: "Números", aliases: ["numeros", "nm", "num", "nu"] },
  { id: 5, name: "Deuteronomio", aliases: ["dt", "deut", "deu"] },
  { id: 6, name: "Josué", aliases: ["josue", "jos"] },
  { id: 7, name: "Jueces", aliases: ["jue", "jc", "jdg"] },
  { id: 8, name: "Rut", aliases: ["rt", "ru"] },
  { id: 9, name: "1 Samuel", aliases: ["1samuel", "1sam", "1sa", "1s", "1 sam", "1 sa", "i samuel", "i sam"] },
  { id: 10, name: "2 Samuel", aliases: ["2samuel", "2sam", "2sa", "2s", "2 sam", "2 sa", "ii samuel", "ii sam"] },
  { id: 11, name: "1 Reyes", aliases: ["1reyes", "1re", "1r", "1 re", "i reyes"] },
  { id: 12, name: "2 Reyes", aliases: ["2reyes", "2re", "2r", "2 re", "ii reyes"] },
  { id: 13, name: "1 Crónicas", aliases: ["1cronicas", "1cron", "1cr", "1 cr", "i cronicas", "1 cronicas"] },
  { id: 14, name: "2 Crónicas", aliases: ["2cronicas", "2cron", "2cr", "2 cr", "ii cronicas", "2 cronicas"] },
  { id: 15, name: "Esdras", aliases: ["esd", "esr"] },
  { id: 16, name: "Nehemías", aliases: ["nehemias", "neh", "ne"] },
  { id: 17, name: "Ester", aliases: ["est", "es"] },
  { id: 18, name: "Job", aliases: ["jb"] },
  { id: 19, name: "Salmos", aliases: ["salmo", "sal", "sl", "sa", "sm", "psa", "ps"] },
  { id: 20, name: "Proverbios", aliases: ["prov", "pr", "pro"] },
  { id: 21, name: "Eclesiastés", aliases: ["eclesiastes", "ec", "ecl", "qo"] },
  { id: 22, name: "Cantares", aliases: ["cantar", "ct", "can", "cnt", "cantar de los cantares"] },
  { id: 23, name: "Isaías", aliases: ["isaias", "is", "isa"] },
  { id: 24, name: "Jeremías", aliases: ["jeremias", "jer", "jr"] },
  { id: 25, name: "Lamentaciones", aliases: ["lam", "la"] },
  { id: 26, name: "Ezequiel", aliases: ["ez", "eze"] },
  { id: 27, name: "Daniel", aliases: ["dn", "dan", "da"] },
  { id: 28, name: "Oseas", aliases: ["os", "ose", "ho"] },
  { id: 29, name: "Joel", aliases: ["jl", "joe", "jo"] },
  { id: 30, name: "Amós", aliases: ["amos", "am"] },
  { id: 31, name: "Abdías", aliases: ["abdias", "ab", "abd"] },
  { id: 32, name: "Jonás", aliases: ["jonas", "jon", "jn"] },
  { id: 33, name: "Miqueas", aliases: ["miq", "mi"] },
  { id: 34, name: "Nahúm", aliases: ["nahum", "nah", "na"] },
  { id: 35, name: "Habacuc", aliases: ["hab", "ha"] },
  { id: 36, name: "Sofonías", aliases: ["sofonias", "sof", "so"] },
  { id: 37, name: "Hageo", aliases: ["hag", "hg"] },
  { id: 38, name: "Zacarías", aliases: ["zacarias", "zac", "zc"] },
  { id: 39, name: "Malaquías", aliases: ["malaquias", "mal", "ml"] },
  { id: 40, name: "Mateo", aliases: ["mt", "mat"] },
  { id: 41, name: "Marcos", aliases: ["mc", "mar", "mr"] },
  { id: 42, name: "Lucas", aliases: ["lc", "luc", "lu"] },
  { id: 43, name: "Juan", aliases: ["jn", "ju", "jua"] },
  { id: 44, name: "Hechos", aliases: ["hch", "hec", "ac", "act"] },
  { id: 45, name: "Romanos", aliases: ["rom", "ro", "rm"] },
  { id: 46, name: "1 Corintios", aliases: ["1corintios", "1co", "1cor", "1 co", "i corintios", "1 cor"] },
  { id: 47, name: "2 Corintios", aliases: ["2corintios", "2co", "2cor", "2 co", "ii corintios", "2 cor"] },
  { id: 48, name: "Gálatas", aliases: ["galatas", "gal", "ga"] },
  { id: 49, name: "Efesios", aliases: ["ef", "efe", "eph"] },
  { id: 50, name: "Filipenses", aliases: ["fil", "flp", "fi", "ph", "phi"] },
  { id: 51, name: "Colosenses", aliases: ["col", "co"] },
  { id: 52, name: "1 Tesalonicenses", aliases: ["1tesalonicenses", "1tes", "1ts", "1 ts", "1 tes", "i tesalonicenses"] },
  { id: 53, name: "2 Tesalonicenses", aliases: ["2tesalonicenses", "2tes", "2ts", "2 ts", "2 tes", "ii tesalonicenses"] },
  { id: 54, name: "1 Timoteo", aliases: ["1timoteo", "1tim", "1ti", "1 ti", "1 tim", "i timoteo"] },
  { id: 55, name: "2 Timoteo", aliases: ["2timoteo", "2tim", "2ti", "2 ti", "2 tim", "ii timoteo"] },
  { id: 56, name: "Tito", aliases: ["tit", "tt"] },
  { id: 57, name: "Filemón", aliases: ["filemon", "flm", "phm", "phlm"] },
  { id: 58, name: "Hebreos", aliases: ["heb", "he"] },
  { id: 59, name: "Santiago", aliases: ["stg", "sant", "ja", "jas"] },
  { id: 60, name: "1 Pedro", aliases: ["1pedro", "1pe", "1p", "1 pe", "1 p", "i pedro"] },
  { id: 61, name: "2 Pedro", aliases: ["2pedro", "2pe", "2p", "2 pe", "2 p", "ii pedro"] },
  { id: 62, name: "1 Juan", aliases: ["1juan", "1jn", "1j", "1 jn", "1 j", "i juan"] },
  { id: 63, name: "2 Juan", aliases: ["2juan", "2jn", "2j", "2 jn", "2 j", "ii juan"] },
  { id: 64, name: "3 Juan", aliases: ["3juan", "3jn", "3j", "3 jn", "3 j", "iii juan"] },
  { id: 65, name: "Judas", aliases: ["jds", "jud"] },
  { id: 66, name: "Apocalipsis", aliases: ["ap", "apo", "apoc", "rev"] },
];

export const TRANSLATIONS = ["RV1960", "NVI", "NTV"] as const;
export type Translation = (typeof TRANSLATIONS)[number];

const TRANSLATION_LABELS: Record<Translation, string> = {
  RV1960: "Reina-Valera 1960",
  NVI: "Nueva Versión Internacional",
  NTV: "Nueva Traducción Viviente",
};

const TRANSLATION_SHORT: Record<Translation, string> = {
  RV1960: "RVR60",
  NVI: "NVI",
  NTV: "NTV",
};

export function translationShortLabel(t: Translation): string {
  return TRANSLATION_SHORT[t];
}

export function translationLabel(t: Translation): string {
  return TRANSLATION_LABELS[t];
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function findBook(name: string): BookEntry | null {
  const n = normalize(name);
  for (const book of BIBLE_BOOKS) {
    if (normalize(book.name) === n) return book;
    if (book.aliases.some((a) => normalize(a) === n)) return book;
  }
  return null;
}

export type ParsedReference = {
  book: BookEntry;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
};

/**
 * Parses references like:
 *   "Juan 3:16"           → John 3:16
 *   "Juan 3:16-18"        → John 3:16-18
 *   "Salmo 23"            → Psalms 23 (whole chapter)
 *   "1 Corintios 13:4-7"  → 1 Corinthians 13:4-7
 *   "1Co 13:4"            → 1 Corinthians 13:4
 */
export function parseReference(input: string): ParsedReference | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Match: optional leading number, book (letters/spaces), space, chapter[:verseStart[-verseEnd]]
  const m = trimmed.match(
    /^\s*((?:[123Ii]{1,3}\s*)?[A-Za-zÁÉÍÓÚáéíóúÑñ\.]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ\.]+)?)\s+(\d+)(?::(\d+)(?:\s*-\s*(\d+))?)?\s*$/u
  );
  if (!m) return null;

  const bookName = m[1];
  const chapter = parseInt(m[2], 10);
  const verseStart = m[3] ? parseInt(m[3], 10) : undefined;
  const verseEnd = m[4] ? parseInt(m[4], 10) : undefined;

  const book = findBook(bookName);
  if (!book) return null;
  if (!Number.isFinite(chapter) || chapter < 1) return null;

  return { book, chapter, verseStart, verseEnd };
}
