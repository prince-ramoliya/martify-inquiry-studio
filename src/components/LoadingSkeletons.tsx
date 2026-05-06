export const HeaderSkeleton = () => (
  <header className="sticky top-0 z-40 w-full bg-background border-b border-border/60" aria-hidden="true">
    <div className="container-page relative flex items-center justify-between h-16 md:h-20 gap-4 my-[8px]">
      <div className="lg:hidden h-11 w-11 rounded-full bg-muted skeleton-shimmer" />
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 h-12 w-32 rounded-lg bg-muted skeleton-shimmer" />
      <div className="hidden lg:block h-12 w-40 rounded-lg bg-muted skeleton-shimmer" />
      <div className="hidden lg:flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-20 rounded-full bg-muted skeleton-shimmer" />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-11 w-11 rounded-full bg-muted skeleton-shimmer" />
        <div className="hidden md:block h-11 w-11 rounded-full bg-muted skeleton-shimmer" />
      </div>
    </div>
  </header>
);

export const PageHeaderSkeleton = () => (
  <section className="relative bg-gradient-soft border-b border-border overflow-hidden" aria-hidden="true">
    <div className="container-page py-5 md:py-12 lg:py-20 relative">
      <div className="h-4 w-36 rounded-full bg-muted skeleton-shimmer mb-4" />
      <div className="h-8 md:h-12 lg:h-16 w-10/12 max-w-3xl rounded-xl bg-muted skeleton-shimmer" />
      <div className="hidden md:block mt-5 h-5 w-7/12 max-w-2xl rounded-full bg-muted skeleton-shimmer" />
    </div>
  </section>
);

export const FirstSectionSkeleton = () => (
  <section className="py-10 md:py-20 lg:py-24 bg-background" aria-hidden="true">
    <div className="container-page">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-10">
        <div className="space-y-3 w-full max-w-xl">
          <div className="h-3 w-28 rounded-full bg-muted skeleton-shimmer" />
          <div className="h-8 md:h-11 w-9/12 rounded-xl bg-muted skeleton-shimmer" />
        </div>
        <div className="h-5 w-16 md:w-32 rounded-full bg-muted skeleton-shimmer" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl md:rounded-3xl bg-card shadow-card">
            <div className="aspect-square bg-muted skeleton-shimmer" />
            <div className="p-3 md:hidden space-y-2">
              <div className="h-4 w-8/12 rounded-full bg-muted skeleton-shimmer" />
              <div className="h-3 w-5/12 rounded-full bg-muted skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const RouteSkeleton = () => (
  <div className="min-h-screen bg-background text-foreground">
    <HeaderSkeleton />
    <PageHeaderSkeleton />
    <FirstSectionSkeleton />
  </div>
);