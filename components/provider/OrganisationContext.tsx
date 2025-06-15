"use client";

import { useProfile } from "@/hooks/useProfile";
import {
    createOrganisationStore,
    type OrganisationStore,
} from "@/stores/organisation/organisation.store";
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    type ReactNode,
} from "react";
import { useStore } from "zustand";

type OrganisationStoreApi = ReturnType<typeof createOrganisationStore>;

interface OrganisationStoreContext extends Partial<OrganisationStoreApi> {
    store?: OrganisationStoreApi;
    loadingUser: boolean;
}

export const OrganisationsStoreContext = createContext<
    OrganisationStoreContext | undefined
>(undefined);

export interface OrganisationsStoreProviderProps {
    children: ReactNode;
}

export const OrganisationsStoreProvider = ({
    children,
}: OrganisationsStoreProviderProps) => {
    const { data: user, isLoadingAuth, isPending } = useProfile();
    const store = useRef<OrganisationStoreApi | undefined>(undefined);

    useEffect(() => {
        if (!user) return;
        if (!store.current) {
            store.current = createOrganisationStore(user);
        }
    }, [user]);

    return (
        <OrganisationsStoreContext.Provider
            value={{
                store: store.current,
                loadingUser: isLoadingAuth || isPending,
            }}
        >
            {children}
        </OrganisationsStoreContext.Provider>
    );
};

export const useOrganisationStore = <T,>(
    selector: (store: OrganisationStore) => T
) => {
    const context = useContext(OrganisationsStoreContext);

    if (!context) {
        throw new Error(
            "useOrganisationsStore must be used within a OrganisationsStoreProvider"
        );
    }

    if (!context.store)
        return {
            loading: context.loadingUser,
            store: undefined,
        };

    const store = useStore(context.store, selector);
    return {
        store: store,
        loading: context.loadingUser,
    };
};
