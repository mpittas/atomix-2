"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export interface Tab {
  id: string;
  label: string;
  content: string;
}

export interface DefTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

const DefTabs: React.FC<DefTabsProps> = ({
  tabs,
  defaultTab,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultTab || (tabs.length > 0 ? tabs[0].id : ""),
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [activeTab], scope: contentRef },
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`w-full flex flex-col gap-y-6 ${className}`}>
      <div className="flex justify-center items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-6 py-2 rounded-full text-white font-normal transition-all duration-200 bg-transparent border border-dashed border-[#B3B9EC]/60 ${
              activeTab === tab.id
                ? "bg-linear-to-r from-[#565E98] to-[#7A80AE] font-semibold"
                : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div ref={contentRef} className="text-white/80">
        {activeTabContent}
      </div>
    </div>
  );
};

export default DefTabs;
