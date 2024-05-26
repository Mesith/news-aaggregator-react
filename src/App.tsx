import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import TanstackProvider from "./providers/queryProvider";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: "intent",
  });

  return (
    <>
      <div>
        <TanstackProvider queryClient={queryClient}>
          <NextUIProvider>
            <RouterProvider router={router} />
          </NextUIProvider>
        </TanstackProvider>
      </div>
    </>
  );
}

export default App;
