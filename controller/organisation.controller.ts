import { api } from "@/lib/util/utils";
import { Session } from "@supabase/supabase-js";

export const getOrganisation = async (
    organisationId: string,
    session: Session | null
) => {
    if (!session?.access_token) {
        throw new Error("No active session found");
    }

    const url = api();
};
