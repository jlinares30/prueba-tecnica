import { useInventory } from "../features/inventory/useInventory";
import { useState } from "react";

export const useNoteUI = (id, noteSaved, setNoteSaved) => {
    const { createNote, updateNote, deleteNote, isCreating, isDeleting } = useInventory();
    const [editMode, setEditMode] = useState(false);
    const [messages, setMessages] = useState({ success: "", error: "" });


        const showMsg = (msg, type = "success") => {
            setMessages(prev => ({ ...prev, [type]: msg }));
            setTimeout(() => setMessages(prev => ({ ...prev, [type]: "" })), 3000);
        };

        
        const onSubmit = async (data, reset) => {
            const payload = {
                ...data,
                userId: id,
            };
            createNote(payload,{
                onSuccess: (response) => {
                    //console.log("Nota guardada exitosamente:", response);
                    setNoteSaved(response);
                    showMsg("Nota guardada exitosamente.");
                    reset();
                },
                onError: (error) => {
                    //console.error("Error al guardar la nota:", error);
                    showMsg("Error al guardar la nota. Por favor, inténtalo de nuevo.", "error");
                    reset();
                },
            });
        };

        const onSaveEdit = async (data, reset) => {
            const payload = {
                ...data,
                userId: id,
            };
            updateNote({id: 1, data: payload}, {
                onSuccess: (response) => {
                    //console.log("Nota actualizada exitosamente:", response);
                    setNoteSaved(response.data);
                    showMsg("Nota actualizada exitosamente.");
                    setEditMode(false);
                    reset();
                },
                onError: (error) => {
                    //console.error("Error al actualizar la nota:", error);
                    showMsg("Error al actualizar la nota. Por favor, inténtalo de nuevo.", "error");
                    setEditMode(false);
                },
            });
        }

        const onDelete = (reset) => {
            deleteNote(noteSaved.id, {
                onSuccess: () => {
                    //console.log("Nota eliminada exitosamente");
                    setNoteSaved("");
                    showMsg("Nota eliminada exitosamente.");
                    reset();
                },
                onError: (error) => {
                    //console.error("Error al eliminar la nota:", error);
                    showMsg("Error al eliminar la nota. Por favor, inténtalo de nuevo.", "error");
                },
            });
        }
    
    return {
        editMode,
        setEditMode,
        onSubmit,
        onSaveEdit,
        onDelete,
        isCreating,
        isDeleting,
        messages
    }
}


