export default function CurrentStatusConnectors() {
  return (
    <div className="flex min-h-[72px] relative ">
      <div className="w-[360px] ">
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
            d="M 2 78 L 2 55 Q 2 40 17 40 L 308 40 Q 323 40 323 25 L 323 2"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="w-[167px] absolute left-[215px] top-0 bottom-0">
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
            d="M 2 78 L 2 55 Q 2 40 17 40 L 94 40 Q 109 40 109 25 L 109 2"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="w-[360px] -ml-1">
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
            d="M 323 78 L 323 55 Q 323 40 308 40 L 17 40 Q 2 40 2 25 L 2 2"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="w-[167px] absolute right-[215px] top-0 bottom-0">
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
            d="M 109 78 L 109 55 Q 109 40 94 40 L 17 40 Q 2 40 2 25 L 2 2"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
