import { OrganisationCreationRequest } from "@/lib/interfaces/organisation.interface";
import { fromError } from "@/lib/util/error/error.util";
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

export const getOrganisation = async (
    session: Session | null,
    id: string
): Promise<any> => {
    try {
        // Validate id is a UUID
        if (!isUUID(id)) {
            throw fromError({
                message: "Invalid organization ID format. Expected a UUID.",
                status: 400,
                error: "INVALID_ID",
            });
        }

        // Validate session and access token
        if (!session?.access_token) {
            throw fromError({
                message: "No active session found",
                status: 401,
                error: "NO_SESSION",
            });
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

        // Parse server error response
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = {
                message: `Failed to fetch organisation: ${response.status} ${response.statusText}`,
                status: response.status,
                error: "SERVER_ERROR",
            };
        }

        throw fromError(errorData);
    } catch (error) {
        // Convert any caught error to ResponseError
        throw fromError(error);
    }
};
