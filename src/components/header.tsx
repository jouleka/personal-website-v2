"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
const links = [
  { href: "#portfolio", label: "Work", count: "11" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <a
          href="#hero"
          className="wordmark"
          aria-label="Jurgen Leka, back to the top"
        >
          <Image
            className="brand-symbol"
            src="/logo-mark.svg"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span className="wordmark-name">
            Jurgen Leka
            <br />
            <small>Product engineer</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
              {link.count && <sup>{link.count}</sup>}
            </a>
          ))}
        </nav>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="resume-link"
        >
          Résumé <ArrowUpRight size={15} />
        </a>
        <button
          type="button"
          className="menu-toggle"
          ref={menuRef}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav page-width"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={20} />
          </a>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          Résumé <ArrowUpRight size={20} />
        </a>
      </nav>
    </header>
  );
}
