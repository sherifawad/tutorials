import Providers from "@/lib/providers";
import Footer from "./footer-layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "./NavBar";

export default async function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Providers>
                <Navbar />
                <div className="flex content-center justify-center h-screen pb-10">
                    <main className="flex flex-col w-full max-w-lg gap-4">
                        {children}
                    </main>
                </div>
                <Footer />
            </Providers>
        </>
    );
}
