"use client";

import { FC, useState, useEffect, ReactElement } from "react";
import { Leaf } from "lucide-react";

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const Header: FC<HeaderProps> = ({
  onLoginClick,
  onRegisterClick,
}): ReactElement => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background border-b border-muted-foreground/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 text-left"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="w-4 h-4 text-background" />
          </div>
          <span className="text-lg font-semibold text-emerald-900">
            WattTipid
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("works")}
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("testimonials")}
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            Testimonials
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onLoginClick}
            className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={onRegisterClick}
            className="bg-primary hover:bg-primary/80 text-background px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};
