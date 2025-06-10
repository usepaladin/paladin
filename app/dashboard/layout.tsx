import { AppNavbar } from "@/components/ui/nav/app.navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/root-sidebar";
import { ChildNodeProps } from "@/lib/interfaces/interface";
import { FC } from "react";

const layout: FC<ChildNodeProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="relative">
                    <AppNavbar />
                </header>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default layout;
