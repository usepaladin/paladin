"use client";

import { FCWC, Propless } from "@/lib/interface/interface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryClientWrapper: FCWC<Propless> = ({ children }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryClientWrapper;
