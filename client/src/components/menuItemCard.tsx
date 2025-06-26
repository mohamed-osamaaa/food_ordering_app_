"use client";
import Image from "next/image";
import { useState } from "react";
import { useItemStore } from "../store/useItemsStore";
import ItemDetailsModal from "./ItemDetailsModal";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface MenuItemCardProps {
    image: string;
    title: string;
    description: string;
    itemId: string;
}
// interface Item {
//     id: string;
//     title: string;
//     description: string;
//     image: string;
// }

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

const MenuItemCard = ({ image, title, description, itemId }: MenuItemCardProps) => {
    // try {
    //     console.log(`${process.env.ITEM_IMAGES_SERVER_URL}${image}`);
    //     console.log(image);

    // } catch (e) {
    //     console.log("error image");
    // }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const { fetchItemById, isLoading } = useItemStore();
    const { authUser } = useAuthStore();
    const router = useRouter();

    const imgURL = String(process.env.NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL) + String(image);

    const handleAddToCart = async () => {
        try {
            if (!authUser) {
                router.replace('/auth/login');
            } else {
                const item = await fetchItemById(itemId);
                setSelectedItem(item);
                setIsModalOpen(true);
            }
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
