"use client";
import Image from "next/image";
import { useState } from "react";
import { useItemStore } from "../store/useItemsStore";
import ItemDetailsModal from "./ItemDetailsModal";

const MenuItemCard = ({ image, title, description, itemId }) => {
    // try {
    //     console.log(`${process.env.ITEM_IMAGES_SERVER_URL}${image}`);
    //     console.log(image);

    // } catch (e) {
    //     console.log("error image");
    // }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { fetchItemById, isLoading, error } = useItemStore();

    const imgURL = String(process.env.NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL) + String(image);

    const handleAddToCart = async () => {
        try {
            const item = await fetchItemById(itemId);
            setSelectedItem(item);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch item details:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <div className="w-full max-w-[300px] h-[400px] bg-gray-500 p-4 rounded-xl flex flex-col justify-between">
                <div className="h-[200px] w-full overflow-hidden rounded-lg">
                    <Image
                        src={imgURL}
                        alt={title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="mt-4 flex-1">
                    <h1 className="text-center text-black text-lg sm:text-xl font-semibold mb-2">{title}</h1>
                    <p className="text-center text-gray-300 text-sm sm:text-base mb-4 line-clamp-3">{description}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="cursor-pointer px-6 py-3 rounded-3xl bg-red-600 hover:bg-white hover:text-red-700 shadow-md w-full text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                    Add to cart
                </button>
            </div>

            {isModalOpen && selectedItem && (
                <ItemDetailsModal
                    item={selectedItem}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default MenuItemCard;
