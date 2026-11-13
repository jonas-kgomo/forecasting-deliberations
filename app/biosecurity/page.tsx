import type { Metadata } from "next";
import { Directory } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { questions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Biosecurity",
  description: "Questions about whether someone can obtain, or worsen, a dangerous pathogen. They do not ask how.",
};

export default function BiosecurityPage() {
  return (
    <>
      <Header />
      <main id="content" className="sheet">
        <div className="wrap">
          <header className="mast">
            <h1>Biosecurity</h1>
            <p className="lede">
              Biosecurity here means stopping someone from getting a dangerous pathogen, or from
              making one worse. These questions ask whether that stop held. They do not ask how.
            </p>
          </header>
          <Directory questions={questions} initialView="biosecurity" />
        </div>
      </main>
      <Footer />
    </>
  );
}
