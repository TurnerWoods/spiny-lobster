import { Skeleton } from "@/components/ui/skeleton";

interface TreatmentCardSkeletonProps {
  count?: number;
}

const TreatmentCardSkeleton = () => {
  return (
    <div className="bg-soft-linen">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content skeleton */}
      <div className="flex items-start justify-between p-6 sm:p-8">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const TreatmentGridSkeleton = ({ count = 6 }: TreatmentCardSkeletonProps) => {
  return (
    <div className="grid gap-px bg-neutral-gray/20 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <TreatmentCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Dashboard treatment card skeleton
const DashboardTreatmentSkeleton = () => {
  return (
    <div className="rounded-xl border border-pure-white/40 bg-pure-white/80 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="hidden sm:block h-8 w-28 rounded-full" />
          <Skeleton className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

const DashboardTreatmentListSkeleton = ({ count = 3 }: TreatmentCardSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <DashboardTreatmentSkeleton key={index} />
      ))}
    </div>
  );
};

// Quick action card skeleton for dashboard
const QuickActionSkeleton = () => {
  return (
    <div className="rounded-xl border border-pure-white/40 bg-pure-white/80 p-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

const QuickActionsGridSkeleton = ({ count = 4 }: TreatmentCardSkeletonProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <QuickActionSkeleton key={index} />
      ))}
    </div>
  );
};

export {
  TreatmentCardSkeleton,
  TreatmentGridSkeleton,
  DashboardTreatmentSkeleton,
  DashboardTreatmentListSkeleton,
  QuickActionSkeleton,
  QuickActionsGridSkeleton,
};
