import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="content" className="missing">
        <div>
          <h1>That page is off the floor.</h1>
          <p>
            <Link href="/questions" className="begin">
              Back to the questions
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
