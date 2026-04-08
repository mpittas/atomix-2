import React from 'react';

interface SliderNavigationProps {
  activeSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

interface NavButtonProps {
  onClick: () => void;
  icon: string;
  label: string;
}

function NavButton({ onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-light-grey shadow-[0_6px_12px_-2px_rgba(17,24,39,0.06)] text-text-grey hover:text-black transition-all"
      aria-label={label}
    >
      <i className={`fas ${icon} text-[12px]`}></i>
    </button>
  );
}

export function SliderNavigation({
  activeSlide,
  totalSlides,
  onNext,
  onPrev,
}: SliderNavigationProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <NavButton
        onClick={onPrev}
        icon="fa-chevron-left"
        label="Previous slide"
      />

      <div className="flex items-center gap-1 text-xs font-normal text-text-grey">
        <span className="font-bold text-black">{activeSlide + 1}</span>
        <span>/</span>
        <span>{totalSlides}</span>
      </div>

      <NavButton
        onClick={onNext}
        icon="fa-chevron-right"
        label="Next slide"
      />
    </div>
  );
}
