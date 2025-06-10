"use client";

import { useProfile } from "@/hooks/useProfile";
import { SidebarTrigger } from "../sidebar";
import { NavbarUserProfile, NavbarWrapper } from "./navbar.content";

export const AppNavbar = () => {
    const query = useProfile();

    return (
        <NavbarWrapper>
            <SidebarTrigger className="mr-4 cursor-pointer" />
            <div className="text-lg font-bold w-32">[Logo]</div>

            <div className="flex w-auto flex-grow justify-end mr-2">
                <NavbarUserProfile {...query} />
            </div>
        </NavbarWrapper>
    );
};
