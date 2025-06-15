import { useAuth } from "@/components/provider/AuthContext";
import { getOrganisation } from "@/controller/organisation.controller";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useOrganisation = () => {
    const { session, loading } = useAuth();
    // Extract organization name from URL params
    // Assuming the route is defined like: /dashboard/organisation/:orgName
    const { orgId } = useParams<{ orgId: string }>();

    // Decode the URL-encoded organization name (e.g., "Organisation%202%7D" → "Organisation 2}")
    const decodedOrgId = decodeURIComponent(orgId || "");

    // Use TanStack Query to fetch organization data
    const query = useQuery({
        queryKey: ["organization", decodedOrgId], // Unique key for caching
        queryFn: () => getOrganisation(session, decodedOrgId), // Fetch function
        enabled: !!decodedOrgId && !!session?.user.id, // Only fetch if orgName exists and the user is authenticated
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

    return { isLoadingAuth: loading, ...query };
};
