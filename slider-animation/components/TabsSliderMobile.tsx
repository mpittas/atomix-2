import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabData } from "./TabsSlider.types";
import { TabsHeader } from "./TabsHeader";
import { SliderNavigation } from "./SliderNavigation";
import { Tooltip } from "./Tooltip";

interface TabsSliderMobileProps {
  tabs: TabData[];
}

export function TabsSliderMobile({ tabs }: TabsSliderMobileProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [slide1BgRunId, setSlide1BgRunId] = useState(0);
  const [slide1ZoomComplete, setSlide1ZoomComplete] = useState(false);
  const prevSlideRef = useRef(activeSlide);

  useEffect(() => {
    if (prevSlideRef.current !== 0 && activeSlide === 0) {
      setSlide1BgRunId((v) => v + 1);
    }
    prevSlideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    if (activeSlide !== 0) {
      setSlide1ZoomComplete(false);
    } else {
      setSlide1ZoomComplete(false);
    }
  }, [activeSlide, slide1BgRunId]);

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

  // --- CONFIG FOR SLIDE 1 BACKGROUND ANIMATION ---
  // Initial state when user lands on Slide 1
  const S1_INITIAL_SCALE = 1.1;
  const S1_INITIAL_X = -20;
  const S1_INITIAL_Y = 0;

  // Final state that it animates TO after 2 seconds on Slide 1
  const S1_FINAL_SCALE = 1.7;
  const S1_FINAL_X = -40;
  const S1_FINAL_Y = -20;
  const S1_SLIDE4_Y = -120;
  // -----------------------------------------------

  // We only run this separate slider logic for mobile.
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-6">
      {/* Tabs Header */}
      <TabsHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      {/* Mobile Slide Content Area */}
      <div className="relative">
        {/* Scaling down aspect ratio box with bounded overflow */}
        <div className="w-full aspect-[6/3] max-h-[80vh] flex items-center justify-center relative overflow-hidden bg-[#F9FAFB] border-4 border-light-grey rounded-[12px_12px_0_0] border-b-0">
          {/* Continuous Animated Background layer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${slide1BgRunId}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.img
                  initial={{
                    scale:
                      activeSlide === 0
                        ? S1_INITIAL_SCALE
                        : activeSlide === 1 ||
                            activeSlide === 2 ||
                            activeSlide === 3
                          ? S1_FINAL_SCALE
                          : 1,
                    x:
                      activeSlide === 0
                        ? S1_INITIAL_X
                        : activeSlide === 1 ||
                            activeSlide === 2 ||
                            activeSlide === 3
                          ? S1_FINAL_X
                          : 0,
                    y:
                      activeSlide === 0
                        ? S1_INITIAL_Y
                        : activeSlide === 1 || activeSlide === 2
                          ? S1_FINAL_Y
                          : activeSlide === 3
                            ? S1_SLIDE4_Y
                            : 0,
                  }}
                  animate={{
                    scale:
                      activeSlide === 0 ||
                      activeSlide === 1 ||
                      activeSlide === 2 ||
                      activeSlide === 3
                        ? S1_FINAL_SCALE
                        : 1,
                    y:
                      activeSlide === 0 ||
                      activeSlide === 1 ||
                      activeSlide === 2
                        ? S1_FINAL_Y
                        : activeSlide === 3
                          ? S1_SLIDE4_Y
                          : 0,
                    x:
                      activeSlide === 0 ||
                      activeSlide === 1 ||
                      activeSlide === 2 ||
                      activeSlide === 3
                        ? S1_FINAL_X
                        : 0,
                    objectPosition: activeSlide === 3 ? "0% 100%" : "0% 0%",
                  }}
                  transition={
                    activeSlide === 0
                      ? { duration: 1, delay: 0.5, ease: "easeInOut" }
                      : activeSlide === 3
                        ? { duration: 2, ease: "easeInOut" }
                        : { duration: 1, ease: "easeInOut" }
                  }
                  onAnimationComplete={() => {
                    if (activeSlide === 0) setSlide1ZoomComplete(true);
                  }}
                  src="/anim-get-started/mobile-image.svg"
                  alt="Mobile Background"
                  className={`w-full h-full ${activeSlide === 0 || activeSlide === 1 || activeSlide === 2 || activeSlide === 3 ? "object-cover" : "object-contain"} object-left-top origin-top-left`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeTab}-${activeSlide}`}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0 flex items-center justify-center p-0 bg-transparent pointer-events-none z-10"
            >
              <div className="relative w-full h-full mx-auto flex flex-col items-center justify-center p-4 pointer-events-auto">
                {currentTab.slides[activeSlide]?.content ? (
                  currentTab.slides[activeSlide].content
                ) : (
                  <div className="w-full max-w-sm mx-auto text-center relative z-10 px-6">
                    {currentTab.slides[activeSlide]?.title && (
                      <h3 className="text-2xl font-bold text-black mb-6 tracking-tight">
                        {currentTab.slides[activeSlide].title}
                      </h3>
                    )}
                  </div>
                )}

                {activeSlide === 0 && slide1ZoomComplete && (
                  <Tooltip
                    delay={0}
                    top="24%"
                    left="7%"
                    content="Borrowers begin their application with a short set of questions to receive an initial indicative offer."
                    direction="bottom"
                    lineToParentEdge
                    edgeOffsetY={60}
                    icon="fa-question-circle"
                    position="left"
                    maxWidth="500px"
                  />
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
