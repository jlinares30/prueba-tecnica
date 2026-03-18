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
    const { createNote, isCreating, deleteNote, isDeleting, updateNote,isUpdating } = useInventory();
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
            setValue
        } = useForm({
            //resolver pasa los datos del form a traves de la validacion de zod
            resolver: zodResolver(noteSchema),
        });
    
        const onSubmit = async (data) => {
            const payload = {
                ...data,
                userId: id,
            };
            createNote(payload,{
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

        const onSaveEdit = async (data) => {
            const payload = {
                ...data,
                userId: id,
            };
            updateNote({id: 1, data: payload}, {
                onSuccess: (response) => {
                    console.log("Nota actualizada exitosamente:", response);
                    setNoteSaved(response.data);
                    setSuccessMessage("Nota actualizada exitosamente.");
                    setTimeout(() => setSuccessMessage(false), 3000);
                    setEditMode(false);
                },
                onError: (error) => {
                    console.error("Error al actualizar la nota:", error);
                    setErrorMessage("Error al actualizar la nota. Por favor, inténtalo de nuevo.");
                    setTimeout(() => setErrorMessage(false), 3000);
                    setEditMode(false);
                },
            });
        }

        const onDelete = () => {
            deleteNote(noteSaved.id, {
                onSuccess: () => {
                    console.log("Nota eliminada exitosamente");
                    setNoteSaved("");
                    setSuccessMessage("Nota eliminada exitosamente.");
                    setTimeout(() => setSuccessMessage(false), 3000);
                    reset();
                },
                onError: (error) => {
                    console.error("Error al eliminar la nota:", error);
                    setErrorMessage("Error al eliminar la nota. Por favor, inténtalo de nuevo.");
                    setTimeout(() => setErrorMessage(false), 3000);
                },
            });
        }

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
console.log("Estado actual de la nota:", noteSaved);
    return(
        <>
            {noteSaved && (
                <div className={`flex justify-between p-8 mb-6 rounded-2xl border-2 transition-all ${editMode ? 'border-dashed border-blue-400 bg-blue-50' : 'border-gray-300 bg-slate-50'}`}>
                    
                    <div className="flex-1">
                        <h3 className={`text-xl font-semibold ${editMode ? 'text-blue-600' : 'text-green-600'}`}>
                            {editMode ? "Modo Edición" : "Última Nota Guardada:"}
                        </h3>

                        {editMode ? (
                            <div className="mt-4 space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Asunto</label>
                                    <input type="text" {...register("title")} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none" />
                                    {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title.message}</p>}
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Descripción</label>
                                    <textarea {...register("body")} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none" rows="3" />
                                    <p className={`text-xs text-right text-gray-400`}>
                                        {watchBody.length} / 200 caracteres
                                    </p>
                                    {errors.body && <p className="text-red-500 text-xs mt-1 font-medium">{errors.body.message}</p>}
                                </div>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <p className="text-gray-700"><span className="font-bold">Asunto:</span> {noteSaved.title}</p>
                                <p className="text-gray-600 mt-1"><span className="font-bold">Descripción:</span> {noteSaved.body}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center gap-4 ml-6">
                        {editMode ? (
                            <>
                                <Button onClick={handleSubmit(onSaveEdit)} className="w-14 h-14 bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-lg flex items-center justify-center">
                                    <img src={saveIcon} alt="Guardar" className="w-6 h-6 invert" />
                                </Button>
                                <Button onClick={handleCancel} className="w-14 h-14 bg-gray-400 hover:bg-gray-500 p-2 rounded-full shadow-lg flex items-center justify-center">
                                    <img src={cancelIcon} alt="Cancelar" className="w-6 h-6 invert" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={handleEdit} className="w-14 h-14 bg-white hover:bg-gray-100 border border-gray-200 p-2 rounded-full shadow-sm flex items-center justify-center">
                                    <img src={editIcon} alt="Editar" className="w-6 h-6" />
                                </Button>
                                <Button onClick={onDelete} disabled={isDeleting} className="w-14 h-14 bg-white hover:bg-red-50 p-2 rounded-full border border-red-100 shadow-sm flex items-center justify-center">
                                    <img src={deleteIcon} alt="Eliminar" className="w-6 h-6" />
                                </Button>
                            </>
                        )}
                    </div>
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
                <>
                { !editMode && (
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

                            {isCreating ? (
                                <div className="flex flex-col items-center gap-3">
                                        <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#97ce4c] animate-[spin_3s_linear_infinite]"></div>
                                        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#46d252] to-[#97ce4c] animate-pulse shadow-[0_0_15px_#97ce4c]"></div>
                                        </div>
                                        <p className="text-[#97ce4c] font-bold animate-pulse text-sm">Escaneando Dimensión...</p>
                                    </div>
                            ) : (
                                <Button disabled={isCreating} onClick={handleSubmit(onSubmit)} className={`bg-[#97ce4c] hover:bg-[#86b943] text-white w-full`}>
                                    Guardar Nota
                                </Button>
                            )}
                        </form>
                    </div>
                )}
                </>
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