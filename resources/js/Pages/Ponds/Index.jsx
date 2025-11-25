import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { LuWaves, LuFish, LuCalendar, LuUser, LuDroplets } from "react-icons/lu";

export default function Index({ ponds }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Ponds
                    </h2>
                </div>
            }
        >
            <Head title="Ponds" />

            <div className="space-y-6">
                {ponds.data.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LuWaves className="w-8 h-8 text-cyan-500" />
                        </div>
                        <p className="text-slate-500 mb-4">
                            No ponds found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ponds.data.map((pond) => (
                            <div 
                                key={pond.id} 
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                            >
                                {/* Water Theme Header */}
                                <div className="h-32 bg-gradient-to-br from-cyan-500 to-blue-600 relative overflow-hidden">
                                    {/* Decorative Elements */}
                                    <div className="absolute inset-0 opacity-10">
                                        <LuWaves className="w-full h-full text-white scale-150 translate-y-4" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>
                                    
                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-md bg-white/20 text-white border border-white/30 shadow-sm`}>
                                            {pond.status}
                                        </span>
                                    </div>

                                    {/* Title Section */}
                                    <div className="absolute bottom-4 left-6 text-white z-10">
                                        <h3 className="text-xl font-bold tracking-tight mb-0.5 text-shadow-sm">{pond.name}</h3>
                                        <div className="flex items-center gap-2 text-cyan-50 text-sm font-medium">
                                            <LuUser className="w-3.5 h-3.5" />
                                            <span>{pond.user?.name}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Fish Count Card */}
                                        <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 group-hover:border-cyan-200 transition-colors">
                                            <div className="flex items-center gap-2 text-cyan-600 mb-2">
                                                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                                    <LuFish className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider">Fish</span>
                                            </div>
                                            <p className="text-2xl font-bold text-slate-700">
                                                {pond.fish_count.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Date Card */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-slate-200 transition-colors">
                                            <div className="flex items-center gap-2 text-slate-500 mb-2">
                                                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                                    <LuCalendar className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider">Date</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700 mt-1">
                                                {new Date(pond.registered_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {ponds.links && ponds.links.length > 3 && (
                    <div className="flex justify-center pt-6">
                        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                            {ponds.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`px-4 py-2 text-sm rounded-lg transition font-medium ${
                                        link.active
                                            ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                                            : link.url
                                            ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            : "text-slate-300 cursor-not-allowed"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    preserveScroll
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
