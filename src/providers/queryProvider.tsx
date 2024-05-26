"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const TanstackProvider = ({
  queryClient,
  children,
}: {
  queryClient: QueryClient;
  children: React.ReactNode;
}) => {
  //const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
};

export default TanstackProvider;
