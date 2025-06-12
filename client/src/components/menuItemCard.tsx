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
            <div className="bg-gray-500 w-80 h-[500px] p-4 rounded-xl flex flex-col justify-between">
                <div className="flex-grow">
                    <div className="w-full h-64 overflow-hidden rounded-lg">
                        <Image
                            // src={`${process.env.ITEM_IMAGES_SERVER_URL}${image}`}
                            src={imgURL}
                            alt={title}
                            width={320}
                            height={256}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <div className="flex-grow">
                    <h1 className="text-center text-black text-xl font-semibold my-4">{title}</h1>
                    <p className="text-center text-gray-300 text-sm my-4 line-clamp-3">{description}</p>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="
                                flex justify-center items-center gap-3 
                                px-6 py-3 rounded-3xl 
                                bg-red-600 hover:bg-white hover:text-red-700 
                                shadow-md cursor-pointer w-full 
                                text-white font-medium transition duration-300
                                disabled:opacity-50 disabled:cursor-not-allowed
                            "
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