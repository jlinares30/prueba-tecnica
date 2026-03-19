import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#24282f]/80 backdrop-blur-md border-b-2 border-[#97ce4c]/20 shadow-lg shadow-black/50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                
                <Link to="/" className="group flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#97ce4c] group-hover:animate-spin-slow"></div>
                        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#46d252] to-[#97ce4c] shadow-[0_0_10px_#97ce4c]"></div>
                    </div>
                    
                    <h2 className="text-2xl font-black italic tracking-tighter text-white group-hover:text-[#97ce4c] transition-colors">
                        RICK Y <span className="text-[#97ce4c]">MORTY</span>
                    </h2>
                </Link>

                <div className="hidden sm:flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-[#97ce4c] animate-pulse shadow-[0_0_8px_#97ce4c]"></div>
                </div>
            </div>
        </header>
    );
}