import { OrganisationCreationRequest } from "@/lib/interfaces/organisation.interface";
import { api } from "@/lib/util/utils";
import { Session } from "@supabase/supabase-js";

export const createOrganisation = async (
    sesion: Session | null,
    organisation: OrganisationCreationRequest
) => {
    if (!sesion?.access_token) {
        throw new Error("No active session found");
    }

    const url = api();

    const response = await fetch(`${url}/v1/organisation/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sesion.access_token}`,
        },
        body: JSON.stringify(organisation),
    });

    if (response.ok) {
        return await response.json();
    }

    throw new Error(
        `Failed to create organisation: ${response.status} ${response.statusText}`
    );
};

export const getOrganisation = async (
    session: Session | null,
    organisationId: string
) => {
    if (!session?.access_token) {
        throw new Error("No active session found");
    }

    const url = api();
};
