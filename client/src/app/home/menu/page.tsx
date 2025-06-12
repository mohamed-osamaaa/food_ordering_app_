'use client';

import { useEffect } from 'react';
import { useItemStore } from '@/store/useItemsStore'; // Adjust path based on your project structure
import MenuItemCard from '../../../components/menuItemCard'; // Adjust path to where MenuItemCard is located

// Type definitions (same as in store for consistency)
interface Category {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Item {
    _id: string;
    name: string;
    description: string;
    category: string;
    itemImage: string;
    sizes: { size: string; price: number; _id: string }[];
    extraIngredients: { name: string; price: number; _id: string }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const MenuPage = () => {
    const { categories, itemsByCategory, isLoading, error, fetchItems } = useItemStore();

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <p className="text-xl text-gray-600">Loading...</p>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <p className="text-xl text-red-600">Error: {error}</p>
    //         </div>
    //     );
    // }

    return (
        <div className="container mx-auto p-4">
            {categories.length === 0 ? (
                <p className="text-center text-gray-600">No categories available</p>
            ) : (
                categories.map((category: Category) => (
                    <section key={category._id} className="mb-12">
                        <h2 className="text-5xl text-red-500 text-center font-semibold capitalize mt-7 mb-24 italic">{category.name}</h2>
                        {itemsByCategory[category.name.toLowerCase()]?.length > 0 && (
                            <div className="flex flex-wrap justify-center items-center p-3 gap-16">
                                {itemsByCategory[category.name.toLowerCase()].map((item: Item) => (
                                    <MenuItemCard
                                        key={item._id}
                                        itemId={item._id}
                                        image={item.itemImage}
                                        title={item.name}
                                        description={item.description}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                ))
            )}
        </div>
    );
};

export default MenuPage;