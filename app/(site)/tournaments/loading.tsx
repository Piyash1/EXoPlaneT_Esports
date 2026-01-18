import { PremiumSkeleton } from "@/components/ui/PremiumSkeleton";

export default function TournamentsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
        <div className="flex justify-center">
          <PremiumSkeleton variant="text" width={400} height={56} />
        </div>
        <div className="flex justify-center">
          <PremiumSkeleton variant="text" width={300} height={20} />
        </div>
      </div>

      {/* Featured Tournament */}
      <PremiumSkeleton variant="card" height={400} className="mb-12" />

      {/* Tournament List */}
      <div className="space-y-6">
        <PremiumSkeleton variant="text" width={200} height={32} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <PremiumSkeleton key={i} variant="card" height={340} />
          ))}
        </div>
      </div>
    </div>
  );
}
