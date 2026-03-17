import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { noteSchema } from "../schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCharacterDetail } from "../hooks/useCharacterDetail";
import { useInventory } from "../hooks/useInventory";
import Skeleton from "../components/Skeleton";
import { useState } from "react";

export default function CharacterDetail() {
    const { id } = useParams();
    const {data: character, isLoading, error} = useCharacterDetail(id);
    const { mutate, isPending } = useInventory();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [noteSaved, setNoteSaved] = useState("");

    //console.log(character);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        //resolver pasa los datos del form a traves de la validacion de zod
        resolver: zodResolver(noteSchema),
    });

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            userId: id,
        };
        mutate(payload,{
            onSuccess: (response) => {
                console.log("Nota guardada exitosamente:", response);
                setNoteSaved(response);
                setSuccessMessage("Nota guardada exitosamente.");
                setTimeout(() => setSuccessMessage(false), 3000);
                reset();
            },
            onError: (error) => {
                console.error("Error al guardar la nota:", error);
                setErrorMessage("Error al guardar la nota. Por favor, inténtalo de nuevo.");
                setTimeout(() => setErrorMessage(false), 3000);
                reset();
            },
        });
    };
    
    //watch para contar los caracteres del textarea
    const watchBody = watch("body", ""); 

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

            {noteSaved && (
                <div className="bg-slate-50 p-8 mb-6 rounded-2xl border-2 border-gray-300">
                    <h3 className="text-xl font-semibold text-green-600">Última Nota Guardada:</h3>
                    <p className="text-gray-700 mt-2"><span className="font-bold">Asunto:</span> {noteSaved.title}</p>
                    <p className="text-gray-600 mt-1"><span className="font-bold">Descripción:</span> {noteSaved.body}</p>
                </div>
            )}

            {isLoading ? (
                <div className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-gray-300 animate-pulse">
                    <Skeleton width="w-64" height="h-8" className="mb-6" />
                    
                    <div className="space-y-4">
                        <div>
                            <Skeleton width="w-32" height="h-4" className="mb-1" /> 
                        </div>

                        <div>
                            <Skeleton width="w-full" height="h-28" className="rounded-lg" /> 
                        </div>

                        <Skeleton width="w-full" height="h-12" className="rounded-lg mt-2" />
                    </div>
                </div>
            ) : (
            <div className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-gray-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
                    Notas de Campo del Personaje
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Asunto / Ítem</label>
                        <input
                            {...register("title")}
                            placeholder="Ej: Análisis de ADN o Objeto encontrado"
                            className={`w-full p-3 rounded-lg border outline-none transition-all ${errors.title ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-[#97ce4c]'}`}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Descripción de la observación</label>
                        <textarea
                            {...register("body")}
                            rows="3"
                            placeholder="Escribe aquí los detalles del avistamiento o inventario..."
                            className={`w-full p-3 rounded-lg border outline-none transition-all ${errors.body ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-[#97ce4c]'}`}
                        />

                        <p className={`text-xs text-right text-gray-400`}>
                            {watchBody.length} / 200 caracteres
                        </p>

                        {errors.body && <p className="text-red-500 text-xs mt-1 font-medium">{errors.body.message}</p>}
                    </div>

                    {isPending ? (
                        <div className="flex flex-col items-center gap-3">
                                <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#97ce4c] animate-[spin_3s_linear_infinite]"></div>
                                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#46d252] to-[#97ce4c] animate-pulse shadow-[0_0_15px_#97ce4c]"></div>
                                </div>
                                <p className="text-[#97ce4c] font-bold animate-pulse text-sm">Escaneando Dimensión...</p>
                            </div>
                    ) : (
                    <button
                        type="submit"
                        className="w-full bg-[#97ce4c] hover:bg-[#86b943] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-[#97ce4c]/40 transition-all disabled:opacity-50"
                    >
                        Guardar Nota
                    </button>
                    )}
                </form>
            </div>
            )}
            {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg fixed top-5 right-5">
                ✅ {successMessage}
            </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg fixed top-5 right-5">
                    ❌ {errorMessage}
                </div>
            )}
        </div>
    );
}