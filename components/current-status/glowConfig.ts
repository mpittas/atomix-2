export const CURRENT_STATUS_GLOW_CONFIG = {
  maxLength: 20,
  maxOpacity: 1,
  travelDuration: 2,
  fadeInDuration: 0.9,
  fadeOutDuration: 0.9,
  repeatDelay: 1.5,
  startDelay: 0.3,
  color: "#68e9f5",
  strokeWidth: 2,
  blurPx: 6,
};

export const CURRENT_STATUS_GLOW_PATH_PROPS = {
  fill: "none",
  stroke: CURRENT_STATUS_GLOW_CONFIG.color,
  strokeWidth: CURRENT_STATUS_GLOW_CONFIG.strokeWidth,
  strokeLinecap: "round" as const,
  strokeDasharray: "9999 9999",
  strokeDashoffset: "9999",
  style: { filter: `blur(${CURRENT_STATUS_GLOW_CONFIG.blurPx}px)` },
  opacity: "0",
};
