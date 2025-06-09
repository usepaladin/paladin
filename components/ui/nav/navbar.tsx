"use client";

import { useAuth } from "@/components/provider/AuthContext";
import { AuthenticatedNavbar, UnauthenticatedNavbar } from "./navbar.content";

export const Navbar = () => {
    const { session } = useAuth();

    if (!session) {
        return <UnauthenticatedNavbar />;
    }

    return <AuthenticatedNavbar />;
};
