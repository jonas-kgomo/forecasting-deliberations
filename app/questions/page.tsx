import type { Metadata } from "next";
import { Directory } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { questions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "High-stakes questions",
  description: "Questions where a wrong answer is a life, a wage, or a street. Written so anyone with something true to say can answer.",
};

export default function QuestionsPage() {
  return (
    <>
      <Header />
      <main id="content" className="sheet">
        <div className="wrap">
          <header className="mast">
            <h1>High-stakes questions</h1>
            <p className="lede">
              A wrong answer here is a life, a wage, or a street. Some of them ask whether AI help
              in a neighbourhood, or in a crisis, actually arrived. Begin with what you have seen.
            </p>
          </header>
          <Directory questions={questions} initialView="questions" />
        </div>
      </main>
      <Footer />
    </>
  );
}
