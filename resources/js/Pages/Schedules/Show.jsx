import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Button from '@/Components/Button';
import { LuArrowLeft, LuPencil, LuCalendar, LuClock, LuRepeat, LuCircleCheck, LuCircleX, LuWaves } from 'react-icons/lu';

export default function Show({ schedule }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('schedules.index')}
                            className="text-cyan-600 hover:text-cyan-700 transition"
                        >
                            <LuArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Schedule Details
                        </h2>
                    </div>
                    <Link href={route('schedules.edit', schedule.id)}>
                        <Button size='sm' leftIcon={LuPencil}>Edit</Button>
                    </Link>
                </div>
            }
        >
            <Head title={`Schedule: ${schedule.name}`} />

            <div className="w-full">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 px-6 py-8 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <LuWaves className="w-full h-full text-white scale-150 translate-y-4" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <h1 className="text-2xl font-bold mb-2 text-shadow-sm">{schedule.name}</h1>
                            <div className="flex items-center gap-2">
                                {schedule.is_active ? (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm border border-white/30 shadow-sm">
                                        <LuCircleCheck className="w-4 h-4" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm border border-white/30 shadow-sm">
                                        <LuCircleX className="w-4 h-4" />
                                        Inactive
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Description */}
                        {schedule.description && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                    Description
                                </h3>
                                <p className="text-slate-900">{schedule.description}</p>
                            </div>
                        )}

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Operation Type */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-cyan-50 rounded-lg">
                                    <LuRepeat className="w-5 h-5 text-cyan-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                        Operation Type
                                    </h3>
                                    <p className="text-slate-900 font-medium">
                                        {schedule.operation_type?.name || 'Not specified'}
                                    </p>
                                    {schedule.operation_type?.description && (
                                        <p className="text-sm text-slate-600 mt-1">
                                            {schedule.operation_type.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Frequency */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-cyan-50 rounded-lg">
                                    <LuCalendar className="w-5 h-5 text-cyan-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                        Frequency
                                    </h3>
                                    <p className="text-slate-900 font-medium capitalize">
                                        {schedule.frequency}
                                        {schedule.interval && ` (Every ${schedule.interval})`}
                                    </p>
                                </div>
                            </div>

                            {/* Time of Day */}
                            {schedule.time_of_day && (
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-cyan-50 rounded-lg">
                                        <LuClock className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                            Time of Day
                                        </h3>
                                        <p className="text-slate-900 font-medium">
                                            {schedule.time_of_day}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Base Offset Days */}
                            {schedule.base_offset_days !== null && schedule.base_offset_days !== '' && (
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-cyan-50 rounded-lg">
                                        <LuCalendar className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                            Base Offset Days
                                        </h3>
                                        <p className="text-slate-900 font-medium">
                                            {schedule.base_offset_days} days
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Metadata */}
                        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                            <div>
                                Created: {new Date(schedule.created_at).toLocaleDateString()}
                            </div>
                            {schedule.updated_at !== schedule.created_at && (
                                <div>
                                    Updated: {new Date(schedule.updated_at).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
