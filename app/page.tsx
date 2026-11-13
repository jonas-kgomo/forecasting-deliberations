import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Mosaic } from "@/components/Mosaic";
import { Seeing } from "@/components/Seeing";
import { questions } from "@/lib/questions";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="content">
        <Mosaic />
        <section className="thesis">
          <h1>A question you can answer without learning the room.</h1>
          <p>
            Most civic rooms assume you already know how to speak in them. The Ground writes a
            question where the stake is a life, a wage, or a street, sets an expert&apos;s risk
            beside it, and leaves the floor open for what you are actually seeing.
          </p>
          <p>
            When the people closest to the risk cannot open a site, the record is made in person,
            with permission, and marked so anyone can tell.
          </p>
          <Link href="/questions" className="begin">
            Begin with the high-stakes questions
          </Link>
        </section>
        <Seeing questions={questions} />
      </main>
      <Footer />
    </>
  );
}
