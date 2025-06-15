import { Organisation } from "@/lib/interfaces/organisation.interface";
import { createStore } from "zustand";

type OrganisationState = {
    seletedOrganisationId?: string;
};

type OrganisationActions = {
    setSelectedOrganisation: (organisation: Organisation) => void;
};

export type OrganisationStore = OrganisationState & OrganisationActions;

export const organisationInitState: OrganisationState = {
    seletedOrganisationId: undefined,
};

export const createOrganisationStore = (
    initState: OrganisationState = organisationInitState
) => {
    return createStore<OrganisationStore>()((set) => ({
        ...initState,
        setSelectedOrganisation: (organisation: Organisation) =>
            set((state) => {
                localStorage.setItem("selectedOrganisation", organisation.id);
                return {
                    ...state,
                    seletedOrganisationId: organisation.id,
                };
            }),
    }));
};
