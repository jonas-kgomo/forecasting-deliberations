import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-name">the Ground</p>
      <nav className="footer-nav" aria-label="Footer">
        <Link href="/questions">High-stakes questions</Link>
        <Link href="/biosecurity">Biosecurity</Link>
        <Link href="/field">Field recordings</Link>
        <Link href="/method">How a question is written</Link>
      </nav>
      <p className="footer-note">
        A floor for forecasting deliberation. Voices already here are composites, so the shape can be
        tried. Anything you add stays in this browser.
      </p>
    </footer>
  );
}
