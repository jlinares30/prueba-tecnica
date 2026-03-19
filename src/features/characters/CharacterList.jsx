import Card from "../../components/ui/Card";
import Searcher from "../../components/ui/Searcher";
import Skeleton from "../../components/ui/Skeleton";
import { useNavigate } from "react-router-dom";
import { useCharacters } from "./useCharacters";
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
    const {data, isLoading, isPlaceholderData, error} = useCharacters(search, page);
    const showSkeletons = isLoading || isPlaceholderData;
    console.log(data);

    if (error) return (
            <div className="p-10 text-center">
                <div className="text-red-500 font-black text-2xl uppercase tracking-tighter">⚠️ Error de Conexión ⚠️</div>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">La señal interdimensional es débil</p>
            </div>
    )
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
    <div className="min-h-screen bg-[#24282f] text-white p-6 transition-colors duration-500">
        <div className="container mx-auto">
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6 border-b border-[#97ce4c]/20 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
                        Characters <span className="text-[#97ce4c]">List</span>
                    </h1>
                    <p className="text-[#00b0c8] text-xs font-bold tracking-[0.3em] uppercase mt-2">
                        Base de datos de la Ciudadela
                    </p>
                </div>
                
                <div className="w-full md:w-auto">
                    <Searcher onChange={handleSearch} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {showSkeletons ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <CharacterSkeleton key={index} />
                    ))
                ) : (
                    characters.map((character) => (
                        <Card 
                            key={character.id}
                            className="group relative bg-[#3c3e44] border-2 border-transparent hover:border-[#97ce4c] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(151,206,76,0.3)] cursor-pointer"
                            onClick={() => {selectCharacter(character.id);}}
                        >
                            <div className="relative overflow-hidden">
                                <img 
                                    src={character.image} 
                                    alt={character.name} 
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                                        character.status === 'Alive' ? 'bg-[#97ce4c] text-[#24282f]' : 'bg-red-500 text-white'
                                    }`}>
                                        {character.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <h2 className="text-xl font-black mb-1 group-hover:text-[#97ce4c] transition-colors truncate uppercase italic">
                                    {character.name}
                                </h2>
                                
                                <div className="flex flex-col gap-1">
                                    <p className="text-[#00b0c8] text-[10px] font-bold uppercase tracking-wider">
                                        Especie: <span className="text-gray-300">{character.species}</span>
                                    </p>
                                    <div className="h-1 w-full bg-[#24282f] rounded-full mt-2 overflow-hidden">
                                        <div className={`h-full transition-all duration-1000 ${character.status === 'Alive' ? 'w-full bg-[#97ce4c]' : 'w-1/3 bg-red-500'}`}></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute inset-0 pointer-events-none border-t-2 border-[#97ce4c]/0 group-hover:border-[#97ce4c]/50 group-hover:animate-pulse"></div>
                        </Card>
                    ))
                )}
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-center items-center gap-6 mt-16 pb-10">
                <button
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={!info.prev || isLoading}
                    className="cursor-pointer px-6 py-2 bg-[#3c3e44] text-[#97ce4c] font-black rounded-full border-2 border-[#97ce4c]/30 hover:border-[#97ce4c] hover:bg-[#97ce4c] hover:text-[#24282f] transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    ← ANTERIOR
                </button>
                
                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#00b0c8] font-black uppercase tracking-[0.2em]">Dimensión</span>
                    <span className="font-black text-2xl text-white italic">
                        {page} <span className="text-gray-600 text-lg">/ {info.pages || 1}</span>
                    </span>
                </div>

                <button
                    onClick={() => setPage(old => old + 1)}
                    disabled={!info.next || isLoading}
                    className="cursor-pointer px-6 py-2 bg-[#3c3e44] text-[#97ce4c] font-black rounded-full border-2 border-[#97ce4c]/30 hover:border-[#97ce4c] hover:bg-[#97ce4c] hover:text-[#24282f] transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    SIGUIENTE →
                </button>
            </div>
        </div>
    </div>
);
}