import { useAuth } from "@/components/provider/AuthContex";
import { useQuery } from "@tanstack/react-query";

async function fetchUserProfile(userId: string, accessToken: string) {
    //todo: Connect with Core Service
    const response = await fetch(``, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return response.json();
}

export function useUserProfile() {
    const { session } = useAuth();

    return useQuery({
        queryKey: ["userProfile", session?.user.id],
        queryFn: () =>
            fetchUserProfile(session!.user.id, session!.access_token),
        enabled: !!session?.user.id, // Only fetch if user is authenticated
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
}
