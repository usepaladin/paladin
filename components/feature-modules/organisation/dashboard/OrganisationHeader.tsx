import { Organisation } from "@/lib/interfaces/organisation.interface";
import { FC } from "react";

interface Props {
    organisation: Organisation;
}

export const OrganisationHeader: FC<Props> = ({ organisation }) => {
    return <header>{organisation.name}</header>;
};
