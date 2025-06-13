import { Organisation } from "@/lib/interfaces/organisation.interface";
import { api } from "@/lib/util/utils";
import { Session } from "@supabase/supabase-js";

export const createOrganisation = async (
    sesion: Session | null,
    organisation: Organisation
) => {};

export const getOrganisation = async (
    session: Session | null,
    organisationId: string
) => {
    if (!session?.access_token) {
        throw new Error("No active session found");
    }

    const url = api();
};
