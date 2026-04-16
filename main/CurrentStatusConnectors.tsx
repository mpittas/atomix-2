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
            className="status-connector-path"
            d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
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
            className="status-connector-path"
            d="M109 2 V25 Q109 40 94 40 H17 Q2 40 2 55 V78"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
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
            className="status-connector-path"
            d="M2 2 V25 Q2 40 17 40 H94 Q109 40 109 55 V78"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
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
            className="status-connector-path"
            d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
