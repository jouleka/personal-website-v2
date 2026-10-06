import { ArrowUp, ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <span>Built by Jurgen. Probably tweaking it right now.</span>
          <div>
            <a
              href="https://github.com/jouleka"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/jurgen-leka-31470119a/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href="https://x.com/jou_leka" target="_blank" rel="noreferrer">
              X <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.instagram.com/jou_leka/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <a
          className="footer-name"
          href="#hero"
          aria-label="Jurgen Leka, back to the top"
        >
          Jurgen Leka<span>↗</span>
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jurgen Leka</span>
          <span>Europe · See you on the internet</span>
          <a href="#hero">
            Back to the top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
