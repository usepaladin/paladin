import { AppNavbar } from "@/components/ui/nav/app.navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/root-sidebar";
import { ChildNodeProps } from "@/lib/interfaces/interface";
import { FC } from "react";

const layout: FC<ChildNodeProps> = ({ children }) => {
    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <AppNavbar />
                {children}
            </SidebarInset>
        </>
    );
};

export default layout;
