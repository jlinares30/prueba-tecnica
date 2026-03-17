import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { noteSchema } from "../schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCharacterDetail } from "../hooks/useCharacterDetail";


export default function CharacterDetail() {
    const { id } = useParams();
    const {data: character, isLoading, error} = useCharacterDetail(id);

    console.log(character);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(noteSchema),
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                userId: id,
            };
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts", payload);
            
            console.log("Respuesta Exitosa:", response.data);
            reset();
        } catch (err) {
            console.error("Error al guardar:", err);
        }
    };

    if (isLoading) return <div className="p-10 text-center animate-pulse text-portal font-bold">Cargando expediente...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error al conectar con la Ciudadela.</div>;

    return (
        <div className="container mx-auto p-4 max-w-4xl">


            <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-10">
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
            </div>



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
                        {errors.body && <p className="text-red-500 text-xs mt-1 font-medium">{errors.body.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#97ce4c] hover:bg-[#86b943] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-[#97ce4c]/40 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? "Transmitiendo..." : "Guardar Nota en la Ciudadela"}
                    </button>
                </form>
            </div>
        </div>
    );
}