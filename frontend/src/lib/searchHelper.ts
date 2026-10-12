import { EquipmentItem } from "@/data/catalog";

// Synonyms map from PROKATEKA search queries core (P1, P2, colloquial & LSI names)
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  шлепног: ["трамбовк", "вибротрамбовк", "вибро"],
  шлепнога: ["трамбовк", "вибротрамбовк", "вибро"],
  виброног: ["трамбовк", "вибротрамбовк", "вибро"],
  вибронога: ["трамбовк", "вибротрамбовк", "вибро"],
  кузнечик: ["трамбовк", "вибротрамбовк", "вибро"],
  чабанк: ["трамбовк", "вибротрамбовк", "вибро"],
  чабанка: ["трамбовк", "вибротрамбовк", "вибро"],
  отбойник: ["молоток", "отбойн", "перфоратор"],
  отбойка: ["молоток", "отбойн"],
  бензогенератор: ["генератор"],
  дизельгенератор: ["генератор"],
  краскопульт: ["окрасочн", "покраск"],
  паркетошлифовальн: ["шлиф", "шлифовальн"],
  паркетошлифовальная: ["шлиф", "шлифовальн"],
  бензобур: ["мотобур", "бур"],
  пушк: ["теплова", "нагрев", "обогрев"],
  пушка: ["теплова", "нагрев", "обогрев"],
  помп: ["мотопомп", "насос"],
  помпа: ["мотопомп", "насос"],
  болгарк: ["ушм", "углов", "шлифмашин"],
  болгарка: ["ушм", "углов", "шлифмашин"],
  вышка: ["тур", "лес", "подъем"],
  тура: ["вышк", "тур", "лес"],
  леса: ["вышк", "тур", "лес", "подмост"],
  грязевая: ["мотопомп", "насос"],
  дренажная: ["мотопомп", "насос"],
  трамбовка: ["виброплит", "вибротрамбовк", "вибро"],
};

export function matchesEquipmentQuery(item: EquipmentItem, rawQuery: string): boolean {
  if (!rawQuery || !rawQuery.trim()) return true;

  const query = rawQuery.toLowerCase().trim();
  const searchTerms = [query];

  // Find synonym expansions
  for (const [key, synonyms] of Object.entries(SEARCH_SYNONYMS)) {
    if (query.includes(key) || key.includes(query)) {
      searchTerms.push(...synonyms);
    }
  }

  const nameRu = (item.name || "").toLowerCase();
  const nameKz = (item.nameKz || "").toLowerCase();
  const catRu = (item.category || "").toLowerCase();
  const catKz = (item.categoryKz || "").toLowerCase();
  const descRu = (item.description || "").toLowerCase();
  const descKz = (item.descriptionKz || "").toLowerCase();

  const specsText = (item.specs || [])
    .map((s) => `${s.key || ""} ${s.value || ""} ${s.keyKz || ""}`)
    .join(" ")
    .toLowerCase();

  return searchTerms.some((term) => {
    return (
      nameRu.includes(term) ||
      nameKz.includes(term) ||
      catRu.includes(term) ||
      catKz.includes(term) ||
      descRu.includes(term) ||
      descKz.includes(term) ||
      specsText.includes(term)
    );
  });
}
