import type { Metadata } from "next";
import { Directory } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { questions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Field recordings",
  description: "Records taken down in person, with permission, from people the site itself cannot reach.",
};

export default function FieldPage() {
  return (
    <>
      <Header />
      <main id="content" className="sheet">
        <div className="wrap">
          <header className="mast">
            <h1>Field</h1>
            <p className="lede">
              Records taken down in person, with permission, from people the site itself cannot
              reach.
            </p>
          </header>
          <Directory questions={questions} initialView="field" />
        </div>
      </main>
      <Footer />
    </>
  );
}
