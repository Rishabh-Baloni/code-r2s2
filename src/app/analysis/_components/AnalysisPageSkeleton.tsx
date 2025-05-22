const AnalyzeCodeSkeleton = () => (
  <div className="bg-[#1e1e2e]/80 rounded-xl border border-[#313244]/50 p-6 max-w-md mx-auto animate-pulse">
    <div className="mb-4">
      <div className="w-40 h-7 bg-gray-800 rounded-lg mb-6" />
      {/* Four options as pill buttons */}
      <div className="flex flex-wrap gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-gray-800 rounded-full flex items-center justify-center min-w-[130px]"
            style={{animationDelay: `${i * 120}ms`}}
          />
        ))}
      </div>
    </div>
  </div>
);

export default AnalyzeCodeSkeleton;
