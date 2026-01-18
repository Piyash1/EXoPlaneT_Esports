import { PremiumSkeleton } from "@/components/ui/PremiumSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section Skeleton */}
      <div className="container mx-auto px-4 py-20 flex flex-col items-center space-y-8">
        <PremiumSkeleton
          variant="text"
          width={600}
          height={80}
          className="rounded-lg"
        />
        <PremiumSkeleton variant="text" width={400} height={24} />
        <div className="flex gap-4 pt-8">
          <PremiumSkeleton variant="button" width={160} />
          <PremiumSkeleton variant="button" width={160} />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <PremiumSkeleton variant="card" height={300} />
        <PremiumSkeleton variant="card" height={300} />
        <PremiumSkeleton variant="card" height={300} />
      </div>
    </div>
  );
}
