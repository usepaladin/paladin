"use client";
import { useOrganisationStore } from "@/components/provider/OrganisationContext";
import { useProfile } from "@/hooks/useProfile";
import { Organisation } from "@/lib/interfaces/organisation.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { Skeleton } from "../skeleton";
import { AppSidebar, sidebarContent } from "./root-sidebar";
import { OptionSwitcher } from "./switcher";

export const DashboardSidebar = () => {
    const router = useRouter();
    const { data, isPending, isLoadingAuth } = useProfile();
    const [selectedOrganisation, setSelectedOrganisation] =
        useState<Organisation | null>(null);
    const store = useOrganisationStore((store) => store);
    const loadingUser = isPending || isLoadingAuth;

    useEffect(() => {
        if (!store) return;

        const selectedOrganisationId = store.seletedOrganisationId;
        if (!selectedOrganisationId) return;

        setSelectedOrganisation(
            data?.memberships.find(
                (m) => m.organisation?.id === selectedOrganisationId
            )?.organisation || null
        );
    }, [store]);

    const handleOrganisationSelection = (organisation: Organisation) => {
        if (!store) return;

        store.setSelectedOrganisation(organisation);
        setSelectedOrganisation(organisation);
        router.push("/dashboard/organisation/" + organisation.id);
    };

    return (
        <AppSidebar
            header={() => {
                if (loadingUser) {
                    return (
                        <Skeleton className="w-auto flex-grow flex h-8 mt-3 mx-4 " />
                    );
                }

                if (data && store) {
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
                            selectedOption={selectedOrganisation}
                            handleOptionSelection={handleOrganisationSelection}
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
