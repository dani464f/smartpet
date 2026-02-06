"use client";

import { usePathname } from "next/navigation";

const steps = [
  { path: "/d", label: "Discover" },
  { path: "/pre-sales", label: "Learn" },
  { path: "/sp", label: "Shop" },
  { path: "/op", label: "Checkout" },
  { path: "/qd", label: "Done" },
];

export function FunnelProgress() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex((s) => s.path === pathname);

  return (
    <nav
      aria-label="Funnel progress"
      className="max-w-md mx-auto py-4 px-4"
    >
      <ol className="flex items-center justify-between text-xs text-text-muted">
        {steps.map((step, i) => {
          const isActive = i === currentIndex;
          const isComplete = i < currentIndex;
          return (
            <li
              key={step.path}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : isComplete
                      ? "border-accent bg-accent text-white"
                      : "border-border bg-white text-text-muted"
                }`}
              >
                {isComplete ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={isActive ? "font-semibold text-text" : ""}>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
