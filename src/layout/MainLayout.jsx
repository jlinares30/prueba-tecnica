import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-[#24282f] selection:bg-[#97ce4c] selection:text-[#24282f]">
            <Header />
            <main className="container mx-auto px-6 py-8">
                <div className="relative">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}