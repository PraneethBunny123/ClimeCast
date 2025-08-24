import type { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({children}: PropsWithChildren) {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            {/* header */}
            <Header />

            {/* content */}
            <main className="min-h-screen container mx-auto px-4 py-8">
                {children}
            </main>

            {/* footer */}
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>ClimeCast by Praneeth</p>
                </div>
            </footer>
        </div>
    )
}
