import { useAuth } from "@/components/provider/AuthContext";
import { fetchSessionUser } from "@/controller/user.controller";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
    const { session } = useAuth();

    // If no session or user, we can return early or handle it as needed
    if (!session?.user) {
        return {
            data: null,
            error: null,
            isLoading: false,
            isError: false,
        };
    }

    return useQuery({
        queryKey: ["userProfile", session.user.id],
        queryFn: () => fetchSessionUser(session),
        enabled: !!session?.user.id, // Only fetch if user is authenticated
        retry: 1, // Retry once on failure
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes,
    });
}
