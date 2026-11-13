import Link from "next/link";
import type { Question } from "@/lib/types";
import { stakesFilters, tagLabel } from "@/lib/types";

export function Seeing({ questions }: { questions: Question[] }) {
  return (
    <section className="seeing" aria-labelledby="voices-heading">
      <h2 id="voices-heading">What people are seeing</h2>
      <div className="topic-row">
        {stakesFilters.map((topic) => {
          const group = questions.filter((question) => question.stakes === topic.value);
          return (
            <section key={topic.value} className="topic" aria-labelledby={`topic-${topic.value}`}>
              <h3 id={`topic-${topic.value}`}>{topic.label}</h3>
              <div className="topic-cluster" data-topic={topic.value}>
                {group.map((question) => (
                  <Link key={question.slug} href={`/questions/${question.slug}`} className="topic-canvas">
                    <span className="topic-face">
                      <span className="topic-title">{question.title}</span>
                      <span className="topic-places">
                        {question.places.map((place) => place.name).join(" · ")}
                        {question.tags?.length ? ` · ${question.tags.map(tagLabel).join(" · ")}` : ""}
                      </span>
                    </span>
                    {question.signals.slice(0, 2).map((signal) => (
                      <span key={signal.id} className="topic-note">
                        {signal.text}
                      </span>
                    ))}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
