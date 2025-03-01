import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

import { useState } from "react";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <NuqsAdapter>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NuqsAdapter>
      </HydrationBoundary>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
