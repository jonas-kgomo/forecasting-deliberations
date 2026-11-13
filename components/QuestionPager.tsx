import Link from "next/link";
import type { Question } from "@/lib/types";
import { stakesFilters, tagLabel } from "@/lib/types";

export function QuestionPager({ questions, current }: { questions: Question[]; current: string }) {
  const index = questions.findIndex((question) => question.slug === current);
  const count = questions.length;
  const prev = questions[(index - 1 + count) % count];
  const next = questions[(index + 1) % count];

  return (
    <nav className="pager" aria-label="Other questions">
      <div className="pager-move">
        <Link href={`/questions/${prev.slug}`} className="pager-step">
          <span>Previous</span>
          <strong>{prev.title}</strong>
        </Link>
        <p>
          {index + 1} of {count}
        </p>
        <Link href={`/questions/${next.slug}`} className="pager-step pager-step-next">
          <span>Next</span>
          <strong>{next.title}</strong>
        </Link>
      </div>
      <div className="pager-rail">
        {stakesFilters.map((topic) => {
          const group = questions.filter((question) => question.stakes === topic.value);
          return (
            <section key={topic.value} className="pager-group" aria-labelledby={`pager-${topic.value}`}>
              <h2 id={`pager-${topic.value}`}>{topic.label}</h2>
              <div className="pager-strip">
                {group.map((question) => (
                  <Link
                    key={question.slug}
                    href={`/questions/${question.slug}`}
                    className="pager-card"
                    data-topic={topic.value}
                    aria-current={question.slug === current ? "page" : undefined}
                  >
                    <span className="pager-title">{question.title}</span>
                    <span className="pager-place">
                      {question.places.map((place) => place.name).join(" · ")}
                      {question.tags?.length ? ` · ${question.tags.map(tagLabel).join(" · ")}` : ""}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </nav>
  );
}
