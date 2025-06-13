"use client";
import React, { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore"
import Image from "next/image";
import { Loader2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const CartPage = () => {
    const { getCart, cart, removeFromCart } = useCartStore();
    const { createCheckoutSession, isCreatingSession, processWebhook } = useCheckoutStore();

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

    const handlePayment = async () => {
        // Check if cart is empty
        if (!cart?.items?.length) {
            Swal.fire({
                title: "Cart Empty",
                text: "Please add items to your cart before proceeding to checkout.",
                icon: "warning",
                confirmButtonColor: "#ef4444",
            });
            return;
        }

        // Confirm payment
        const result = await Swal.fire({
            title: "Proceed to Payment?",
            text: `Total amount: $${cart?.totalPrice?.toFixed(2) || "0.00"}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, proceed to payment",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            const success = await createCheckoutSession();
            const webhookSuccess = await processWebhook();

            // if (webhookSuccess) {
            //     await getCart();
            // }
            if (!success || !webhookSuccess) {
                Swal.fire({
                    title: "Payment Failed",
                    text: "Unable to process payment. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#ef4444",
                });
            }
        }
    };
    return (
        <div className="px-4 md:px-8">
            <h2 className="text-center text-red-500 text-4xl md:text-5xl font-bold my-10 mb-5">
                Cart
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cart?.items?.length > 0 ? (
                    cart.items.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                        >
                            {/* Image */}
                            <div className="w-40 h-40 relative flex-shrink-0">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL}${item.itemImage}`}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 mt-4 sm:mt-0 sm:ml-7 text-center sm:text-left">
                                <h3 className="text-lg font-bold mb-3">{item.name}</h3>
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

                                <p className="text-sm text-green-600 mt-2">
                                    Item Total: ${item.price.toFixed(2)}
                                </p>
                            </div>

                            {/* Delete icon */}
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-500 hover:text-red-700 cursor-pointer bg-gray-200 p-2 rounded-2xl mt-4 sm:mt-0"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full font-bold text-2xl">Your cart is empty</p>
                )}
            </div>

            {/* Total Price */}
            <div className="flex flex-col items-center mt-20 text-xl md:text-2xl font-semibold text-black text-center">
                Total: ${cart?.totalPrice?.toFixed(2) || "0.00"}
                <button
                    onClick={handlePayment}
                    disabled={isCreatingSession || !cart?.items?.length}
                    className={`
                        flex items-center justify-center gap-2 mt-6 px-12 sm:px-20 py-3 
                        font-semibold rounded-full shadow transition duration-300
                        ${isCreatingSession || !cart?.items?.length
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600 cursor-pointer'
                        }
                    `}
                >
                    {isCreatingSession ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Pay'
                    )}
                </button>
            </div>
        </div>
    );
};

export default CartPage;
