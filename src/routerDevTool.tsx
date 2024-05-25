import React, { lazy, Suspense } from "react";

export const TanStackRouterDevtools = () => {
  const LazyComponent =
    process.env.NODE_ENV === "production"
      ? () => null // Render nothing in production
      : lazy(() =>
          // Lazy load in development
          import("@tanstack/router-devtools").then((res) => ({
            default: res.TanStackRouterDevtools,
            // For Embedded Mode
            // default: res.TanStackRouterDevtoolsPanel
          }))
        );

  return (
    <Suspense>
      <LazyComponent />
    </Suspense>
  );
};
