import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Rick y Morty App</h1>
            <main>
                <Outlet />
            </main>
        </div>
    );
}