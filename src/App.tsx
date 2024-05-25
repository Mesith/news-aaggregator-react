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
          <RouterProvider router={router} />
        </TanstackProvider>
      </div>
    </>
  );
}

export default App;
