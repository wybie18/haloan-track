import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Button from '@/Components/Button';
import { LuArrowLeft } from 'react-icons/lu';

export default function Create({ operationTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        operation_type_id: '',
        name: '',
        description: '',
        frequency: '',
        interval: '',
        base_offset_days: '',
        time_of_day: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('schedules.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('schedules.index')}
                        className="text-emerald-600 hover:text-emerald-700 transition"
                    >
                        <LuArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-semibold text-slate-900">
                        Create Schedule
                    </h2>
                </div>
            }
        >
            <Head title="Create Schedule" />

            <div className="w-full">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Operation Type */}
                        <div>
                            <InputLabel htmlFor="operation_type_id" value="Operation Type" />
                            <select
                                id="operation_type_id"
                                value={data.operation_type_id}
                                onChange={(e) => setData('operation_type_id', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            >
                                <option value="">Select an operation type</option>
                                {operationTypes?.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.operation_type_id} className="mt-2" />
                        </div>

                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Schedule Name" />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                placeholder="e.g., Weekly Water Change"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel htmlFor="description" value="Description (Optional)" />
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                rows="3"
                                placeholder="Describe this schedule..."
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Frequency and Interval */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="frequency" value="Frequency" />
                                <select
                                    id="frequency"
                                    value={data.frequency}
                                    onChange={(e) => setData('frequency', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="">Select frequency</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="custom">Custom</option>
                                </select>
                                <InputError message={errors.frequency} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="interval" value="Interval" />
                                <TextInput
                                    id="interval"
                                    type="number"
                                    value={data.interval}
                                    onChange={(e) => setData('interval', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="e.g., 2"
                                    min="1"
                                />
                                <InputError message={errors.interval} className="mt-2" />
                            </div>
                        </div>

                        {/* Base Offset Days and Time of Day */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="base_offset_days" value="Days" />
                                <TextInput
                                    id="base_offset_days"
                                    type="number"
                                    value={data.base_offset_days}
                                    onChange={(e) => setData('base_offset_days', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="0"
                                />
                                <InputError message={errors.base_offset_days} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="time_of_day" value="Time of Day" />
                                <TextInput
                                    id="time_of_day"
                                    type="time"
                                    value={data.time_of_day}
                                    onChange={(e) => setData('time_of_day', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                                <InputError message={errors.time_of_day} className="mt-2" />
                            </div>
                        </div>

                        {/* Is Active */}
                        <div className="flex items-center gap-2">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <InputLabel htmlFor="is_active" value="Active" className="!mb-0" />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end pt-6 border-t border-slate-200">
                            <Link href={route('schedules.index')}>
                                <Button size="sm" type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </Link>
                            <Button size="sm" type="submit" disabled={processing}>
                                Create Schedule
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
