"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button as DefButton } from "@/components/ui";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    {
      name: "Archived",
      children: [
        { name: "Orb With Cards", href: "/archived/orb-with-cards" },
        { name: "Liquid Ether", href: "/archived/liquid-ether" },
        { name: "Light Pillar", href: "/archived/light-pillar" },
        { name: "Light Rays", href: "/archived/light-rays" },
        { name: "Aurora", href: "/archived/aurora" },
        { name: "Dot Grid", href: "/archived/dot-grid" },
        { name: "Soft Aurora", href: "/archived/soft-aurora" },
      ],
    },
    {
      name: "Landing",
      children: [
        { name: "Landing White", href: "/landing/landing-white" },
        { name: "Landing Gradient V1", href: "/landing/landing-gradient-v1" },
        { name: "Landing Gradient V2", href: "/landing/landing-gradient-v2" },
      ],
    },
    {
      name: "Testing",
      children: [
        { name: "Hero Animation Test", href: "/testing/hero-animation-test" },
      ],
    },
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
              <div className="flex gap-6">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-md font-normal text-hray-900 hover:text-gray-900 transition-colors py-2">
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === link.name && (
                      <div className="absolute top-full left-0 pt-2 z-10">
                        <div className="w-56 bg-white rounded-xl border border-gray-200 py-2">
                          {link.children.map((child) => (
                            <a
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.name ? null : link.name,
                        )
                      }
                      className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.name && (
                      <div className="mt-2 ml-4 flex flex-col gap-2">
                        {link.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
