import { OrganisationCreationRequest } from "@/lib/interfaces/organisation.interface";
import { api } from "@/lib/util/utils";
import { Session } from "@supabase/supabase-js";
import { isUUID } from "validator";

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

export const getOrganisation = async (session: Session | null, id: string) => {
    // Determine id is valid UUID
    if (!isUUID(id)) {
        throw new Error("Invalid organization ID format. Expected a UUID.");
    }

    if (!session?.access_token) {
        throw new Error("No active session found");
    }

    const url = api();
    const response = await fetch(`${url}/v1/organisation/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    if (response.ok) {
        return await response.json();
    }

    throw new Error(
        `Failed to fetch organisation: ${response.status} ${response.statusText}`
    );
};
