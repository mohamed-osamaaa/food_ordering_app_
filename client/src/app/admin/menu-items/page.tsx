'use client';

import { useEffect, useState } from "react";
import { useItemStore } from "@/store/useItemsAdminStore";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function ItemsPage() {
    const {
        items,
        fetchItems,
        createItem,
        updateItem,
        deleteItem,
        deleteExtraIngredient,
        deleteSize,
    } = useItemStore();

    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState<any>({
        name: "",
        description: "",
        category: "",
        price: "",
        itemImage: null,
        sizes: [],
        extraIngredients: [],
    });

    const [size, setSize] = useState({ size: "", price: "" });
    const [extraIngredient, setExtraIngredient] = useState({ name: "", price: "" });

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const handleCreate = () => {
        setFormData({
            name: "",
            description: "",
            category: "",
            price: "",
            itemImage: null,
            sizes: [],
            extraIngredients: [],
        });
        setSelectedItem(null);
        setIsEditing(false);
        setShowForm(true);
    };

    const handleEdit = (item: any) => {
        setFormData({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            itemImage: null,
            sizes: item.sizes || [],
            extraIngredients: item.extraIngredients || [],
        });
        setSelectedItem(item);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && selectedItem) {
            await updateItem(selectedItem._id, formData);
        } else {
            await createItem(formData);
        }
        setShowForm(false);
    };

    const handleDelete = async () => {
        if (selectedItem) {
            await deleteItem(selectedItem._id);
            setShowForm(false);
        }
    };

    const confirmDeleteExtra = async (ingredient: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete extra ingredient "${ingredient}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed && selectedItem) {
            await deleteExtraIngredient(selectedItem._id, ingredient);
        }
    };

    const confirmDeleteSize = async (sizeValue: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete size "${sizeValue}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed && selectedItem) {
            await deleteSize(selectedItem._id, sizeValue);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col items-center mb-10 mt-6">
                <button
                    className="bg-red-500 text-white px-6 py-2 rounded-2xl cursor-pointer hover:bg-red-600 transition"
                    onClick={handleCreate}
                >
                    Create New Item
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-10">
                {items.map((item: any) => (
                    <div
                        key={item._id}
                        className="border rounded-lg p-2 shadow hover:shadow-md transition cursor-pointer"
                        onClick={() => handleEdit(item)}
                    >
                        <Image
                            src={process.env.NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL + item.itemImage}
                            alt={item.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="mt-2 text-center font-semibold">{item.name}</h2>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 backdrop flex items-center justify-center z-50 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4 relative overflow-y-auto max-h-[90vh]"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">
                                {isEditing ? "Edit Item" : "Create Item"}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="cursor-pointer w-6 h-6 flex items-center justify-center text-red-500 hover:text-gray-700 text-xl font-bold cursor-pointer border-2 border-red-500 hover:border-gray-700 rounded-full"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Category Name"
                            value={formData.category.name}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />

                        <input
                            type="file"
                            className="cursor-pointer w-full border p-2 rounded"
                            onChange={(e) => setFormData({ ...formData, itemImage: e.target.files?.[0] })}
                            accept="image/*"
                        />

                        {/* Sizes */}
                        <div className="space-y-2">
                            <h3 className="font-semibold">Sizes:</h3>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder="Size"
                                    value={size.size}
                                    onChange={(e) => setSize({ ...size, size: e.target.value })}
                                    className="border p-1 w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={size.price}
                                    onChange={(e) => setSize({ ...size, price: e.target.value })}
                                    className="border p-1 w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            sizes: [...formData.sizes, { ...size, price: Number(size.price) }],
                                        });
                                        setSize({ size: "", price: "" });
                                    }}
                                    className="cursor-pointer bg-blue-500 text-white px-3 rounded hover:bg-blue-600 transition"
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {formData.sizes.map((s: any, idx: number) => (
                                    <li key={idx} className="flex justify-between items-center text-sm">
                                        <span>{s.size} - ${s.price}</span>
                                        {isEditing && (
                                            <Trash2
                                                size={16}
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => confirmDeleteSize(s.size)}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Extra Ingredients */}
                        <div className="space-y-2">
                            <h3 className="font-semibold">Extra Ingredients:</h3>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={extraIngredient.name}
                                    onChange={(e) =>
                                        setExtraIngredient({ ...extraIngredient, name: e.target.value })
                                    }
                                    className="border p-1 w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={extraIngredient.price}
                                    onChange={(e) =>
                                        setExtraIngredient({ ...extraIngredient, price: e.target.value })
                                    }
                                    className="border p-1 w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            extraIngredients: [
                                                ...formData.extraIngredients,
                                                {
                                                    ...extraIngredient,
                                                    price: Number(extraIngredient.price),
                                                },
                                            ],
                                        });
                                        setExtraIngredient({ name: "", price: "" });
                                    }}
                                    className="cursor-pointer bg-blue-500 text-white px-3 rounded hover:bg-blue-600 transition"
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {formData.extraIngredients.map((ing: any, idx: number) => (
                                    <li key={idx} className="flex justify-between items-center text-sm">
                                        <span>{ing.name} - ${ing.price}</span>
                                        {isEditing && (
                                            <Trash2
                                                size={16}
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => confirmDeleteExtra(ing.name)}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            {isEditing && (
                                <button
                                    type="button"
                                    className="cursor-pointer bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                                    onClick={handleDelete}
                                >
                                    Delete Item
                                </button>
                            )}
                            <button
                                type="submit"
                                className="cursor-pointer bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition ml-auto"
                            >
                                {isEditing ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
