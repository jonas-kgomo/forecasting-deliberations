import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "How a question is written",
  description: "How a high-stakes question becomes plain enough for someone outside the field to answer.",
};

const steps = [
  {
    title: "Name the risk in one paragraph",
    body: "An expert writes what could go wrong, without the conference language. One paragraph. If it needs a literature review to be understood, it is not ready for the floor.",
  },
  {
    title: "Rewrite until an outsider can tell",
    body: "The question is rewritten until a person outside the field can tell whether they have seen the thing. If they cannot tell, it stays off the floor.",
  },
  {
    title: "Leave the floor open",
    body: "A sentence about a street is a complete contribution. There is no account to make, no credential to show, and no tone to perform.",
  },
  {
    title: "Go and ask, when the site cannot",
    body: "If the people closest to the risk cannot reach the site, because there is no connection, no device, or no reason to trust a form, someone goes and asks. The words are written down with permission and marked as recorded in person.",
  },
];

export default function MethodPage() {
  return (
    <>
      <Header />
      <main id="content" className="sheet">
        <article className="method">
          <header className="mast">
            <h1>How a question is written</h1>
            <p className="lede">
              The floor is for forecasting deliberation: an expert&apos;s risk, and the ground beside it.
            </p>
          </header>
          {steps.map((step, index) => (
            <section key={step.title} className="step">
              <p className="step-num">{index + 1}</p>
              <div>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </div>
            </section>
          ))}
          <section className="method-block">
            <h2>The part that stays hard</h2>
            <p>
              Some questions are still too far from a life to answer, even in a conversation. A
              recorder arriving does not make an abstract risk concrete. Start from the sound, the
              queue, the tap, the van. Connect it to the larger risk only in a sentence the speaker
              recognises as their own. If that sentence cannot be written, the question waits.
            </p>
          </section>
          <section className="method-block">
            <h2>Working with the IRC</h2>
            <p>
              The International Rescue Committee is already using AI in crisis. In public they describe
              cash released before a drought, a help desk that answers faster, a mentor for teachers on
              WhatsApp, and a phone that screens for disease. Their rule is that the system must not
              decide who receives aid, and that a person stays accountable. That is a claim a street
              can test.
            </p>
            <p>
              The questions on cash, the classroom, and the named door are written so they could be
              asked with the IRC, on a program, with the speaker&apos;s permission. They are not an IRC
              project. The voices on them are composites, so the shape can be tried. A real
              collaboration would replace those composites with records taken down in person, and would
              leave the IRC&apos;s own numbers beside what people actually received.
            </p>
            <p>
              <a href="https://www.rescue.org/article/how-irc-using-ai-reach-more-people-crisis">
                How the IRC is using AI to reach more people in crisis
              </a>
              {" · "}
              <a href="https://www.rescue.org/partner">Partner with the IRC</a>
            </p>
          </section>
          <section className="method-block">
            <h2>Who can read it</h2>
            <p>
              The floor is public. An expert can use it to see whether the risk they named is showing
              up in a street. A company working on the same question can read it too. The words stay
              attached to a place, and a field record includes the permission. It is a civic record
              that happens to be readable, including by people who build things.
            </p>
          </section>
          <section className="method-block">
            <h2>What you can do here</h2>
            <p>
              Open a question and write what you are seeing. If you have sat with someone and they
              agreed to have their words published, mark the contribution as someone else&apos;s words
              and write the permission in a sentence.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
