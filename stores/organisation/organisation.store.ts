import { Organisation } from "@/lib/interfaces/organisation.interface";
import { User } from "@/lib/interfaces/user.interface";
import { undefinedIfNull } from "@/lib/util/utils";
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
    user: User,
    initState: OrganisationState = organisationInitState
) => {
    // Initialize the state with either the selected organisation in local storage, or the user's default organisation if available
    const state: OrganisationState = {
        ...initState,
        seletedOrganisationId:
            localStorage.getItem("selectedOrganisation") ||
            undefinedIfNull(user?.defaultOrganisation?.id),
    };

    return createStore<OrganisationStore>()((set) => ({
        ...state,
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
