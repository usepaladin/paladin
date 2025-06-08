import { AuthProvider } from "@/components/provider/AuthContex";
import { Navbar } from "@/components/ui/nav/navbar";
import QueryClientWrapper from "@/components/util/query.wrapper";
import StoreProviderWrapper from "@/components/util/store.wrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                
                <QueryClientWrapper>
                    <StoreProviderWrapper>
                        <AuthProvider>
                            <main className="w-full">
                                <Navbar />
                                {children}
                            </main>
                        </AuthProvider>
                    </StoreProviderWrapper>
                </QueryClientWrapper>
                <Toaster richColors/>
            </body>
        </html>
    );
}
