import { useParams } from "react-router-dom";
import { useCharacterDetail } from "./useCharacterDetail";
import Skeleton from "../../components/Skeleton";

export default function CharacterDetail() {
    const { id } = useParams();
    const {data: character, isLoading, error} = useCharacterDetail(id);
    

    //console.log(character);

    return (
        <div className="container mx-auto p-4 max-w-4xl">

            {isLoading ? (
                <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-10 animate-pulse">
        
                    <div className="w-full md:w-64 h-64 bg-gray-200 rounded-xl shadow-lg flex-shrink-0">
                        <Skeleton width="w-full" height="h-full" className="rounded-xl" />
                    </div>

                    <div className="space-y-3 flex-1">
                        <Skeleton width="w-3/4" height="h-10" />
                        
                        <div className="flex gap-2">
                            <Skeleton width="w-20" height="h-7" className="rounded-full" />
                            <Skeleton width="w-24" height="h-7" className="rounded-full" />
                        </div>

                        <div className="space-y-4 pt-2">
                            <Skeleton width="w-1/2" height="h-5" />
                            <Skeleton width="w-2/3" height="h-5" />
                            <Skeleton width="w-1/3" height="h-5" />
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="p-10 text-center text-red-500">Error al conectar con la Ciudadela.</div>
            ) :
            (<div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-10">
                <img src={character.image} alt={character.name} className="w-full md:w-64 h-64 object-cover rounded-xl shadow-lg" />
                <div className="space-y-3">
                    <h1 className="text-4xl font-black text-gray-800">{character.name}</h1>
                    <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {character.status}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{character.species}</span>
                    </div>
                    <p className="text-gray-600"><strong>Gender:</strong> {character.gender}</p>
                    <p className="text-gray-600"><strong>Origin:</strong> {character.origin?.name}</p>
                    <p className="text-gray-600"><strong>Location:</strong> {character.location?.name}</p>
                </div>
            </div>)
            }            
        </div>
    );
}