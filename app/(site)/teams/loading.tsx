import { PremiumSkeleton } from "@/components/ui/PremiumSkeleton";

export default function TeamsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <PremiumSkeleton variant="text" width={250} height={40} />
          <PremiumSkeleton variant="text" width={400} height={20} />
        </div>
        <PremiumSkeleton variant="button" width={180} />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PremiumSkeleton key={i} variant="card" height={380} />
        ))}
      </div>
    </div>
  );
}
