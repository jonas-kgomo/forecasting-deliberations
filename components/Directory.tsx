"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Question, Signal, Tag } from "@/lib/types";
import { stakesFilters, tagFilters } from "@/lib/types";
import { readLocal } from "@/lib/storage";
import { QuestionCard } from "./QuestionCard";

type View = "questions" | "field" | "biosecurity";

export function Directory({
  questions,
  initialView,
}: {
  questions: Question[];
  initialView: View;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [stakes, setStakes] = useState("");
  const [tag, setTag] = useState<"" | Tag>("");
  const [place, setPlace] = useState("");
  const [local, setLocal] = useState<Record<string, Signal[]>>({});

  useEffect(() => {
    setLocal(readLocal());
  }, []);

  const withLocal = useMemo(
    () =>
      questions.map((question) => ({
        ...question,
        signals: [...(local[question.slug] ?? []), ...question.signals],
      })),
    [questions, local],
  );

  const filtered = withLocal.filter((question) => {
    if (stakes && question.stakes !== stakes) return false;
    if (tag && !question.tags?.includes(tag)) return false;
    if (place && !question.places.some((item) => item.name === place)) return false;
    if (initialView === "field" && !question.signals.some((signal) => signal.source === "field")) return false;
    if (initialView === "biosecurity" && !question.tags?.includes("biosecurity")) return false;
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    const blob = [
      question.title,
      question.ask,
      question.distillation,
      question.expert.risk,
      ...question.places.map((item) => item.name),
      ...question.signals.map((signal) => `${signal.text} ${signal.who} ${signal.place}`),
    ]
      .join(" ")
      .toLowerCase();
    return blob.includes(needle);
  });

  const fieldCards = filtered.flatMap((question) =>
    question.signals
      .filter((signal) => signal.source === "field")
      .filter((signal) => {
        const needle = query.trim().toLowerCase();
        if (!needle) return true;
        return `${signal.text} ${signal.who} ${signal.place} ${question.title}`.toLowerCase().includes(needle);
      })
      .map((signal) => ({ question, signal })),
  );

  const visibleSignals =
    initialView === "field"
      ? fieldCards.map((card) => card.signal)
      : filtered.flatMap((question) => question.signals);

  const tiles = new Map<string, { name: string; count: number }>();
  for (const question of filtered) {
    const relevant =
      initialView === "field"
        ? question.signals.filter((signal) => signal.source === "field")
        : question.signals;
    for (const item of question.places) {
      const count = relevant.filter((signal) => signal.place === item.name).length;
      if (!count) continue;
      const existing = tiles.get(item.name);
      if (existing) existing.count += count;
      else tiles.set(item.name, { name: item.name, count });
    }
  }

  const sections = stakesFilters
    .map((topic) => ({
      ...topic,
      questions: filtered.filter((question) => question.stakes === topic.value),
      fields: fieldCards.filter((card) => card.question.stakes === topic.value),
    }))
    .filter((topic) => (initialView === "field" ? topic.fields.length > 0 : topic.questions.length > 0));

  function clearFilters() {
    setQuery("");
    setStakes("");
    setTag("");
    setPlace("");
  }

  const voiceCount = visibleSignals.length;
  const filtersActive = Boolean(query || stakes || tag || place);

  return (
    <div>
      <div className="toolbar">
        <div className="toggle-row">
          <button
            type="button"
            className={initialView === "questions" ? "toggle is-on" : "toggle"}
            aria-pressed={initialView === "questions"}
            onClick={() => router.push("/questions")}
          >
            Questions
          </button>
          <button
            type="button"
            className={initialView === "field" ? "toggle is-on" : "toggle"}
            aria-pressed={initialView === "field"}
            onClick={() => router.push("/field")}
          >
            Field voices
          </button>
          <button
            type="button"
            className={initialView === "biosecurity" ? "toggle is-on" : "toggle"}
            aria-pressed={initialView === "biosecurity"}
            onClick={() => router.push("/biosecurity")}
          >
            Biosecurity
          </button>
        </div>
        <p className="count-pill">
          {voiceCount} {voiceCount === 1 ? "voice" : "voices"} on the ground
        </p>
      </div>
      <div className="place-board">
        {Array.from(tiles.values())
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tile) => (
          <button
            key={tile.name}
            type="button"
            className="place-tile"
            data-active={place === tile.name}
            aria-pressed={place === tile.name}
            onClick={() => setPlace((current) => (current === tile.name ? "" : tile.name))}
          >
            <span className="place-count">
              {tile.count} {tile.count === 1 ? "voice" : "voices"}
            </span>
            <span className="place-name">{tile.name}</span>
          </button>
        ))}
      </div>

      <div className="filters">
        <label className="search-label">
          <span className="sr-only">Search by place or words</span>
          <input
            className="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by place or words"
            type="search"
          />
        </label>
        <label className="select-label">
          <span className="sr-only">Stakes</span>
          <select className="select" value={stakes} onChange={(event) => setStakes(event.target.value)} aria-label="Stakes">
            <option value="">Stakes</option>
            {stakesFilters.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="select-label">
          <span className="sr-only">Tag</span>
          <select className="select" value={tag} onChange={(event) => setTag(event.target.value as "" | Tag)} aria-label="Tag">
            <option value="">Tag</option>
            {tagFilters.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="credit">
        Sample floor. Voices already here are composites, so you can try the shape. What you add stays in this browser.
      </p>

      {initialView !== "field" && filtered.length === 0 ? (
        <Empty onClear={clearFilters} filtersActive={filtersActive} noun="question" />
      ) : null}
      {initialView === "field" && fieldCards.length === 0 ? (
        <Empty onClear={clearFilters} filtersActive={filtersActive} noun="field record" />
      ) : null}

      {sections.map((topic) => (
        <section key={topic.value} className="dir-topic" aria-labelledby={`dir-${topic.value}`}>
          <h2 id={`dir-${topic.value}`}>{topic.label}</h2>
          <div className="grid">
            {initialView === "field"
              ? topic.fields.map(({ question, signal }) => (
                  <QuestionCard key={signal.id} question={question} signal={signal} />
                ))
              : topic.questions.map((question) => <QuestionCard key={question.slug} question={question} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function Empty({
  onClear,
  filtersActive,
  noun,
}: {
  onClear: () => void;
  filtersActive: boolean;
  noun: string;
}) {
  return (
    <div className="empty">
      <p>No {noun} matches.</p>
      {filtersActive ? (
        <button type="button" className="text-button" onClick={onClear}>
          Clear filters
        </button>
      ) : null}
    </div>
  );
}
