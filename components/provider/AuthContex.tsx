import { createClient } from "@/lib/util/supabase/client";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    session: Session | null;
    user: Session["user"] | null;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const client: SupabaseClient = createClient();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        // Get initial session
        client.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = client.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
