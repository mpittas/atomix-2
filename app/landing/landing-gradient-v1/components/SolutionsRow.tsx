import IconBox from "@/components/IconBox";

export default function SolutionsRow() {
  return (
    <div className="w-full space-y-4">
      {/* Row 1: 1 col / 4 cols / 1 col */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1 bg-blue-500 h-32 rounded-lg"></div>
        <div className="col-span-4 bg-purple-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-green-500 h-32 rounded-lg"></div>
      </div>

      {/* Row 2: 1 col / 1 col / 1 col / 1 col / 1 col / 1 col */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <IconBox
            src="/icons/white/document-check.svg"
            imageSize="small"
            title="Rule first architecture"
            description={
              <div className="flex flex-col gap-y-2">
                <div>Uses AI to build loan products</div>
                <div>The system builds optimal workflows automatically</div>
              </div>
            }
            className="!p-4"
          />
        </div>
        <div className="col-span-1">
          <IconBox
            src="/icons/white/puzzle-piece.svg"
            imageSize="small"
            title="Composable logic blocks"
            description="Adapts to any loan type or complexity without developer involvement"
            className="!p-4"
          />
        </div>
        <div className="col-span-1">
          <IconBox
            src="/icons/white/target-arrow.svg"
            imageSize="small"
            title="Goal-driven reasoning"
            description="Adjusts underwriting strategies in real time, delivering the most efficient route to a viable loan"
            className="!p-4"
          />
        </div>
        <div className="col-span-1">
          <IconBox
            src="/icons/white/shield-check-white.svg"
            imageSize="small"
            title="Automated policy enforcement"
            description="Credit rules are reliably automatically enforced, ensuring every loan complies"
            className="!p-4"
          />
        </div>
        <div className="col-span-1">
          <IconBox
            src="/icons/white/users-group.svg"
            imageSize="small"
            title="Unified workspace"
            description="All stakeholders collaborate in real time with live loan status visible to all"
            className="!p-4"
          />
        </div>
        <div className="col-span-1">
          <IconBox
            src="/icons/white/dolcument-search.svg"
            imageSize="small"
            title="Blockchain audit layer"
            description="Immutable record of every decision for trust-less verification"
            className="!p-4"
          />
        </div>
      </div>

      {/* Row 3: 4 cols / 1 col / 1 col */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 bg-cyan-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-violet-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-emerald-500 h-32 rounded-lg"></div>
      </div>
    </div>
  );
}
