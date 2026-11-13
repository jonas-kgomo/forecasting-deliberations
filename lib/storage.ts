import type { ForecastRating, Signal } from "./types";

const KEY = "ground-signals";

function isSignal(value: unknown): value is Signal {
  if (!value || typeof value !== "object") return false;
  const signal = value as Partial<Signal>;
  return (
    typeof signal.id === "string" &&
    typeof signal.text === "string" &&
    typeof signal.place === "string" &&
    typeof signal.who === "string" &&
    (signal.source === "platform" || signal.source === "field")
  );
}

export function readLocal(): Record<string, Signal[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const result: Record<string, Signal[]> = {};
    for (const [slug, list] of Object.entries(parsed)) {
      if (Array.isArray(list)) result[slug] = list.filter(isSignal);
    }
    return result;
  } catch {
    return {};
  }
}

export function writeLocal(slug: string, signals: Signal[]) {
  const all = readLocal();
  all[slug] = signals;
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

const FORECAST_KEY = "ground-forecasts";

function isRating(value: unknown): value is ForecastRating {
  if (!value || typeof value !== "object") return false;
  const rating = value as Partial<ForecastRating>;
  return (
    typeof rating.id === "string" &&
    typeof rating.who === "string" &&
    typeof rating.outcome === "string" &&
    typeof rating.withSystem === "number" &&
    typeof rating.withoutSystem === "number"
  );
}

export function readForecasts(): Record<string, ForecastRating[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(FORECAST_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const result: Record<string, ForecastRating[]> = {};
    for (const [slug, list] of Object.entries(parsed)) {
      if (Array.isArray(list)) result[slug] = list.filter(isRating);
    }
    return result;
  } catch {
    return {};
  }
}

export function writeForecasts(slug: string, ratings: ForecastRating[]) {
  const all = readForecasts();
  all[slug] = ratings;
  window.localStorage.setItem(FORECAST_KEY, JSON.stringify(all));
}
