import React, { useRef, useEffect } from 'react';
import { TabData } from './TabsSlider.types';

interface TabsHeaderProps {
  tabs: TabData[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export function TabsHeader({ tabs, activeTab, onTabClick }: TabsHeaderProps) {
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.children[activeTab] as HTMLElement;
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeTab]);

  return (
    <div
      ref={tabsContainerRef}
      className="flex overflow-x-auto scrollbar-hide gap-3 mb-10 snap-x snap-mandatory justify-center"
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(index)}
          className={`tab-pill snap-start flex-shrink-0 ${activeTab === index
            ? 'tab-pill-active'
            : 'tab-pill-default'
            }`}
        >
          <span className={`font-semibold ${activeTab === index ? 'text-gradient' : ''}`}>
            {tab.title}
          </span>
        </button>
      ))}
    </div>
  );
}
