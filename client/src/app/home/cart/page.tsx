"use client";
import React, { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const CartPage = () => {
    const { getCart, cart, removeFromCart } = useCartStore();

    useEffect(() => {
        getCart();
    }, []);

    const handleDelete = async (itemId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to remove this item from the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await removeFromCart(itemId);
            await getCart();
            Swal.fire("Deleted!", "Item has been removed from your cart.", "success");
        }
    };

    console.log(cart);

    return (
        <div className="px-8">
            <h2 className="text-center text-red-500 text-5xl font-bold my-10 mb-5">
                Cart
            </h2>

            <div className="grid grid-cols-3 gap-4">
                {cart?.items?.length > 0 ? (
                    cart.items.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                        >
                            {/* Image */}
                            <div className="w-40 h-40 relative">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL}${item.itemImage}`}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 ml-7">
                                <h3 className="text-lg font-bold mb-5">{item.name}</h3>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>

                                {item.selectedSize && (
                                    <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                                )}

                                {item.extraIngredients?.length > 0 && (
                                    <div className="text-sm text-gray-600">
                                        Extra:
                                        {item.extraIngredients.map((extra) => (
                                            <span key={extra._id} className="ml-2 text-sm text-gray-600">
                                                {extra.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <p className="text-sm text-green-600">
                                    Item Total: ${item.price.toFixed(2)}
                                </p>
                            </div>

                            {/* Delete icon */}
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-500 hover:text-red-700 cursor-pointer bg-gray-200 p-2 rounded-2xl"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3">Your cart is empty.</p>
                )}
            </div>

            {/* Total Price */}
            <div className="flex flex-col items-center mt-20 text-2xl font-semibold text-black">
                Total: ${cart?.totalPrice?.toFixed(2) || "0.00"}
                <button className="cursor-pointer mt-10 px-20 py-3 bg-red-500 text-white font-semibold rounded-4xl shadow hover:bg-red-600 transition duration-300">
                    Pay
                </button>
            </div>
        </div>
    );
};

export default CartPage;