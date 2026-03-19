export default function Notification({ type, message }) {
    if (!message) return null;

    const isSuccess = type === 'success';

    return (
        <div className={`fixed top-5 right-5 z-[100] min-w-[300px] animate-in fade-in slide-in-from-right-10 duration-500`}>
            <div className={`relative p-5 rounded-2xl border-2 backdrop-blur-xl shadow-2xl transition-all ${
                isSuccess 
                ? 'border-[#97ce4c] bg-[#24282f]/80 shadow-[#97ce4c]/20' 
                : 'border-red-500 bg-[#24282f]/80 shadow-red-500/20'
            }`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-2/3 blur-[1px] ${
                    isSuccess ? 'bg-[#97ce4c]' : 'bg-red-500'
                }`}></div>

                <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${isSuccess ? 
                    'border-[#97ce4c] text-[#97ce4c]' : 'border-red-500 text-red-500'
                    }`}>
                        {isSuccess ? (
                            <span className="text-xl animate-pulse">✓</span>
                        ) : (
                            <span className="text-xl animate-bounce">!</span>
                        )}
                    </div>

                    <div className="flex-1">
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isSuccess ? 'text-[#97ce4c]' : 'text-red-500'}`}>
                            {isSuccess ? "Transmisión Exitosa" : "Falla en el Sistema"}
                        </p>
                        <p className="text-sm font-bold text-white leading-tight">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full overflow-hidden rounded-b-2xl">
                    <div className={`h-full animate-[progress_3s_linear_forwards] ${isSuccess ? 'bg-[#97ce4c]' : 'bg-red-500'}`}></div>
                </div>
            </div>
        </div>
    );
}