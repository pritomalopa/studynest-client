const SkeletonCard = () => (
  <div className="index-card flex flex-col h-full overflow-hidden">
    <div className="h-40 w-full rounded-t-2xl skeleton" />
    <div className="p-4 flex flex-col gap-3">
      <div className="h-4 w-20 rounded-full skeleton" />
      <div className="h-4 w-full rounded skeleton" />
      <div className="h-3 w-3/4 rounded skeleton" />
      <div className="h-9 w-full rounded-full skeleton mt-2" />
    </div>
  </div>
);

export default SkeletonCard;
