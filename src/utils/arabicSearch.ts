/**
 * Normalizes Arabic text by removing diacritics (tashkeel),
 * tatweel, and normalizing different forms of alef, yaa, and taa marbuta.
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';

  return text
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    // Remove Tatweel (kashida)
    .replace(/\u0640/g, '')
    // Normalize Alef forms
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbuta
    .replace(/ة/g, 'ه')
    // Normalize Yaa / Alef Maksura
    .replace(/ى/g, 'ي')
    // Remove extra spaces and lowercase (for latin words)
    .trim()
    .toLowerCase();
}

/**
 * Checks if search query is found in target text using normalized Arabic matching
 */
export function matchArabic(target: string | undefined | null, query: string): boolean {
  if (!target || !query) return false;
  const normalizedTarget = normalizeArabicText(target);
  const normalizedQuery = normalizeArabicText(query);
  return normalizedTarget.includes(normalizedQuery);
}
