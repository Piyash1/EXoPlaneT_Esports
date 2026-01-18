import { PremiumSkeleton } from "@/components/ui/PremiumSkeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <PremiumSkeleton variant="text" width={200} height={32} />
          <PremiumSkeleton variant="text" width={300} height={16} />
        </div>
        <div className="flex gap-2">
          <PremiumSkeleton variant="button" width={120} />
          <PremiumSkeleton variant="button" width={40} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <PremiumSkeleton key={i} variant="card" height={140} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PremiumSkeleton variant="card" height={400} />
          <PremiumSkeleton variant="card" height={300} />
        </div>
        <div className="space-y-6">
          <PremiumSkeleton variant="card" height={200} />
          <PremiumSkeleton variant="card" height={500} />
        </div>
      </div>
    </div>
  );
}
