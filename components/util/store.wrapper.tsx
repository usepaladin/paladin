import { FCWC, Propless } from "@/lib/interface/interface";

const StoreProviderWrapper: FCWC<Propless> = ({ children }) => {
    return <>{children}</>;
};

export default StoreProviderWrapper;
