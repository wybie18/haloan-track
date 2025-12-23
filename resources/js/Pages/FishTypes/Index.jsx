import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";

export default function Index({ fishTypes }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingFishType, setEditingFishType] = useState(null);
    const [deletingFishType, setDeletingFishType] = useState(null);

    // Create Form
    const { 
        data: createData, 
        setData: setCreateData, 
        post: createPost, 
        processing: createProcessing, 
        errors: createErrors, 
        reset: createReset,
        clearErrors: createClearErrors
    } = useForm({
        name: '',
        description: '',
    });

    // Edit Form
    const { 
        data: editData, 
        setData: setEditData, 
        put: editPut, 
        processing: editProcessing, 
        errors: editErrors, 
        reset: editReset,
        clearErrors: editClearErrors
    } = useForm({
        name: '',
        description: '',
    });

    // Delete Form
    const { 
        delete: destroy, 
        processing: deleteProcessing 
    } = useForm();

    const openCreateModal = () => {
        createReset();
        createClearErrors();
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        createReset();
    };

    const handleCreate = (e) => {
        e.preventDefault();
        createPost(route('fish-types.store'), {
            onSuccess: () => closeCreateModal(),
        });
    };

    const openEditModal = (fishType) => {
        setEditingFishType(fishType);
        setEditData({
            name: fishType.name,
            description: fishType.description || '',
        });
        editClearErrors();
    };

    const closeEditModal = () => {
        setEditingFishType(null);
        editReset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editPut(route('fish-types.update', editingFishType.id), {
            onSuccess: () => closeEditModal(),
        });
    };

    const openDeleteModal = (fishType) => {
        setDeletingFishType(fishType);
    };

    const closeDeleteModal = () => {
        setDeletingFishType(null);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('fish-types.destroy', deletingFishType.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Fish Types
                    </h2>
                    <Button
                        size="sm"
                        leftIcon={LuPlus}
                        onClick={openCreateModal}
                    >
                        New Fish Type
                    </Button>
                </div>
            }
        >
            <Head title="Fish Types" />

            <div className="space-y-4">
                {fishTypes.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
                        <p className="text-slate-500 mb-4">
                            No fish types found.
                        </p>
                        <Button
                            leftIcon={LuPlus}
                            onClick={openCreateModal}
                        >
                            Create Your First Fish Type
                        </Button>
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
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {fishTypes.map((fishType) => (
                                        <tr
                                            key={fishType.id}
                                            className="hover:bg-slate-50 transition"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-slate-900">
                                                    {fishType.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {fishType.description || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(fishType)}
                                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <LuPencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(fishType)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete"
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
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <form onSubmit={handleCreate} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create Fish Type
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="create_name" value="Name" />
                        <TextInput
                            id="create_name"
                            value={createData.name}
                            onChange={(e) => setCreateData('name', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="e.g. Mudfish"
                        />
                        <InputError message={createErrors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="create_description" value="Description" />
                        <TextInput
                            id="create_description"
                            value={createData.description}
                            onChange={(e) => setCreateData('description', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Optional description"
                        />
                        <InputError message={createErrors.description} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeCreateModal}>
                            Cancel
                        </SecondaryButton>
                        <Button disabled={createProcessing}>
                            Create Fish Type
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={!!editingFishType} onClose={closeEditModal}>
                <form onSubmit={handleUpdate} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Fish Type
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_name" value="Name" />
                        <TextInput
                            id="edit_name"
                            value={editData.name}
                            onChange={(e) => setEditData('name', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                        />
                        <InputError message={editErrors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_description" value="Description" />
                        <TextInput
                            id="edit_description"
                            value={editData.description}
                            onChange={(e) => setEditData('description', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={editErrors.description} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeEditModal}>
                            Cancel
                        </SecondaryButton>
                        <Button disabled={editProcessing}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal show={!!deletingFishType} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Delete Fish Type
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to delete this fish type? This action cannot be undone.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeDeleteModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton 
                            onClick={handleDelete}
                            disabled={deleteProcessing}
                        >
                            Delete Fish Type
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
