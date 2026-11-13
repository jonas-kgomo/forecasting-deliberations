import Link from "next/link";
import type { Question, Signal } from "@/lib/types";
import { tagLabel } from "@/lib/types";

export function QuestionCard({ question, signal }: { question: Question; signal?: Signal }) {
  const quote = signal ?? question.signals[0];
  const field = signal ? signal.source === "field" : question.signals.some((item) => item.source === "field");
  const place = signal ? signal.place : question.places.map((item) => item.name).join(" · ");
  const voices = question.signals.length;

  return (
    <article className="qcard" data-topic={question.stakes}>
      <Link href={signal ? `/questions/${question.slug}#${signal.id}` : `/questions/${question.slug}`} className="qcard-link">
        <div className="qface">
          <p className="qface-meta">
            {signal ? question.title : place}
            {field ? " · In person" : ""}
            {question.tags?.length ? ` · ${question.tags.map(tagLabel).join(" · ")}` : ""}
          </p>
          <h2>{signal ? place : question.title}</h2>
        </div>
        <div className="qcard-body">
          <p className="quote">{quote?.text}</p>
          <p className="expert-line">{signal ? signal.who : question.expert.line}</p>
          <p className="qface-meta">
            {signal ? "Field record" : `${voices} ${voices === 1 ? "voice" : "voices"}`}
          </p>
          <span className="qcard-go">Open question</span>
        </div>
      </Link>
    </article>
  );
}
