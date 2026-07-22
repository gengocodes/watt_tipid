import { FC, ReactElement } from "react";
import { Leaf } from "lucide-react";

export const FooterSection: FC = (): ReactElement => {
  return (
    <footer className="bg-muted border-t border-muted-foreground/10 pt-16 pb-8 text-muted-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-background" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-emerald-900">
                WattTipid
              </span>
            </div>
            <p className="text-xs md:text-sm max-w-xs leading-relaxed">
              AI-powered energy advisor for Filipino households. Save on your
              VECO bill while reducing your carbon footprint.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-wider">
              PRODUCT
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#works"
                  className="hover:text-primary transition-colors"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-wider">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-muted-foreground">
              <li>
                <a
                  href="https://www.linkedin.com/in/paulemmanuelcorsino/"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xxs md:text-xs text-muted-foreground/50 font-base">
          <p className="text-center md:text-left leading-relaxed">
            © 2026 WattTipid. A Web-Based GenAI Energy Consumption Advisory
            System for Filipino Households.
          </p>
          <div className="flex gap-4 shrink-0">
            Beta Version
          </div>
        </div>
      </div>
    </footer>
  );
};
