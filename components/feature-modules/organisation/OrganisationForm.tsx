"use client";

import { useAuth } from "@/components/provider/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganisation } from "@/controller/organisation.controller";
import { Organisation } from "@/lib/interfaces/organisation.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const OrganisationCreationFormSchema = z.object({
    displayName: z
        .string({ required_error: "Display Name is required" })
        .min(3, "Display Name is too short"),

    plan: z.enum(["ENTHUSIAST", "PRO", "TEAM", "ENTERPRISE"]),
});

export type OrganisationCreation = z.infer<
    typeof OrganisationCreationFormSchema
>;

export const OrganisationForm = () => {
    const { session } = useAuth();
    const toastRef = useRef<string | number | undefined>(undefined);
    const router = useRouter();
    const client = useQueryClient();

    const organisationCreationForm: UseFormReturn<OrganisationCreation> =
        useForm<OrganisationCreation>({
            resolver: zodResolver(OrganisationCreationFormSchema),
            defaultValues: {
                displayName: "",
                plan: "ENTHUSIAST", // Default plan
            },
        });

    const organisationMutation = useMutation({
        mutationFn: (organisation: Organisation) =>
            createOrganisation(session, organisation),
        onMutate: () => {
            toastRef.current = toast.loading("Creating Organisation...");
        },
        onSuccess: (data) => {
            toast.dismiss(toastRef.current);
            toast.success("Organisation created successfully");
            router.push("/dashboard/organisation");
        },
        onError: (error) => {
            toast.dismiss(toastRef.current);
            toast.error(`Failed to create organisation: ${error.message}`);
        },
    });

    return (
        <Card className="min-w-xl">
            <CardHeader>
                <CardTitle>Create a new organisation</CardTitle>
                <CardDescription>
                    Enter your public display name for your organisation.
                    <br />
                    This name will be publically visible to all users when
                    creating event routers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter>
        </Card>
    );
};
