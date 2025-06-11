"use client";

import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { JSX, useState } from "react";

interface Choice {
    id: string;
}

interface Props<T extends Choice> {
    title: String;
    render: (value: T) => JSX.Element;
    options: T[];
    defaultOption?: T;
}

export const OptionSwitcher = <T extends Choice>({
    options,
    defaultOption,
    render,
    title,
}: Props<T>) => {
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            {selectedOption && (
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        {title}
                                    </span>
                                    {render(selectedOption)}
                                </div>
                            )}
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width]"
                        align="start"
                    >
                        {options.map((option) => (
                            <DropdownMenuItem
                                key={option.id}
                                onSelect={() => setSelectedOption(option)}
                            >
                                {render(option)}
                                {option.id === selectedOption?.id && (
                                    <Check className="ml-auto" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
