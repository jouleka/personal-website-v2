import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Underline } from "./ink";

const socials = [
  { label: "GitHub", href: "https://github.com/jouleka", color: "ink" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jurgen-leka-31470119a/", color: "sky" },
  { label: "X", href: "https://x.com/jou_leka", color: "paper" },
  { label: "Instagram", href: "https://www.instagram.com/jou_leka/", color: "bubble" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-width">
        <div className="footer__top">
          <p className="footer__sign">
            Thanks for scrolling all the way down.
            <br />
            <Underline color="var(--sun)">See you on the internet.</Underline>
          </p>
          <ul className="footer__socials">
            {socials.map((s, i) => (
              <li key={s.label} style={{ rotate: `${i % 2 ? 3 : -3}deg` }}>
                <a className={`sticker sticker--${s.color}`} href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a className="footer__name" href="#hero" aria-label="Jurgen Leka, back to the top">
          Jurgen Leka
        </a>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Jurgen Leka</span>
          <span>Drawn by hand, shipped by code. Probably tweaking it right now.</span>
          <a href="#hero">
            Back to the top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
