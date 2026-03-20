import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import saveIcon from "../../assets/save.png";
import cancelIcon from "../../assets/cancel.png";


export default function SavedNoteCard({ note, editMode, onEdit, onCancel, onSave, onDelete, register, errors, watchBody }) {
        if (!note) return null;
        
        return (
        <div className={`relative p-8 my-8 rounded-2xl border-2 transition-all duration-500 shadow-2xl ${
            editMode ? 'border-[#00b0c8] bg-[#e3f9fd]' : 'border-[#97ce4c] bg-[#f7fff0]'}`}>
            {editMode ? (
                <div className="mt-4 space-y-2 relative z-10">
                    <h3 className="text-xs font-black text-[#00b0c8] uppercase tracking-widest">📡 Modificando Registro...</h3>
                    <div>
                        <label className="text-[10px] font-bold text-[#00b0c8] uppercase ml-1">Asunto del Escaneo</label>
                        <input {...register("title")} className="w-full p-3 rounded-xl border-2 border-[#00b0c8]/30 focus:border-[#00b0c8] outline-none" />
                        {errors.title && <p className="text-red-400 text-[10px] mt-1 font-bold italic">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="text-[10px] mt-6 font-bold text-[#00b0c8] uppercase ml-1">Análisis de la Observación</label>
                        <textarea {...register("body")} className="w-full p-3 rounded-xl border-2 border-[#00b0c8]/30 focus:border-[#00b0c8] outline-none" rows="3" />
                        {errors.body && <p className="text-red-400 text-[10px] mt-1 font-bold italic">{errors.body.message}</p>}
                        <p className="text-[10px] text-[#00b0c8]  font-bold ml-auto">{watchBody.length}/200</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onSave} className="cursor-pointer p-3 bg-[#00b0c8] rounded-xl"><img src={saveIcon} className="w-6 invert" /></button>
                        <button onClick={onCancel} className="cursor-pointer p-3 bg-gray-400 rounded-xl"><img src={cancelIcon} className="w-6 invert" /></button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-start relative z-10">
                    <div className="flex-1">
                        <h3 className="text-xs font-black text-[#83b43a] uppercase tracking-widest">📜 Expediente Archivado</h3>
                        <h2 className="text-2xl font-black text-gray-800 uppercase mt-2">{note.title}</h2>
                        <p className="text-gray-600 italic border-l-4 border-[#97ce4c]/30 pl-4 mt-2">"{note.body}"</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button onClick={onEdit} className="cursor-pointer p-3 bg-white border-2 border-[#00b0c8]/20 rounded-xl hover:bg-blue-50 transition-all"><img src={editIcon} className="w-6" /></button>
                        <button onClick={onDelete} className="cursor-pointer p-3 bg-white border-2 border-red-100 rounded-xl hover:bg-red-50 transition-all"><img src={deleteIcon} className="w-6" /></button>
                    </div>
                </div>
            )}
        </div>
        )
}