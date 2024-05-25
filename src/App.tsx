import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import TanstackProvider from "./providers/queryProvider";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

function App() {
  const router = createRouter({ routeTree, defaultPreload: "intent" });

  return (
    <>
      <div>
        <TanstackProvider>
          <NextUIProvider>
            <RouterProvider router={router} />
          </NextUIProvider>
        </TanstackProvider>
      </div>
    </>
  );
}

export default App;
