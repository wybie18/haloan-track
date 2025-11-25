import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    LuLayoutDashboard,
    LuUsers,
    LuCalendar,
    LuWaves,
    LuMenu,
    LuX,
    LuUser,
    LuLogOut,
} from "react-icons/lu";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "dashboard", icon: LuLayoutDashboard },
        { name: "Users", href: "users.index", icon: LuUsers },
        { name: "Schedules", href: "schedules.index", icon: LuCalendar },
        { name: "Ponds", href: "ponds.index", icon: LuWaves },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Sidebar for desktop */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-slate-200 px-6 pb-4">
                    {/* Logo */}
                    <div className="flex h-16 shrink-0 items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-8 w-auto text-emerald-600" />
                            <span className="text-lg font-bold text-slate-900">
                                Haloan Track
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    <li className="mt-auto mb-6">
                                        <Link
                                            href={route("profile.edit")}
                                            as="div"
                                            className="rounded-xl bg-slate-50 border border-slate-100 p-3 cursor-pointer hover:bg-slate-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-900 truncate">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    {navigation.map((item) => {
                                        const isActive =
                                            route().current(item.href) ||
                                            route().current(`${item.href}.*`);
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={route(item.href)}
                                                    className={`group flex gap-x-3 rounded-lg p-2.5 text-sm font-medium leading-6 transition-all ${
                                                        isActive
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                    }`}
                                                >
                                                    <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>

                            {/* User section at bottom */}
                            <li className="mt-auto">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className={`group flex gap-x-3 rounded-lg p-2.5 text-sm font-medium leading-6 transition-all w-full ${
                                        route().current("logout")
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    <LuLogOut className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-slate-600" />
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Mobile sidebar */}
            <div className={`relative z-50 lg:hidden ${sidebarOpen ? "" : "hidden"}`}>
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-0 flex">
                    <div className="relative mr-16 flex w-full max-w-xs flex-1">
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                            <button onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                <LuX className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                            <div className="flex h-16 shrink-0 items-center gap-3">
                                <ApplicationLogo className="h-8 w-auto text-emerald-600" />
                                <span className="text-lg font-bold text-slate-900">Haloan Track</span>
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            <li className="mt-auto mb-6">
                                                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-slate-900 truncate">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-xs text-slate-500 truncate">
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            {navigation.map((item) => {
                                                const isActive = route().current(item.href) || route().current(`${item.href}.*`);
                                                return (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={route(item.href)}
                                                            onClick={() => setSidebarOpen(false)}
                                                            className={`group flex gap-x-3 rounded-lg p-2.5 text-sm font-medium leading-6 transition-all ${
                                                                isActive
                                                                    ? "bg-emerald-50 text-emerald-700"
                                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                            }`}
                                                        >
                                                            <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                    <li className="mt-auto">
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="group flex gap-x-3 rounded-lg p-2.5 text-sm font-medium leading-6 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all w-full"
                                        >
                                            <LuLogOut className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-slate-600" />
                                            Log out
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="lg:pl-64">
                {/* Mobile top bar */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-slate-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <LuMenu className="h-6 w-6" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-slate-900">
                        Haloan Track
                    </div>
                </div>

                {/* Page header */}
                {header && (
                    <header className="bg-white border-b border-slate-200">
                        <div className="px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* Main content */}
                <main className="py-6">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
