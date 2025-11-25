import { Head } from "@inertiajs/react";
import { LuFish, LuBell, LuActivity, LuDownload, LuWaves, LuSprout } from "react-icons/lu";
import Button from "../Components/Button";

export default function Welcome() {
    return (
        <>
            <Head title="Haloan Track - Mudfish Pond Manager" />
            <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url("/mudfish.png")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Darker, muddier/natural gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-[#F8FAFC]" />
                    </div>

                    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-50 mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-sm font-medium tracking-wide">Striped Snakehead Management</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Cultivate <span className="text-emerald-400">Thriving</span> <br /> Mudfish Ponds.
                        </h1>

                        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                            The minimalist tool for serious farmers. Track feeding, cleaning, sorting, and harvesting—even offline.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button leftIcon={LuDownload} size="lg" className="w-full sm:w-auto shadow-emerald-900/20">
                                Download App
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 px-4 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to grow.</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Streamlined tools designed specifically for the lifecycle of the Striped Snakehead.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1: Pond & Count */}
                        <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <LuFish className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Pond Population</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Create digital ponds and maintain accurate fish counts. Monitor mortality rates and population density at a glance.
                            </p>
                        </div>

                        {/* Feature 2: Offline Schedules */}
                        <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <LuBell className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Offline Schedules</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Never miss a task. Receive local notifications for feeding and maintenance schedules, even without an internet connection.
                            </p>
                        </div>

                        {/* Feature 3: Activity Tracking */}
                        <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <LuActivity className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Lifecycle Tracking</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Log every critical event: Feeding times, Pond cleaning, Size sorting, and Harvesting data for better yield analysis.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Minimalist Stats/Info Section */}
                <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <LuWaves className="w-full h-full text-emerald-500" />
                    </div>
                    <div className="max-w-6xl mx-auto px-4 relative z-10">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Designed for the Mudfish Farmer.</h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="mt-1"><LuSprout className="w-6 h-6 text-emerald-400" /></div>
                                        <div>
                                            <h4 className="font-semibold text-lg">Size Sorting</h4>
                                            <p className="text-slate-400">Track growth stages and sort fish efficiently to prevent cannibalism.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1"><LuWaves className="w-6 h-6 text-emerald-400" /></div>
                                        <div>
                                            <h4 className="font-semibold text-lg">Water Quality</h4>
                                            <p className="text-slate-400">Reminders for water changes and cleaning to keep your snakeheads healthy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold text-xl">Today's Schedule</h3>
                                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">OFFLINE READY</span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { time: "07:00 AM", task: "Morning Feeding", status: "Done" },
                                        { time: "02:00 PM", task: "Size Sorting (Pond A)", status: "Pending" },
                                        { time: "05:00 PM", task: "Evening Feeding", status: "Pending" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-slate-700">
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-mono text-slate-400">{item.time}</span>
                                                <span className="font-medium">{item.task}</span>
                                            </div>
                                            {item.status === "Done" ? (
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-4 bg-white border-t border-slate-100">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-slate-900">Haloan Track</h3>
                            <p className="text-sm text-slate-500">Mudfish farming simplified.</p>
                        </div>
                        <div className="flex gap-6 text-sm text-slate-600">
                            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
                            <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
                        </div>
                        <p className="text-sm text-slate-400">© 2025 Haloan Track</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
