import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabData } from "./TabsSlider.types";
import { TabsHeader } from "./TabsHeader";
import { SliderNavigation } from "./SliderNavigation";

export * from "./TabsSlider.types";

interface TabsSliderProps {
  tabs: TabData[];
}

export function TabsSlider({ tabs }: TabsSliderProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentTab = tabs[activeTab];
  const totalSlides = currentTab.slides.length;

  const handleNext = () => {
    setDirection(1);
    if (activeSlide < totalSlides - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      const nextTab = (activeTab + 1) % tabs.length;
      setActiveTab(nextTab);
      setActiveSlide(0);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    } else {
      const prevTab = (activeTab - 1 + tabs.length) % tabs.length;
      setActiveTab(prevTab);
      setActiveSlide(tabs[prevTab].slides.length - 1);
    }
  };

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
    setActiveSlide(0);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-8">
      {/* Tabs Header */}
      <TabsHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      {/* Slide Content Area */}
      <div className="relative">
        <div className="w-full min-h-[490px] flex items-center justify-center relative">
          {/* Static Background layer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <AnimatePresence mode="wait">
              {currentTab.slides[activeSlide].image && (
                <motion.img
                  key={`${activeTab}-${activeSlide}-${currentTab.slides[activeSlide].image}`}
                  src={currentTab.slides[activeSlide].image}
                  alt={
                    currentTab.slides[activeSlide].title || "Slide Background"
                  }
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeTab}-${activeSlide}`}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                  delay: ["gs-s3", "gs-s8"].includes(
                    currentTab.slides[activeSlide].id,
                  )
                    ? 0.5
                    : 0,
                },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0 flex items-center justify-center p-0 bg-transparent pointer-events-none z-10"
            >
              <div className="relative w-full h-full mx-auto flex items-center justify-center pointer-events-auto">
                {currentTab.slides[activeSlide].content ? (
                  currentTab.slides[activeSlide].content
                ) : (
                  <div className="w-full max-w-2xl mx-auto text-center relative z-10 px-6">
                    {currentTab.slides[activeSlide].title && (
                      <h3 className="text-3xl font-bold text-black mb-6 tracking-tight">
                        {currentTab.slides[activeSlide].title}
                      </h3>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <SliderNavigation
        activeSlide={activeSlide}
        totalSlides={totalSlides}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
