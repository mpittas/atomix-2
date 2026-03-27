import IconBox from "@/components/IconBox";

function IconText({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={icon} alt="" className="w-10 h-10" />
      <p className="text-md font-semibold text-white text-center">{text}</p>
    </div>
  );
}

function SquareBadge({ text }: { text: string }) {
  return (
    <div className="w-full px-3 py-2 border border-dashed border-[#999fc7] rounded-md text-center text-sm text-white font-bold bg-[#565e98]">
      {text}
    </div>
  );
}

export default function SolutionsRow() {
  return (
    <div className="w-full space-y-0">
      {/* Row 1: 1 col / 4 cols / 1 col */}
      <div className="grid grid-cols-6 gap-4">
        {/* COLUMN 1 */}
        <div className="bg-blue-500/0 col-span-1 flex flex-col items-center gap-y-3">
          <IconText icon="/icons/white/ai-chip.svg" text="AI" />
          <div className="h-18 w-1 border-l border-dashed border-[#999fc7] mx-auto"></div>
        </div>

        {/* COLUMN 2 */}
        <div className="bg-purple-500/0 col-span-4 flex flex-col items-center gap-y-3">
          <IconText
            icon="/icons/white/brain-links.svg"
            text="Complex Reasoning"
          />

          <img
            src="/global/conecting-lins-to-t.svg"
            alt="Connecting dashed lines"
            className="h-18 mx-auto"
          />
        </div>

        {/* COLUMN 3 */}
        <div className="bg-green-500/0 col-span-1 flex flex-col items-center gap-y-3">
          <IconText icon="/icons/white/blockchain.svg" text="Blockchain" />
          <div className="h-18 w-1 border-l border-dashed border-white/70 mx-auto"></div>
        </div>
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
        <div className="bg-cyan-500/0 col-span-4 flex flex-col items-center">
          <img
            src="/global/conecting-lins-to-b.svg"
            alt="Connecting dashed lines"
            className="h-18 mx-auto"
          />

          <SquareBadge text="Full automation end-to-end" />
        </div>
        <div className="bg-violet-500/0 col-span-1 flex flex-col items-center">
          <div className="h-18 w-1 border-l border-dashed border-white/70 mx-auto"></div>
          <SquareBadge text="Collaboration" />
        </div>
        <div className="bg-emerald-500/0 col-span-1 flex flex-col items-center">
          <div className="h-18 w-1 border-l border-dashed border-white/70 mx-auto"></div>
          <SquareBadge text="Trust" />
        </div>
      </div>
    </div>
  );
}
