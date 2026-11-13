"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { Question, Signal } from "@/lib/types";
import { stakesLabel, tagLabel } from "@/lib/types";
import { readLocal, writeLocal } from "@/lib/storage";
import { Forecast } from "@/components/Forecast";

export function Room({ question }: { question: Question }) {
  const [extra, setExtra] = useState<Signal[]>([]);
  const [who, setWho] = useState("");
  const [place, setPlace] = useState(question.places[0]?.name ?? "");
  const [text, setText] = useState("");
  const [field, setField] = useState(false);
  const [permission, setPermission] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const stored = readLocal()[question.slug] ?? [];
    setExtra(stored);
  }, [question.slug]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ block: "center" });
  }, [extra.length]);

  const signals = [...extra, ...question.signals];
  const hasField = signals.some((signal) => signal.source === "field");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const words = text.trim();
    const where = place.trim();
    const consent = permission.trim();
    if (!where) {
      setError("Add the place. A city or a neighbourhood is enough.");
      setStatus("");
      return;
    }
    if (words.length < 8) {
      setError("Write what you are seeing. One sentence is enough.");
      setStatus("");
      return;
    }
    if (field && consent.length < 12) {
      setError("Say how permission was given. If you cannot, leave the words off the floor.");
      setStatus("");
      return;
    }

    const signal: Signal = {
      id: crypto.randomUUID(),
      who: who.trim() || (field ? "Speaker" : "A neighbour"),
      place: where,
      text: words,
      source: field ? "field" : "platform",
      permission: field ? consent : undefined,
      composite: false,
    };
    const next = [signal, ...extra];
    setExtra(next);
    writeLocal(question.slug, next);
    setText("");
    setPermission("");
    setError("");
    setStatus("Added to this question, in this browser.");
  }

  return (
    <article className="room">
      <Link href="/questions" className="back">
        All high-stakes questions
      </Link>
      <header className="mast">
        <h1>{question.title}</h1>
        <p className="lede">{question.ask}</p>
      </header>
      <p className="distill">{question.distillation}</p>
      <ul className="room-stamps">
        <li>{stakesLabel(question.stakes)}</li>
        {question.places.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
        {question.tags?.map((tag) => (
          <li key={tag} data-tag={tag}>
            {tagLabel(tag)}
          </li>
        ))}
      </ul>
      {question.tags?.includes("irc") ? (
        <p className="tag-note">
          This case is drawn from a program the IRC has described in public. The voices are
          composites. They are not an IRC record.
        </p>
      ) : null}
      {question.tags?.includes("biosecurity") ? (
        <p className="tag-note">
          Biosecurity here means keeping a dangerous pathogen from being obtained or made worse. This
          question does not ask how.
        </p>
      ) : null}

      <div className="room-grid">
        <section className="expert" aria-labelledby="expert-heading">
          <p className="eyebrow">Sample expert</p>
          <h2 id="expert-heading">What an expert is watching</h2>
          <p className="expert-role">{question.expert.role}</p>
          <p>{question.expert.risk}</p>
        </section>
        <section aria-labelledby="seen-heading">
          <h2 id="seen-heading" className="seen-heading">
            What people are seeing
          </h2>
          {hasField ? (
            <p className="field-note">
              Some of these words were taken down in person, with permission. A login was not how those speakers reached the floor.
            </p>
          ) : null}
          <div className="signal-list">
            {signals.map((signal) => (
              <article key={signal.id} id={signal.id} className="signal" data-fresh={!signal.composite}>
                <p className="quote">{signal.text}</p>
                <p className="signal-meta">
                  <span>{signal.who}</span>
                  <span>{signal.place}</span>
                  <span>{signal.source === "field" ? "Recorded in person" : "On the floor"}</span>
                  <span>{signal.composite ? "Sample" : "In this browser"}</span>
                </p>
                {signal.permission ? <p className="permission">{signal.permission}</p> : null}
              </article>
            ))}
          </div>
        </section>
      </div>

      <Forecast question={question} />

      <form className="composer" onSubmit={onSubmit}>
        <h2>What are you seeing?</h2>
        <p className="composer-help">
          You do not need the expert&apos;s words. A street, a sound, a queue, or a tap is enough.
        </p>
        <div className="fields">
          <label>
            First name or role, if you want one
            <input value={who} onChange={(event) => setWho(event.target.value)} autoComplete="given-name" />
          </label>
          <label>
            Place
            <input
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              required
              autoComplete="off"
            />
          </label>
        </div>
        <label>
          What you are seeing
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={4}
            placeholder={question.prompt}
            required
          />
        </label>
        <label className="check">
          <input type="checkbox" checked={field} onChange={(event) => setField(event.target.checked)} />
          <span>I am putting someone else&apos;s words on the floor</span>
        </label>
        {field ? (
          <label>
            Permission
            <textarea
              value={permission}
              onChange={(event) => setPermission(event.target.value)}
              rows={3}
              placeholder="How you asked, and what they agreed you could publish."
            />
          </label>
        ) : null}
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <div className="composer-row">
          <button type="submit" className="submit">
            Put this on the floor
          </button>
          <p className="composer-aside">No account. Saved in this browser only.</p>
        </div>
        <p className="status" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </article>
  );
}
