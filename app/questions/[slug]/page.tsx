import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuestionPager } from "@/components/QuestionPager";
import { Room } from "@/components/Room";
import { getQuestion, questions } from "@/lib/questions";

export function generateStaticParams() {
  return questions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) return { title: "Question" };
  return { title: question.title, description: question.ask };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) notFound();

  return (
    <>
      <Header />
      <main id="content" className="sheet">
        <div className="wrap">
          <Room question={question} />
          <QuestionPager questions={questions} current={question.slug} />
        </div>
      </main>
      <Footer />
    </>
  );
}
