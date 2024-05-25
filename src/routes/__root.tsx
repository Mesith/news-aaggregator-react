import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HeaderNav } from "../componants/HeaderNav";

export const Route = createRootRoute({
  component: () => (
    <div>
      <HeaderNav />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
