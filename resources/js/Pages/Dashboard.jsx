import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { LuUsers, LuWaves, LuFish, LuCalendar, LuActivity, LuTrendingUp } from "react-icons/lu";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ stats, pondsByStatus, schedulesByType, recentPonds }) {
    const user = usePage().props.auth.user;
    const statusColors = ['#06b6d4', '#3b82f6', '#64748b', '#ef4444']; // Cyan, Blue, Slate, Red

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Dashboard Overview
                    </h2>
                    <span className="text-sm text-slate-500">
                        Welcome back, {user.name}!
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-50 rounded-xl">
                                <LuUsers className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2.5%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.total_users}</h3>
                        <p className="text-sm text-slate-500">Total Users</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-cyan-50 rounded-xl">
                                <LuWaves className="w-6 h-6 text-cyan-600" />
                            </div>
                            <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">Active</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.total_ponds}</h3>
                        <p className="text-sm text-slate-500">Total Ponds</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <LuFish className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Live</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.total_fish.toLocaleString()}</h3>
                        <p className="text-sm text-slate-500">Total Fish Count</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-violet-50 rounded-xl">
                                <LuCalendar className="w-6 h-6 text-violet-600" />
                            </div>
                            <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">Running</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.active_schedules}</h3>
                        <p className="text-sm text-slate-500">Active Schedules</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pond Status Chart */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Pond Status</h3>
                            <LuActivity className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pondsByStatus}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="count"
                                        >
                                            {pondsByStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                                {pondsByStatus.map((status, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[index % statusColors.length] }}></div>
                                        <span className="text-sm text-slate-600 capitalize">{status.status}</span>
                                        <span className="text-sm font-bold text-slate-900 ml-auto">{status.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Schedule Types Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Schedule Distribution</h3>
                            <LuTrendingUp className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={schedulesByType} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        tickFormatter={(value) => value.split(' ')[0]}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Recent Ponds</h3>
                        <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Pond Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fish Count</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentPonds.map((pond) => (
                                    <tr key={pond.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-cyan-50 rounded-lg">
                                                    <LuWaves className="w-4 h-4 text-cyan-600" />
                                                </div>
                                                <span className="font-medium text-slate-900">{pond.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {pond.user?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                            {pond.fish_count.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                {pond.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(pond.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
