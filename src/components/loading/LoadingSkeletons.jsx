import { Skeleton } from "@/components/ui/skeleton";
import Container from "../container/Container";

function AppShellSkeleton() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="fixed left-10 right-10 top-0 z-50 rounded-4xl border border-border bg-bg-card/70 backdrop-blur-md">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
          </div>
        </Container>
      </header>

      <main className="pt-28">
        <Container>
          <div className="flex flex-col gap-14 py-12 md:py-16">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)]">
              <div className="flex flex-col gap-5">
                <Skeleton className="h-4 w-24 bg-bg-secondary" />
                <Skeleton className="h-16 w-full max-w-2xl bg-bg-secondary" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-24 bg-bg-secondary" />
                  <Skeleton className="h-3 w-3 rounded-full bg-bg-secondary" />
                  <Skeleton className="h-3 w-20 bg-bg-secondary" />
                </div>
                <Skeleton className="h-5 w-full max-w-2xl bg-bg-secondary" />
                <Skeleton className="h-5 w-5/6 max-w-2xl bg-bg-secondary" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-44 rounded-full bg-bg-secondary" />
                  <Skeleton className="h-12 w-40 rounded-full bg-bg-secondary" />
                </div>
              </div>
              <Skeleton className="aspect-[4/3] w-full rounded-[32px] bg-bg-secondary" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-bg-card/90 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
      <Skeleton className="aspect-[16/11] w-full rounded-none bg-bg-secondary" />
      <div className="flex flex-col gap-5 p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-24 bg-bg-secondary" />
          <Skeleton className="h-3 w-3 rounded-full bg-bg-secondary" />
          <Skeleton className="h-3 w-20 bg-bg-secondary" />
        </div>
        <Skeleton className="h-8 w-4/5 bg-bg-secondary" />
        <Skeleton className="h-5 w-full bg-bg-secondary" />
        <Skeleton className="h-5 w-11/12 bg-bg-secondary" />
        <div className="flex items-center justify-between border-t border-border/80 pt-4">
          <Skeleton className="h-4 w-28 bg-bg-secondary" />
          <Skeleton className="size-10 rounded-full bg-bg-secondary" />
        </div>
      </div>
    </div>
  );
}

function PostGridSkeleton({
  count = 6,
  titleWidth = "w-64",
  showSummary = true,
}) {
  return (
    <Container>
      <div className="flex flex-col gap-12 py-12 md:py-16">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-3 w-28 bg-bg-secondary" />
          <Skeleton className={`h-12 ${titleWidth} bg-bg-secondary`} />
          {showSummary ? (
            <Skeleton className="h-5 w-32 bg-bg-secondary" />
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

function HomeSkeleton() {
  return (
    <div className="w-full">
      <section className="overflow-hidden py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)]">
            <div className="order-2 flex flex-col gap-5 md:order-1">
              <Skeleton className="h-4 w-24 bg-bg-secondary" />
              <Skeleton className="h-16 w-full max-w-2xl bg-bg-secondary" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-24 bg-bg-secondary" />
                <Skeleton className="h-3 w-3 rounded-full bg-bg-secondary" />
                <Skeleton className="h-3 w-20 bg-bg-secondary" />
              </div>
              <Skeleton className="h-5 w-full max-w-2xl bg-bg-secondary" />
              <Skeleton className="h-5 w-5/6 max-w-2xl bg-bg-secondary" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-44 rounded-full bg-bg-secondary" />
                <Skeleton className="h-12 w-40 rounded-full bg-bg-secondary" />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <Skeleton className="aspect-[4/3] w-full rounded-[32px] bg-bg-secondary" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <PostGridSkeleton count={6} titleWidth="w-80" showSummary={false} />
      </section>
    </div>
  );
}

function PostDetailsSkeleton() {
  return (
    <article className="pb-16 md:pb-24">
      <Skeleton className="aspect-[21/8] w-full rounded-none" />

      <Container>
        <div className="relative z-10 mx-auto -mt-16 max-w-4xl md:-mt-20">
          <div className="rounded-[32px] border border-border bg-bg-card px-6 py-8 md:px-10 md:py-12">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              <Skeleton className="h-9 w-36 rounded-full bg-bg-secondary" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-24 bg-bg-secondary" />
                <Skeleton className="h-3 w-3 rounded-full bg-bg-secondary" />
                <Skeleton className="h-3 w-20 bg-bg-secondary" />
              </div>
              <Skeleton className="h-14 w-4/5 bg-bg-secondary" />
              <div className="flex flex-col gap-4">
                <Skeleton className="h-4 w-full bg-bg-secondary" />
                <Skeleton className="h-4 w-full bg-bg-secondary" />
                <Skeleton className="h-4 w-11/12 bg-bg-secondary" />
                <Skeleton className="h-4 w-5/6 bg-bg-secondary" />
                <Skeleton className="h-4 w-full bg-bg-secondary" />
                <Skeleton className="h-4 w-4/5 bg-bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

function AuthFormSkeleton() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-border bg-bg-card p-6 shadow-2xl md:p-10">
        <div className="mb-6 flex justify-center">
          <Skeleton className="h-16 w-32 bg-bg-secondary" />
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="mx-auto h-9 w-48 bg-bg-secondary" />
          <Skeleton className="mx-auto h-5 w-56 bg-bg-secondary" />
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <Skeleton className="h-12 w-full bg-bg-secondary" />
          <Skeleton className="h-12 w-full bg-bg-secondary" />
          <Skeleton className="h-12 w-full bg-bg-secondary" />
          <Skeleton className="h-12 w-full bg-bg-secondary" />
        </div>
      </div>
    </div>
  );
}

function PostFormSkeleton() {
  return (
    <div className="rounded-[28px] border border-border bg-bg-card p-4 md:p-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-5 md:col-span-2">
          <Skeleton className="h-12 w-full bg-bg-secondary" />
          <Skeleton className="h-12 w-full bg-bg-secondary" />
          <Skeleton className="h-72 w-full bg-bg-secondary" />
        </div>

        <div className="flex flex-col gap-5">
          <Skeleton className="h-12 w-full bg-bg-secondary" />
          <Skeleton className="aspect-[4/3] w-full rounded-lg bg-bg-secondary" />
          <Skeleton className="h-12 w-full bg-bg-secondary" />
          <Skeleton className="h-12 w-full bg-bg-secondary" />
        </div>
      </div>
    </div>
  );
}

export {
  AppShellSkeleton,
  AuthFormSkeleton,
  HomeSkeleton,
  PostCardSkeleton,
  PostDetailsSkeleton,
  PostFormSkeleton,
  PostGridSkeleton,
};
