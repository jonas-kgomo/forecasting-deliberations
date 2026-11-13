import Link from "next/link";

export function Mosaic() {
  return (
    <section className="stage" aria-label="Enter the floor">
      <div className="mosaic">
        <Link href="/questions" className="shape shape-questions">
          High-stakes questions
        </Link>
        <Link href="/method" className="shape shape-method">
          How it&apos;s written
        </Link>
        <Link href="/questions/cash-before-the-loss" className="shape shape-drones">
          Did the cash come first
        </Link>
        <Link href="/field" className="shape shape-field">
          Field
        </Link>
        <Link href="/questions" className="shape shape-enter">
          Enter the floor
        </Link>
        <Link href="/questions" className="shape shape-six">
          Thirteen questions open
        </Link>
        <Link href="/questions/warning-you-cannot-open" className="shape shape-warning">
          The missed flood
        </Link>
        <Link href="/method" className="shape shape-forecast">
          Forecasting deliberation
        </Link>
      </div>
    </section>
  );
}
