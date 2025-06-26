'use client';

import { useEffect } from 'react';
import { useItemStore } from '@/store/useItemsStore';
import MenuItemCard from '../../../components/menuItemCard';
import { motion } from 'framer-motion';

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
    category: {
        name: string;
    };
    itemImage: string;
    sizes: { size: string; price: number; _id: string }[];
    extraIngredients: { name: string; price: number; _id: string }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15, // delay between item animations
        },
    },
};

const MenuPage = () => {
    const { categories, itemsByCategory, fetchItems } = useItemStore();

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {categories.length === 0 ? (
                <p className="text-center text-gray-600">No categories available</p>
            ) : (
                categories.map((category: Category) => (
                    <section key={category._id} className="mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl text-red-500 text-center font-semibold capitalize mt-7 mb-12 italic">
                            {category.name}
                        </h2>
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {itemsByCategory[category.name.toLowerCase()].map((item: Item) => (
                                <motion.div
                                    key={item._id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    <MenuItemCard
                                        itemId={item._id}
                                        image={item.itemImage}
                                        title={item.name}
                                        description={item.description}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                ))
            )}
        </div>
    );
};

export default MenuPage;
