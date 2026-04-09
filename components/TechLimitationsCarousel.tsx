"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaShieldVirus,
  FaBoxOpen,
  FaServer,
  FaTimeline,
  FaLock,
  FaBuildingColumns,
  FaLinkSlash,
  FaTriangleExclamation,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

const iconBoxes = [
  {
    icon: <FaRobot className="h-10 w-10" />,
    title: "Task-level automation leaves underwriters reviewing everything",
    description: "Costs stay high, scaling still requires hiring",
  },
  {
    icon: <FaShieldVirus className="h-10 w-10" />,
    title: "AI cannot guarantee compliance",
    description:
      "a 1% error rate means thousands of non-compliant loans, with no audit trail",
  },
  {
    icon: <FaBoxOpen className="h-10 w-10" />,
    title: "Black-box reasoning fails audit requirements",
    description: "No traceable logic, no decision trail, no accountability",
  },
  {
    icon: <FaServer className="h-10 w-10" />,
    title:
      "Legacy systems are expensive to configure and impossible to adapt quickly",
    description:
      "New products and rule changes require developers, long lead times and significant cost",
  },
  {
    icon: <FaTimeline className="h-10 w-10" />,
    title: "No process orchestration",
    description:
      "Existing systems cannot ensure the right parties verify the right documents at the right time",
  },
  {
    icon: <FaLock className="h-10 w-10" />,
    title: "Existing tech cannot enforce capital provider criteria",
    description:
      "Lenders cannot demonstrate compliance, blocking access to institutional funding",
  },
  {
    icon: <FaBuildingColumns className="h-10 w-10" />,
    title:
      "No existing platform enforces end-to-end compliance or connects lenders to capital at scale",
    description: "",
  },
  {
    icon: <FaLinkSlash className="h-10 w-10" />,
    title:
      "Incumbents lack the blockchain layer and regulatory architecture needed to unlock secondary liquidity",
    description: "",
  },
  {
    icon: <FaTriangleExclamation className="h-10 w-10" />,
    title: "The root cause is infrastructure, not intent",
    description:
      "Legacy systems were never designed to handle the volume, complexity or transparency this market demands",
  },
];

export default function TechLimitationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(iconBoxes.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="py-36">
      <DefHeading
        theme="light"
        badgeText=""
        showBadge={false}
        title="Why Existing Technology Falls Short"
        description="The problem is structural — and so is the Atomix solution."
      />

      <div className="relative mt-16 w-full max-w-[1200px] mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden py-16 px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {iconBoxes
                .slice(
                  currentIndex * itemsPerSlide,
                  (currentIndex + 1) * itemsPerSlide,
                )
                .map((box, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <IconBox
                      icon={box.icon}
                      title={box.title}
                      description={box.description}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
