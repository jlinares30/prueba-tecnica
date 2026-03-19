import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { noteSchema } from "../../schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCharacterDetail } from "../characters/useCharacterDetail";
import Notification from "../../components/ui/Notification";
import Skeleton from "../../components/ui/Skeleton";
import SavedNoteCard from "../../components/ui/SavedNoteCard";
import { useNoteUI } from "../../hooks/useNoteUI";


export default function NoteForm() {
    const { id } = useParams();
    const {isLoading} = useCharacterDetail(id);
    const [noteSaved, setNoteSaved] = useState("");
    const { editMode, setEditMode, messages, onSubmit, onSaveEdit,onDelete, isCreating } = useNoteUI(id, noteSaved, setNoteSaved);

    const {
            register,
            handleSubmit,
            reset,
            watch,
            formState: { errors },
            setValue
        } = useForm({
            //resolver pasa los datos del form a traves de la validacion de zod
            resolver: zodResolver(noteSchema),
        });
        
        //watch para contar los caracteres del textarea
        const watchBody = watch("body", ""); 

        const handleEdit = () => {
            setEditMode(true);
            setValue("title", noteSaved.title);
            setValue("body", noteSaved.body);
        }

        const handleCancel = () => {
            setEditMode(false);
            setValue("title", "");
            setValue("body", "");
        }
        //console.log("Estado actual de la nota:", noteSaved);
    return (
        <>
        <SavedNoteCard
                note={noteSaved} 
                editMode={editMode}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSubmit((data) => onSaveEdit(data, reset))}
                onDelete={() => onDelete(reset)}
                register={register}
                errors={errors}
                watchBody={watchBody}
            />

        {isLoading ? (

                <div className="p-8 rounded-2xl border-2 border-dashed border-gray-300 animate-pulse">
                    <Skeleton width="w-64" height="h-8" className="mb-6 bg-[#24282f]" />
                    <div className="space-y-4">
                        <div>
                            <Skeleton width="w-32" height="h-4" className="mb-1 bg-[#24282f]" /> 
                        </div>
                        <div>
                            <Skeleton width="w-full" height="h-28" className="rounded-lg bg-[#24282f]" /> 
                        </div>
                        <Skeleton width="w-full" height="h-12" className="rounded-lg mt-2 bg-[#24282f]" />
                    </div>

            </div>
        ) : (
            <>
                {!editMode && (
                    <div className="bg-[#24282f] p-8 rounded-3xl shadow-2xl border-b-8 border-[#97ce4c]">
                        <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
                            NOTAS DE CAMPO
                        </h2>
                        
                        <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="space-y-5">
                            <div className="group">
                                <label className="block text-[10px] font-black text-[#97ce4c] mb-1 ml-1 tracking-widest uppercase">Identificador del Ítem</label>
                                <input
                                    {...register("title")}
                                    placeholder="Análisis de ADN, Localización, etc..."
                                    className="w-full bg-[#3c3e44] text-white p-4 rounded-xl border-2 border-transparent focus:border-[#97ce4c] outline-none transition-all placeholder:text-gray-500"
                                />
                                {errors.title && <p className="text-[#f0e14a] text-[10px] mt-1 font-bold ml-1">⚠️ {errors.title.message}</p>}
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-black text-[#97ce4c] mb-1 ml-1 tracking-widest uppercase">Bitácora de Observación</label>
                                <textarea
                                    {...register("body")}
                                    rows="3"
                                    className="w-full bg-[#3c3e44] text-white p-4 rounded-xl border-2 border-transparent focus:border-[#97ce4c] outline-none transition-all placeholder:text-gray-500"
                                    placeholder="Escribe aquí los detalles del avistamiento o inventario..."
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {errors.body ? (
                                        <p className="text-[#f0e14a] text-[10px] font-bold ml-1">⚠️ {errors.body.message}</p>
                                    ) : (
                                        <p className="text-gray-500 text-[10px] italic ml-1 font-medium text-gray-400">Transmisión encriptada vía Ciudadela</p>
                                    )}
                                    <p className="text-[10px] font-black text-[#97ce4c]">{watchBody.length}/200</p>
                                </div>
                            </div>

                            {isCreating ? (
                                <div className="flex flex-col items-center py-4 bg-[#97ce4c]/10 rounded-xl border border-[#97ce4c]/30">
                                    <div className="relative w-12 h-12">
                                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#97ce4c] animate-[spin_4s_linear_infinite]"></div>
                                        <div className="absolute inset-2 rounded-full bg-[#97ce4c] animate-pulse"></div>
                                    </div>
                                    <p className="text-[#97ce4c] font-black text-[10px] mt-3 tracking-widest uppercase">Escaneando...</p>
                                </div>
                            ) : (
                                <button type="submit" className="cursor-pointer w-full bg-[#97ce4c] hover:bg-[#b2e061] text-[#24282f] font-black py-4 rounded-xl shadow-[0_0_20px_rgba(151,206,76,0.3)] hover:shadow-[#97ce4c]/50 transition-all uppercase tracking-tighter text-lg active:scale-95">
                                    Sincronizar Datos
                                </button>
                            )}
                        </form>
                    </div>
                )}
            </>
        )}
        {messages.success && (
            <Notification type="success" message={messages.success} />
        )}
        {messages.error && (
            <Notification type="error" message={messages.error} />
        )}
    </>
);
}