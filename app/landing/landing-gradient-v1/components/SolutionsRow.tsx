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
        <div className="col-span-1 bg-red-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-orange-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-yellow-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-teal-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-indigo-500 h-32 rounded-lg"></div>
        <div className="col-span-1 bg-pink-500 h-32 rounded-lg"></div>
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
