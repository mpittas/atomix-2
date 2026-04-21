const GLOW_COLOR = "#ddf7ff";
const GLOW_STROKE_WIDTH = 4;
const GLOW_BLUR = 10;

const STATIC_PATH_PROPS = {
  fill: "none",
  stroke: "#90abb3",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
};

const STATIC_GLOW_PROPS = {
  fill: "none",
  stroke: GLOW_COLOR,
  strokeWidth: GLOW_STROKE_WIDTH,
  strokeLinecap: "round" as const,
  style: { filter: `blur(${GLOW_BLUR}px)` },
  opacity: "0.0",
};

export default function CurrentStatusConnectorsV2() {
  return (
    <div className="flex min-h-[108px] w-full relative mx-auto bg-red-500/0">
      <div className="w-[440px] absolute left-[calc(50%+3px)] -translate-x-1/1">
        <svg
          viewBox="0 0 325 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
            {...STATIC_GLOW_PROPS}
          />
        </svg>
      </div>

      <div className="w-[167px] absolute left-[calc(50%+11px)] -translate-x-1/1 top-0 bottom-0">
        <svg
          viewBox="0 0 111 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            d="M109 2 V25 Q109 40 94 40 H17 Q2 40 2 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            d="M109 2 V25 Q109 40 94 40 H17 Q2 40 2 55 V78"
            {...STATIC_GLOW_PROPS}
          />
        </svg>
      </div>

      <div className="w-[440px] -ml-1 absolute right-[calc(50%+3px)] translate-x-1/1">
        <svg
          viewBox="0 0 325 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
            {...STATIC_GLOW_PROPS}
          />
        </svg>
      </div>

      <div className="w-[167px] absolute right-[calc(50%+11px)] translate-x-1/1 top-0 bottom-0">
        <svg
          viewBox="0 0 111 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            d="M2 2 V25 Q2 40 17 40 H94 Q109 40 109 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            d="M2 2 V25 Q2 40 17 40 H94 Q109 40 109 55 V78"
            {...STATIC_GLOW_PROPS}
          />
        </svg>
      </div>
    </div>
  );
}
