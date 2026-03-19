import { useParams } from "react-router-dom";
import { useCharacterDetail } from "./useCharacterDetail";
import Skeleton from "../../components/ui/Skeleton";

export default function CharacterDetail() {
    const { id } = useParams();
    const {data: character, isLoading, error} = useCharacterDetail(id);
    

    //console.log(character);

    return (
    <div className="container mx-auto p-4 max-w-4xl">
        {isLoading ? (
            <div className="flex flex-col md:flex-row gap-8 bg-[#3c3e44] p-8 rounded-3xl border-2 border-[#97ce4c]/20 shadow-2xl animate-pulse">
                <div className="w-full md:w-72 h-72 bg-[#24282f] rounded-2xl shadow-inner flex-shrink-0">
                    <Skeleton width="w-full" height="h-full" className="rounded-2xl" />
                </div>

                <div className="space-y-4 flex-1">
                    <Skeleton width="w-3/4" height="h-12" className="bg-[#24282f]" />
                    <div className="flex gap-2">
                        <Skeleton width="w-20" height="h-7" className="rounded-full bg-[#24282f]" />
                        <Skeleton width="w-24" height="h-7" className="rounded-full bg-[#24282f]" />
                    </div>
                    <div className="space-y-4 pt-4">
                        <Skeleton width="w-full" height="h-4" className="bg-[#24282f]" />
                        <Skeleton width="w-2/3" height="h-4" className="bg-[#24282f]" />
                        <Skeleton width="w-1/2" height="h-4" className="bg-[#24282f]" />
                    </div>
                </div>
            </div>
        ) : error ? (
            <div className="p-10 text-center">
                <div className="text-red-500 font-black text-2xl uppercase tracking-tighter">⚠️ Error de Conexión ⚠️</div>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">La señal interdimensional es débil</p>
            </div>
        ) : (
            <div className="flex flex-col md:flex-row gap-10 bg-[#3c3e44] p-8 rounded-3xl border-b-8 border-[#00b0c8] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                
                <div className="absolute bottom-0 right-0 p-4 opacity-10">
                    <span className="text-7xl font-black text-white select-none">#{character.id}</span>
                </div>

                <div className="relative flex-shrink-0 mx-auto md:mx-0">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-[#00b0c8] to-[#97ce4c] rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                    <img 
                        src={character.image} 
                        alt={character.name} 
                        className="relative w-72 h-72 object-cover rounded-2xl shadow-2xl border-2 border-[#24282f]" 
                    />
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <h1 className="text-5xl font-black text-white italic leading-none uppercase tracking-tighter">
                            {character.name}
                        </h1>
                        <div className="flex gap-3 mt-4">
                            <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                character.status === 'Alive' ? 'bg-[#97ce4c] text-[#24282f]' : 'bg-red-500 text-white'
                            }`}>
                                <span className={`h-2 w-2 rounded-full ${character.status === 'Alive' ? 'bg-[#24282f] animate-pulse' : 'bg-white'}`}></span>
                                {character.status}
                            </span>
                            <span className="px-4 py-1 bg-[#00b0c8] text-[#24282f] rounded-lg text-[10px] font-black uppercase tracking-widest">
                                {character.species}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 border-t border-gray-700 pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-10 bg-[#00b0c8]"></div>
                            <div>
                                <p className="text-[10px] font-black text-[#00b0c8] uppercase tracking-widest">Género</p>
                                <p className="text-lg text-white font-medium">{character.gender}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-10 bg-[#97ce4c]"></div>
                            <div>
                                <p className="text-[10px] font-black text-[#97ce4c] uppercase tracking-widest">Origen</p>
                                <p className="text-lg text-white font-medium">{character.origin?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-10 bg-[#f0e14a]"></div>
                            <div>
                                <p className="text-[10px] font-black text-[#f0e14a] uppercase tracking-widest">Ubicación Actual</p>
                                <p className="text-lg text-white font-medium">{character.location?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);
}