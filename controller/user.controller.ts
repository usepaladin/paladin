import { User } from "@/lib/interfaces/user.interface";
import { Session } from "@supabase/supabase-js";

/**
 * Will fetch the Current authenticated user's detailed profile from the
 * active session token
 * @param {Session} session - The current active session for the user
 * @returns {UserDTO} - The user's profile
 */
export const fetchSessionUser = async (session: Session): Promise<User> => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `core/api/v1/user/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
            },
        }
    );

    if (response.ok) {
        return await response.json();
    }

    throw new Error(
        `Failed to fetch user profile: ${response.status} ${response.statusText}`
    );
};
