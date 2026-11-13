export type Stakes = "street" | "work" | "forecast";

export type Tag = "irc" | "humanitarian" | "biosecurity";

export type ForecastRating = {
  id: string;
  who: string;
  outcome: string;
  withSystem: number;
  withoutSystem: number;
};

export type Signal = {
  id: string;
  who: string;
  place: string;
  text: string;
  source: "platform" | "field";
  permission?: string;
  composite?: boolean;
};

export type Question = {
  slug: string;
  title: string;
  ask: string;
  distillation: string;
  stakes: Stakes;
  tags?: Tag[];
  sampleForecast?: { outcome: string; withSystem: number; withoutSystem: number };
  places: { name: string; x: number; y: number }[];
  cover: "drones" | "clinic" | "warning" | "line" | "water" | "street" | "cash" | "mentor" | "chat" | "hire" | "benefit" | "screen" | "bench";
  prompt: string;
  expert: { role: string; line: string; risk: string };
  signals: Signal[];
};

export const stakesFilters: { value: Stakes; label: string }[] = [
  { value: "street", label: "On your street" },
  { value: "work", label: "At your work" },
  { value: "forecast", label: "A forecast you cannot see" },
];

export function stakesLabel(stakes: Stakes) {
  return stakesFilters.find((item) => item.value === stakes)?.label ?? stakes;
}

export const tagFilters: { value: Tag; label: string }[] = [
  { value: "humanitarian", label: "Humanitarian" },
  { value: "irc", label: "IRC" },
  { value: "biosecurity", label: "Biosecurity" },
];

export function tagLabel(tag: Tag) {
  return tagFilters.find((item) => item.value === tag)?.label ?? tag;
}
