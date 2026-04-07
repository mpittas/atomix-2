"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button as DefButton } from "@/components/ui";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About Atomix", href: "/about" },
    { name: "The Platform", href: "/platform" },
    { name: "Resources", href: "/resources" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

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
                    className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
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
