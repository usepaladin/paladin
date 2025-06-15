"use client";

import { useOrganisation } from "@/hooks/useOrganisation";

const page = () => {
    const { data, isPending, isError, error } = useOrganisation();

    console.log(data);
    return <div>page</div>;
};

export default page;
