"use client";

import { createClient } from "@/lib/util/supabase/client";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    session: Session | null;
    user: Session["user"] | null;
    client?: ReturnType<typeof createClient>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    client: undefined,
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const client = createClient();
    const [isloading, setIsLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        client.auth.onAuthStateChange((_, newSession) => {
            console.log("Auth state changed:", session);
            setIsLoading(false);
            if (!newSession) {
                setSession(null);
                return;
            }

            if (newSession.user.id === session?.user.id) return;
            setSession(newSession);
        });
    });

    return (
        <AuthContext.Provider
            value={{
                session,
                user: session?.user ?? null,
                client: client,
                loading: isloading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
