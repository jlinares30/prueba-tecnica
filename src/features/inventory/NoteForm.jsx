import { useInventory } from "./useInventory";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { noteSchema } from "../../schemas/noteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCharacterDetail } from "../characters/useCharacterDetail";
import Notification from "../../components/Notification";
import Skeleton from "../../components/Skeleton";
import Button from "../../components/Button";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import saveIcon from "../../assets/save.png";
import cancelIcon from "../../assets/cancel.png";


export default function NoteForm() {
    const { id } = useParams();
    const {isLoading} = useCharacterDetail(id);
    const { createNote, isCreating, deleteNote, isDeleting } = useInventory();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [noteSaved, setNoteSaved] = useState("");

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



        const handleEdit = () => {
            setEditMode(true);
        }

        const handleCancel = () => {
            setEditMode(false);
        }

        const handleSave = () => {
            setEditMode(false);
        }

        const handleDelete = () => {
            setNoteSaved("");
            setSuccessMessage("Nota eliminada exitosamente.");
            setTimeout(() => setSuccessMessage(false), 3000);
        }

    return(
        <>        
            {noteSaved && !editMode ? (
                <div className="flex justify-between g-slate-50 p-8 mb-6 rounded-2xl border-2 border-gray-300">
                    <div>
                        <h3 className="text-xl font-semibold text-green-600">Última Nota Guardada:</h3>
                        <p className="text-gray-700 mt-2"><span className="font-bold">Asunto:</span> {noteSaved.title}</p>
                        <p className="text-gray-600 mt-1"><span className="font-bold">Descripción:</span> {noteSaved.body}</p>
                    </div>
                    <div className="flex justify-between flex-col items-center gap-4">
                        <Button onClick={handleEdit} className={`w-16 hover:bg-gray-300 text-gray-700`}>
                            <img src={editIcon} alt="Editar" />
                        </Button>
                        <Button onClick={handleDelete} className={`w-16 hover:bg-red-600 text-white`} disabled={isPending}>
                            <img src={deleteIcon} alt="Eliminar" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between mb-6 p-8 rounded-2xl border-2 border-dashed border-gray-300">
                    <div>
                        <h3 className="text-xl font-semibold text-green-600">Última Nota Guardada:</h3>
                        <input type="text" {...register("title")} placeholder="Ej: Análisis de ADN o Objeto encontrado" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#97ce4c] outline-none" />
                        <p className="text-gray-700 mt-2"><span className="font-bold">Asunto:</span> {noteSaved.title}</p>
                        <p className="text-gray-600 mt-1"><span className="font-bold">Descripción:</span> {noteSaved.body}</p>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <Button onClick={handleSave} className={`w-18  hover:bg-gray-300 text-gray-700`}>
                            <img src={saveIcon} alt="Guardar" />                            
                        </Button>
                        <Button onClick={handleCancel} className={`w-18 hover:bg-red-600 text-white`}>
                            <img src={cancelIcon} alt="Cancelar" />
                        </Button>
                    </div>
                </div>
            )
            
            }

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
                        <Button disabled={isPending} onClick={handleSubmit(onSubmit)} className={`bg-[#97ce4c] hover:bg-[#86b943] text-white w-full`}>
                            Guardar Nota
                        </Button>
                    )}
                </form>
            </div>
            )}
            {successMessage && (
                <Notification type="success" message={successMessage} />
            )}
            {errorMessage && (
                <Notification type="error" message={errorMessage} />
            )}
        </>
    );
}