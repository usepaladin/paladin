import { AuthProvider } from "@/components/provider/AuthContext";
import { ThemeProvider } from "@/components/provider/ThemeContext";
import { OnboardWrapper } from "@/components/util/onboard.wrapper";
import QueryClientWrapper from "@/components/util/query.wrapper";
import StoreProviderWrapper from "@/components/util/store.wrapper";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

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

const MontserratFont = Montserrat({
    subsets: ["latin"],
    weight: ["100", "400", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            className={MontserratFont.className}
            lang="en"
            suppressHydrationWarning
        >
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="theme"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryClientWrapper>
                        <StoreProviderWrapper>
                            <AuthProvider>
                                <OnboardWrapper>
                                    <main className="w-full">{children}</main>
                                </OnboardWrapper>
                            </AuthProvider>
                        </StoreProviderWrapper>
                    </QueryClientWrapper>
                </ThemeProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
