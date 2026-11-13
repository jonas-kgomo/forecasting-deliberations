"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/questions", label: "High-stakes questions" },
  { href: "/biosecurity", label: "Biosecurity" },
  { href: "/field", label: "Field recordings" },
  { href: "/method", label: "How a question is written" },
];

export function Header({ tone = "field" }: { tone?: "field" | "night" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="header" data-tone={tone} data-open={open}>
      <button
        className="burger"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
        <span className="wordmark-the">the</span>
        <span className="wordmark-name">Ground</span>
      </Link>
      {open ? (
        <nav className="menu" aria-label="Pages">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="menu-link" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <p className="menu-note">
            A wrong answer is a life, a wage, or a street. Written so anyone with something true to say can answer.
          </p>
        </nav>
      ) : null}
    </header>
  );
}
