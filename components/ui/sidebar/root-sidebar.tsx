import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Icon } from "@/lib/interfaces/interface";
import { Pen } from "lucide-react";
import Link from "next/link";

// This is sample data.
export const sidebarContent: SidebarGroup[] = [
    {
        title: "Getting Started",
        url: "#",
        items: [
            {
                icon: Pen,
                hidden: false,
                title: "Installation",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Project Structure",
                url: "#",
            },
        ],
    },
    {
        title: "Building Your Application",
        url: "#",
        items: [
            {
                icon: Pen,
                hidden: false,
                title: "Routing",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Data Fetching",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Rendering",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Caching",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Styling",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Optimizing",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                isActive: true,
                title: "Configuring",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Testing",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Authentication",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Deploying",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Upgrading",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Examples",
                url: "#",
            },
        ],
    },
    {
        title: "API Reference",
        url: "#",
        items: [
            {
                icon: Pen,
                hidden: false,
                title: "Components",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "File Conventions",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Functions",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "next.config.js Options",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "CLI",
                url: "#",
            },
            {
                icon: Pen,
                hidden: false,
                title: "Edge Runtime",
                url: "#",
            },
        ],
    },
];

interface Props {
    body: Array<SidebarGroup>;
    header?: () => React.JSX.Element;
}

interface SidebarGroup {
    title: string;
    url: string;
    items: Array<{
        icon: Icon;
        title: string;
        url: string;
        hidden?: boolean;
        isActive?: boolean;
    }>;
}

export function AppSidebar({
    body,
    header,
    ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
    return (
        <Sidebar {...props}>
            {header && <SidebarHeader>{header()}</SidebarHeader>}
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {body.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items
                                    .filter((item) => !item.hidden)
                                    .map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className="ml-1"
                                                isActive={item.isActive}
                                            >
                                                <Link
                                                    href={item.url}
                                                    className="flex"
                                                >
                                                    <item.icon className="size-4" />
                                                    <span className="ml-2 text-content">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
