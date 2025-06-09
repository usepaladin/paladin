"use client";

import { useProfile } from "@/hooks/useProfile";
import { FCWC, Propless } from "@/lib/interfaces/interface";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../button";
import { ModeToggle } from "../themeToggle";

export const AuthenticatedNavbar: FC<Propless> = () => {
    const { data: user, error, isLoading, isError } = useProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !user) {
        return <div>Error loading profile</div>;
    }

    return (
        <NavbarWrapper>
            <div className="w-full flex">
                <div>{user.name}</div>
                <div className="mr-2">
                    <Button variant={"outline"}>Logout</Button>
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
