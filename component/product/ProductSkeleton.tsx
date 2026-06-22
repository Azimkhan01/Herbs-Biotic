"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[32px] bg-[#F2F3F4] p-6">
      {/* Badges */}
      <div className="mb-8 flex justify-center gap-3">
        <div className="h-8 w-20 rounded-full bg-gray-200" />
        <div className="h-8 w-28 rounded-full bg-gray-200" />
      </div>

      {/* Image */}
      <div className="flex items-center justify-center py-10">
        <div className="h-[220px] w-[180px] rounded-2xl bg-gray-200" />
      </div>

      {/* Title */}
      <div className="space-y-3">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
      </div>

      {/* Button */}
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-white px-3 py-3">
        <div className="h-5 w-28 rounded bg-gray-200" />
        <div className="h-10 w-10 rounded-full bg-gray-200" />
      </div>

      {/* Bottom Accent */}
      <div className="mt-4 h-1 w-full rounded-full bg-gray-200" />
    </div>
  );
}