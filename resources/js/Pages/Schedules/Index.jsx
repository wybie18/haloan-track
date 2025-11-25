import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import { LuPlus, LuPencil, LuTrash2, LuEye } from "react-icons/lu";

export default function Index({ schedules }) {
    const [deletingSchedule, setDeletingSchedule] = useState(null);

    const handleDelete = () => {
        if (deletingSchedule) {
            router.delete(route("schedules.destroy", deletingSchedule.id), {
                onSuccess: () => setDeletingSchedule(null),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Schedules
                    </h2>
                    <Link href={route('schedules.create')}>
                        <Button
                            size="sm"
                            leftIcon={LuPlus}
                        >
                            New Schedule
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Schedules" />

            <div className="space-y-4">
                {schedules.data.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
                        <p className="text-slate-500 mb-4">
                            No schedules found.
                        </p>
                        <Link href={route('schedules.create')}>
                            <Button
                                leftIcon={LuPlus}
                            >
                                Create Your First Schedule
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                            Operation Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                            Frequency
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {schedules.data.map((schedule) => (
                                        <tr
                                            key={schedule.id}
                                            className="hover:bg-slate-50 transition"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-slate-900">
                                                    {schedule.name}
                                                </div>
                                                {schedule.description && (
                                                    <div className="text-sm text-slate-500 truncate max-w-xs">
                                                        {schedule.description}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {schedule.operation_type
                                                    ?.name || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {schedule.frequency}
                                                {schedule.interval &&
                                                    ` (${schedule.interval})`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                        schedule.is_active
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {schedule.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "schedules.show",
                                                            schedule.id
                                                        )}
                                                        className="text-[hsl(190,75%,45%)] hover:text-[hsl(190,75%,35%)] transition"
                                                    >
                                                        <LuEye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "schedules.edit",
                                                            schedule.id
                                                        )}
                                                        className="text-[hsl(190,75%,45%)] hover:text-[hsl(190,75%,35%)] transition"
                                                    >
                                                        <LuPencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            setDeletingSchedule(
                                                                schedule
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 transition"
                                                    >
                                                        <LuTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {schedules.links.length > 3 && (
                            <div className="px-6 py-4 border-t border-[hsl(195,60%,92%)] flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Showing {schedules.from} to {schedules.to}{" "}
                                    of {schedules.total} results
                                </div>
                                <div className="flex gap-2">
                                    {schedules.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1 text-sm rounded-md transition ${
                                                link.active
                                                    ? "bg-[hsl(190,75%,45%)] text-white"
                                                    : link.url
                                                    ? "bg-white border border-[hsl(195,60%,92%)] text-gray-600 hover:bg-[hsl(195,60%,96%)]"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                show={!!deletingSchedule}
                onClose={() => setDeletingSchedule(null)}
                maxWidth="md"
            >
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-[hsl(200,30%,15%)] mb-2">
                        Delete Schedule
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete "
                        {deletingSchedule?.name}"? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeletingSchedule(null)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} size="sm" variant="danger">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
