import SimpleIconBox from "@/components/SimpleIconBox";

export function CapitalProvidersContent() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-6">
        <SimpleIconBox
          src="/icons/white/money-coins-white.svg"
          title="High Fixed Fees"
          subtitle="Make smaller, most in-demand loans economic"
        />
        <SimpleIconBox
          src="/icons/white/clock-white.svg"
          title="Slow Process"
          subtitle=">35-day completions"
        />
        <SimpleIconBox
          src="/icons/white/arrows-white.svg"
          title="Repeat Data Entry"
          subtitle="Enter same data for each lender application"
        />
        <SimpleIconBox
          src="/icons/white/eye-white-crossed.svg"
          title="Opaque"
          subtitle="Process lacks transparency, and consistency"
        />
      </div>
    </div>
  );
}

export function LendersContent() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-6">
        <SimpleIconBox
          src="/icons/white/money-coins-white.svg"
          title="High Fixed Fees 2"
          subtitle="Make smaller, most in-demand loans economic"
        />
        <SimpleIconBox
          src="/icons/white/clock-white.svg"
          title="Slow Process 2"
          subtitle=">35-day completions"
        />
        <SimpleIconBox
          src="/icons/white/arrows-white.svg"
          title="Repeat Data Entry 2"
          subtitle="Enter same data for each lender application"
        />
        <SimpleIconBox
          src="/icons/white/eye-white-crossed.svg"
          title="Opaque 2"
          subtitle="Process lacks transparency, and consistency"
        />
      </div>
    </div>
  );
}

export function BorrowersContent() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-6">
        <SimpleIconBox
          src="/icons/white/money-coins-white.svg"
          title="High Fixed Fees 3"
          subtitle="Make smaller, most in-demand loans economic"
        />
        <SimpleIconBox
          src="/icons/white/clock-white.svg"
          title="Slow Process 3"
          subtitle=">35-day completions"
        />
        <SimpleIconBox
          src="/icons/white/arrows-white.svg"
          title="Repeat Data Entry 3"
          subtitle="Enter same data for each lender application"
        />
        <SimpleIconBox
          src="/icons/white/eye-white-crossed.svg"
          title="Opaque3"
          subtitle="Process lacks transparency, and consistency"
        />
      </div>
    </div>
  );
}
