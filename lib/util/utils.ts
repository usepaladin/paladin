import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ControllerResponse } from "../interfaces/interface";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const responseSuccess = <T>(
    response: ControllerResponse<T>
): boolean => {
    return response.status >= 200 && response.status < 300;
};

export function undefinedIfNull<T>(value: T | null): T | undefined {
    return value === null ? undefined : value;
}

export const getInitials = (name: string): string => {
    // Split the name into parts, filtering out empty strings caused by extra spaces
    const nameParts = name.trim().split(/\s+/);

    // Extract the first letter of each part and limit to the first two
    const initials = nameParts.map((part) => part[0].toUpperCase()).slice(0, 2);

    // Join the initials into a single string
    return initials.join("");
};

export const allNotNull = <T>(
    values: (T | null)[]
): values is NonNullable<T>[] => {
    return values.every((value) => value !== null);
};
