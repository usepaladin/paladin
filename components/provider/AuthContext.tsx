"use client";

import { createClient } from "@/lib/util/supabase/client";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
    session: Session | null;
    user: Session["user"] | null;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const client = useMemo(() => createClient(), []);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        // Get initial session
        client.auth
            .getSession()
            .then(({ data: { session } }) => {
                setSession(session);
            })
            .catch((error) => {
                console.error("Failed to get initial session:", error);
            });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = client.auth.onAuthStateChange((event, session) => {
            if (
                event === "SIGNED_IN" ||
                event === "SIGNED_OUT" ||
                event === "TOKEN_REFRESHED"
            ) {
                setSession(session);
            }
        });

        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
    }, [client]);

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
