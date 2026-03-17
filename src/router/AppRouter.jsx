import CharacterList from "../pages/CharacterList";
import CharacterDetail from "../pages/CharacterDetail";
import { Route, Routes } from 'react-router-dom'
import MainLayout from "../layout/MainLayout";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<CharacterList />} />
                <Route path="/character/:id" element={<CharacterDetail />} />
            </Route>
        </Routes>
    );
}