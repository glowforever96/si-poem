import { Skeleton } from "./skeleton";

export default function SkeletonHistory() {
  return (
    <div className="flex flex-col gap-2 mt-6 flex-1 min-h-0">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton key={idx} className="h-[110px] w-full rounded-xl" />
      ))}
    </div>
  );
}
