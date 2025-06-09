import { AuthProvider } from "@/components/provider/AuthContext";
import { ThemeProvider } from "@/components/provider/ThemeContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import QueryClientWrapper from "@/components/util/query.wrapper";
import StoreProviderWrapper from "@/components/util/store.wrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Paladin | The Open Sourced Kafka Powered Event Driven Architecture Platform",
    description:
        "Explore and manage an Event Driven Platform powered through Kafka to help you build scalable and resilient applications.",
    openGraph: {
        locale: "en_AU",
        type: "website",
        title: "Paladin | The Open Sourced Kafka Powered Event Driven Architecture Platform",
        description:
            "Explore and manage an Event Driven Platform powered through Kafka to help you build scalable and resilient applications.",
        siteName: "Paladin",
    },
};

const robotoFont = Roboto({
    subsets: ["latin"],
    weight: ["100", "400", "900"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            className={robotoFont.className}
            lang="en"
            suppressHydrationWarning
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="theme"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryClientWrapper>
                        <StoreProviderWrapper>
                            <AuthProvider>
                                <SidebarProvider>
                                    <main className="w-full">{children}</main>
                                </SidebarProvider>
                            </AuthProvider>
                        </StoreProviderWrapper>
                    </QueryClientWrapper>
                </ThemeProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
