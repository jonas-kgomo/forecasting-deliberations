"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ForecastRating, Question } from "@/lib/types";
import { readForecasts, writeForecasts } from "@/lib/storage";

function gapLabel(withSystem: number, withoutSystem: number) {
  const gap = Math.abs(withSystem - withoutSystem);
  return `${gap} point${gap === 1 ? "" : "s"} between the two worlds`;
}

function Rating({
  who,
  outcome,
  withSystem,
  withoutSystem,
  sample,
}: {
  who: string;
  outcome: string;
  withSystem: number;
  withoutSystem: number;
  sample?: boolean;
}) {
  return (
    <article className="rating">
      <p className="qface-meta">{sample ? "Sample forecast" : who}</p>
      <p className="rating-outcome">{outcome}</p>
      <div className="rating-pair">
        <p>
          <strong>{withSystem}%</strong>
          <span>With the system in place</span>
        </p>
        <p>
          <strong>{withoutSystem}%</strong>
          <span>If it had not been there</span>
        </p>
      </div>
      <p className="expert-line">{gapLabel(withSystem, withoutSystem)}</p>
    </article>
  );
}

export function Forecast({ question }: { question: Question }) {
  const [ratings, setRatings] = useState<ForecastRating[]>([]);
  const [who, setWho] = useState("");
  const [outcome, setOutcome] = useState("");
  const [withSystem, setWithSystem] = useState(50);
  const [withoutSystem, setWithoutSystem] = useState(50);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setRatings(readForecasts()[question.slug] ?? []);
  }, [question.slug]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const claim = outcome.trim();
    if (claim.length < 8) {
      setError("Name the outcome in a sentence. Both ratings have to be about that same thing.");
      setStatus("");
      return;
    }
    const rating: ForecastRating = {
      id: crypto.randomUUID(),
      who: who.trim() || "An expert",
      outcome: claim,
      withSystem,
      withoutSystem,
    };
    const next = [rating, ...ratings];
    setRatings(next);
    writeForecasts(question.slug, next);
    setOutcome("");
    setError("");
    setStatus("Forecast added, in this browser.");
  }

  return (
    <section className="forecast" aria-labelledby="forecast-heading">
      <h2 id="forecast-heading">Rate the forecast</h2>
      <p className="composer-help">
        A counterfactual forecast is the same outcome in the world where this system was not there.
        Rate both. The gap is how much you think the system changes the chance. What people are
        seeing is what you compare it with. It is not a proof.
      </p>
      {question.sampleForecast ? (
        <Rating {...question.sampleForecast} who="Sample" sample />
      ) : null}
      {ratings.map((rating) => (
        <Rating key={rating.id} {...rating} />
      ))}
      <form className="forecast-form" onSubmit={onSubmit}>
        <div className="fields">
          <label>
            Name or role, if you want one
            <input value={who} onChange={(event) => setWho(event.target.value)} />
          </label>
          <label>
            The outcome
            <input
              value={outcome}
              onChange={(event) => setOutcome(event.target.value)}
              placeholder="One sentence. Both ratings use this."
              required
            />
          </label>
        </div>
        <label className="range">
          <span>With the system in place · {withSystem}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={withSystem}
            onChange={(event) => setWithSystem(Number(event.target.value))}
          />
        </label>
        <label className="range">
          <span>If it had not been there · {withoutSystem}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={withoutSystem}
            onChange={(event) => setWithoutSystem(Number(event.target.value))}
          />
        </label>
        <p className="expert-line">{gapLabel(withSystem, withoutSystem)}</p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <div className="composer-row">
          <button type="submit" className="submit">
            Put this forecast on the floor
          </button>
          <p className="composer-aside">No account. Saved in this browser only.</p>
        </div>
        <p className="status" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
