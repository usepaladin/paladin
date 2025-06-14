"use client";

import { OrganisationTile } from "@/components/feature-modules/organisation/OrganisationTile";
import { useAuth } from "@/components/provider/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useProfile";
import { OrganisationMember } from "@/lib/interfaces/organisation.interface";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
    const { session } = useAuth();
    const { data: user, isError, isPending } = useProfile();
    const [organisationSearch, setOrganisationSearch] = useState<
        string | undefined
    >();
    const [renderedOrganisations, setRenderedOrganisations] = useState<
        OrganisationMember[]
    >(user?.memberships ?? []);
    console.log(session);
    console.log(user);
    useEffect(() => {
        if (user?.memberships) {
            setRenderedOrganisations(
                user.memberships.filter((org) =>
                    org.organisation?.name
                        .toLowerCase()
                        .includes(organisationSearch?.toLowerCase() || "")
                )
            );
        } else {
            setRenderedOrganisations([]);
        }
    }, [user]);

    return (
        <div className="w=full h-full m-6 md:m-12 lg:m-16">
            <h1 className="text-2xl text-content">Your Organisations</h1>
            <section className="flex mt-6 space-x-4">
                <Link href={"organisation/new"}>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className="h-full cursor-pointer"
                    >
                        <PlusCircle className="mr-2" />
                        Create Organisation
                    </Button>
                </Link>
                <Input
                    className="w-full max-w-sm"
                    placeholder="Search Organisations"
                    value={organisationSearch}
                    onChange={(e) => {
                        setOrganisationSearch(e.target.value);
                        if (user?.memberships) {
                            setRenderedOrganisations(
                                user.memberships.filter((org) =>
                                    org.organisation?.name
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase())
                                )
                            );
                        }
                    }}
                />
            </section>
            <section className="flex flex-wrap flex-shrink-0 mt-8 space-x-4">
                {renderedOrganisations.length > 0 ? (
                    <>
                        {renderedOrganisations.map((org) => (
                            <OrganisationTile
                                key={org.organisationId}
                                membership={org}
                                isDefault={
                                    user?.defaultOrganisation?.id ===
                                    org.organisationId
                                }
                            />
                        ))}
                    </>
                ) : isPending ? (
                    <>Loading... </>
                ) : (
                    <>No Organisations found</>
                )}
            </section>
        </div>
    );
};

export default page;
