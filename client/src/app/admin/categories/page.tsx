"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import Swal from "sweetalert2";


export default function CategoriesPage() {
    const {
        fetchCategories,
        categories,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategoryStore();

    const [newCategory, setNewCategory] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = () => {
        if (newCategory.trim()) {
            createCategory(newCategory);
            setNewCategory("");
        }
    };

    const handleUpdate = () => {
        if (editId && editName.trim()) {
            updateCategory(editId, editName);
            setEditId(null);
            setEditName("");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6 mt-16">
            {/* Create New Category */}
            <div className="flex gap-5 mb-10">
                <input
                    type="text"
                    placeholder="New category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border border-gray-300 focus:border-red-500 focus:outline-none rounded px-3 py-2 w-full"
                />
                <button
                    onClick={handleCreate}
                    className="cursor-pointer bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600"
                >
                    Add
                </button>
            </div>

            {/* List Categories */}
            <ul className="space-y-4">
                {categories.map((category) => (
                    <li
                        key={category._id}
                        className="flex justify-between items-center border border-red-500 rounded px-3 py-2"
                    >
                        {editId === category._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="border focus:outline-none border-red-500 border-gray-300 px-2 py-1 rounded w-full mr-2"
                                />
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleUpdate}
                                        className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditId(null)}
                                        className="cursor-pointer bg-gray-400 text-white px-3 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span>{category.name}</span>
                                <div className="flex gap-5">
                                    <button
                                        onClick={() => {
                                            setEditId(category._id);
                                            setEditName(category.name);
                                        }}
                                        className="cursor-pointer bg-yellow-500 text-white px-8 py-2 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "This category will be deleted!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#d33",
                                                cancelButtonColor: "#3085d6",
                                                confirmButtonText: "Yes, delete it!",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteCategory(category._id);
                                                    Swal.fire("Deleted!", "The category has been deleted.", "success");
                                                }
                                            });
                                        }}
                                        className="cursor-pointer bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
