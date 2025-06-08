"use client";

import { FCWC, Propless } from "@/lib/interfaces/interface";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../button";
import { ModeToggle } from "../themeToggle";
import { useProfile } from "@/hooks/useProfile";

interface AuthenticatedProps {
    handleSignout: () => Promise<void>;
}

export const AuthenticatedNavbar: FC<AuthenticatedProps> = ({
    handleSignout,
}) => {
    const query = useProfile();

    return (
        <NavbarWrapper>
            <div className="w-full flex">
                <div>{user?.name}</div>
                <div className="mr-2">
                    <Button onClick={handleSignout} variant={"outline"}>
                        Logout
                    </Button>
                </div>
            </div>
        </NavbarWrapper>
    );
};

export const UnauthenticatedNavbar: FC<Propless> = () => {
    return (
        <NavbarWrapper>
            <div className="flex justify-end mr-4 flex-grow w-auto">
                <div className="flex">
                    <Button variant={"outline"}>
                        <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button className="ml-2">
                        <Link href="/auth/register">Get Started</Link>
                    </Button>
                </div>
            </div>
        </NavbarWrapper>
    );
};

export const NavbarWrapper: FCWC<Propless> = ({ children }) => {
    return (
        <div className="h-[4rem] sticky top-0 w-full border-b flex items-center px-4 bg-background/40 backdrop-blur-[4px]">
            {children}
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </div>
    );
};
