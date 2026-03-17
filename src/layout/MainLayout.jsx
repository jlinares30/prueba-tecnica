import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8">
                <Link to="/">
                    Rick y Morty App
                </Link>
            </h2>
            <main>
                <Outlet />
            </main>
        </div>
    );
}