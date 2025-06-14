"use client";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { Button } from "../button";
import { Skeleton } from "../skeleton";
import { AppSidebar, sidebarContent } from "./root-sidebar";
import { OptionSwitcher } from "./switcher";

export const DashboardSidebar = () => {
    const { data, isLoading, isError } = useProfile();
    return (
        <AppSidebar
            header={() => {
                if (isLoading || !data) {
                    return (
                        <Skeleton className="w-auto flex-grow flex h-8 mt-3 mx-4 " />
                    );
                }

                if (data) {
                    if (data.memberships.length === 0) {
                        return (
                            <Link
                                className="mt-3 w-auto flex-grow flex mx-4"
                                href={"/dashboard/organisation/new"}
                            >
                                <Button
                                    variant={"outline"}
                                    className="w-full"
                                    size={"sm"}
                                >
                                    Create Organisation
                                </Button>
                            </Link>
                        );
                    }
                    return (
                        <OptionSwitcher
                            addNewLink="/dashboard/organisation/new"
                            addNewTitle="Create Organisation"
                            title={"Organisations"}
                            options={
                                data.memberships
                                    .map((org) => org.organisation)
                                    .filter((org) => !!org) ?? []
                            }
                            defaultOption={data.defaultOrganisation}
                            render={(org) => <span>{org.name}</span>}
                        />
                    );
                }

                return <></>;
            }}
            body={sidebarContent}
        />
    );
};
