"use client";

import { useOrganisation } from "@/hooks/useOrganisation";

const page = () => {
    const {data, isPending} = useOrganisation();

    return <div>page</div>;
};

export default page;
