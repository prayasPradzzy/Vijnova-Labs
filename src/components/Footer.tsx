import Link from "next/link";
import { LogoMark } from "./Navigation";

const link = "text-mist transition-colors hover:text-bone text-sm";

export function Footer() {
  return (
    <footer className="w-full overflow-hidden border-t border-bone/10 bg-ink pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <Link href="/" className="mb-6 flex items-center gap-3 text-bone">
              <LogoMark />
              <span className="font-display text-2xl tracking-tight">Vijnova Labs</span>
            </Link>
            <p className="text-sm leading-relaxed text-mist">
              Designing the next generation of organisational intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="mb-2 font-medium text-bone">Navigation</h4>
              <Link href="/" className={link}>Home</Link>
              <Link href="#product" className={link}>Product</Link>
              <Link href="#how-we-build" className={link}>How We Build</Link>
              <Link href="#research" className={link}>Research</Link>
              <Link href="#about" className={link}>About</Link>
              <a href="mailto:hello@vijnova.com" className={link}>Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="mb-2 font-medium text-bone">Connect</h4>
              <a href="https://linkedin.com/company/vijnovalabs" target="_blank" rel="noopener noreferrer" className={link}>LinkedIn</a>
              <a href="mailto:hello@vijnova.com" className={link}>Email</a>
              <a href="#research" className={link}>Blog / Research</a>
              <a href="#" className={link}>Careers (future)</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="mb-2 font-medium text-bone">Legal</h4>
              <Link href="#" className={link}>Privacy Policy</Link>
              <Link href="#" className={link}>Terms of Service</Link>
              <Link href="#" className={link}>Cookie Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mist">
          <p>© {new Date().getFullYear()} Vijnova Labs. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      <div aria-hidden className="select-none text-center font-display font-light leading-[0.8] tracking-[-0.04em] text-[clamp(5rem,23vw,22rem)] translate-y-[12%] bg-gradient-to-b from-bone/[0.12] to-transparent bg-clip-text text-transparent">
        Vijnova
      </div>
    </footer>
  );
}
