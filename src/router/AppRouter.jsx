import { Route, Routes } from 'react-router-dom'
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/character/:id" element={<DetailPage />} />
            </Route>
        </Routes>
    );
}