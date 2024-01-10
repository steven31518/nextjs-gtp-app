"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

type props = {
  children: React.ReactNode;
};
export default function Provider({ children }: props) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        //在SSR的狀態下，預設一個刷新時間，去避免預設0的狀態下，馬上重新發送請求
        queries: {
          staleTime: 1000 * 60,
        },
      },
    });
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      {children}
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}
