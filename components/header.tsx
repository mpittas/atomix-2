"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button as DefButton } from "@/components/ui";

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About Atomix", href: "#def-hero-main" },
    { name: "The Platform", href: "#tech-limitations" },
    { name: "Resources", href: "#info-rows" },
    { name: "Careers", href: "#why-work-with-us" },
    { name: "Contact Us", href: "#use-cases" },
  ];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: targetElement,
          offsetY: 80,
          autoKill: false,
        },
        ease: "power3.inOut",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white">
      <div>
        <nav>
          <div className="flex py-6 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <Image
                  src="/logo/atomix-logo-symbol-dark.svg"
                  alt="Atomix"
                  width={40}
                  height={40}
                  className="h-10 w-auto hidden lg:block"
                />
                <Image
                  src="/logo/atomix-logo-symbol-simple-dark.svg"
                  alt="Atomix"
                  width={40}
                  height={40}
                  className="h-10 w-auto visible lg:hidden"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              <div className="flex gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-md font-normal text-gray-900 hover:text-gray-700 transition-colors py-2"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <DefButton>Book a demo</DefButton>
            </div>

            {/* Mobile Menu Button + CTA */}
            <div className="flex md:hidden items-center gap-3">
              <DefButton>Book a demo</DefButton>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-gray-900"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
