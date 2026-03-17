import Card from "../components/Card";
import Searcher from "../components/Searcher";
import Skeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";
import { useState } from "react";

const CharacterSkeleton = () => {
    return (
        <Card className="p-5">
            <Skeleton width="w-full" height="h-48" />
            <Skeleton width="w-3/4" height="h-6 mt-4" />
            <Skeleton width="w-3/4" height="h-6 mt-2" />
        </Card>
    );
};

export default function CharacterList() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const {data, isLoading, error} = useCharacters(search, page);

    console.log(data);

    if (error) return <div>Error: {error.message}</div>;
    const characters = data?.results || [];
    const info = data?.info || {};

    const selectCharacter = (characterId) => {
        navigate(`/character/${characterId}`);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }


    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Characters</h1>
                <Searcher  onChange={handleSearch} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                    <CharacterSkeleton key={index} />
                ))
                ) : (
                characters.map((character) => (
                    <Card key={character.id}
                    className="hover:shadow-[0_0_20px_rgba(151,206,76,0.6)] p-5 border border-transparent cursor-pointer hover:border-[#97ce4c]"
                    onClick={() => {selectCharacter(character.id);}}
                    >
                    <img 
                        src={character.image} 
                        alt={character.name} 
                        className="w-full h-48 object-cover rounded-t-md" 
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{character.name}</h2>
                        <p className="text-gray-600">Species: {character.species}</p>
                        <div className="flex items-center mt-2">
                        <span className={`h-2 w-2 rounded-full mr-2 ${character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <p className="text-sm text-gray-600">{character.status}</p>
                        </div>
                    </div>
                    </Card>
                ))
                )}
            </div>
            
            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={!info.prev || isLoading}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-[#97ce4c] transition-colors"
                >
                    Anterior
                </button>
                
                <span className="font-bold text-lg">Página {page} de {info.pages || 1}</span>

                <button
                    onClick={() => setPage(old => old + 1)}
                    disabled={!info.next || isLoading}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-[#97ce4c] transition-colors"
                >
                    Siguiente
                </button>
            </div>
        </div>

    );
}