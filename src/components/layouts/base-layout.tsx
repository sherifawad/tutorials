import Providers from "@/lib/providers";

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Providers>
                {/* <Navbar /> */}
                <div className="flex content-center justify-center h-screen pt-10">
                    <main className="flex flex-col w-full max-w-lg gap-4">
                        {children}
                    </main>
                </div>
            </Providers>
        </>
    );
}
