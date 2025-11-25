import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F8FAFC] pt-6 sm:justify-center sm:pt-0 selection:bg-emerald-100 selection:text-emerald-900">
            <div className="mb-8">
                <Link href="/" className="flex flex-col items-center gap-2 group">
                    <ApplicationLogo className="h-16 w-16 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">Haloan Track</span>
                </Link>
            </div>

            <div className="w-full overflow-hidden bg-white px-8 py-8 sm:max-w-md sm:rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                {children}
            </div>
        </div>
    );
}
