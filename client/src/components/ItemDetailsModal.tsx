"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useCartStore } from "../store/useCartStore"

const ItemDetailsModal = ({ item, isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedExtraIngredients, setSelectedExtraIngredients] = useState({});
    const { addToCart } = useCartStore();

    if (!isOpen || !item) return null;

    const imgURL = String(process.env.NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL) + String(item.itemImage);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleExtraIngredientChange = (ingredientName, isSelected) => {
        setSelectedExtraIngredients(prev => ({
            ...prev,
            [ingredientName]: isSelected
        }));
    };

    const calculateTotalPrice = () => {
        let basePrice = 0;

        // Get base price from selected size
        if (selectedSize && item.sizes) {
            const sizeOption = item.sizes.find(size => size.size === selectedSize);
            if (sizeOption) basePrice = sizeOption.price || 0;
        }

        // Add extra ingredients price if applicable
        if (item.extraIngredients) {
            Object.entries(selectedExtraIngredients).forEach(([ingredientName, isSelected]) => {
                if (isSelected) {
                    const ingredient = item.extraIngredients.find(ing => ing.name === ingredientName);
                    if (ingredient) basePrice += ingredient.price || 0;
                }
            });
        }

        return basePrice * quantity;
    };
    const handleAddToCart = async () => {
        // const cartItem = {
        //     ...item,
        //     quantity,
        //     selectedSize,
        //     selectedExtraIngredients
        // };
        // console.log('Adding to cart:', cartItem);
        // onClose();
        //
        // console.log('item:', item);
        // item.quantity = quantity;
        // item.sizes.size = selectedSize;
        // item.extraIngredients.name = selectedExtraIngredients;
        // item.price = (await calculateTotalPrice()).toFixed(2);
        // console.log('Updated item:', item);
        // await addToCart(item);
        // console.log("success");
        // onClose();
        //
        const totalPrice = await calculateTotalPrice();
        const cartItem = {
            _id: item._id,
            name: item.name,
            itemImage: item.itemImage,
            selectedSize,
            extraIngredients: Object.keys(selectedExtraIngredients)
                .filter(name => selectedExtraIngredients[name])
                .map(name => ({ name })),

            price: totalPrice.toFixed(2),
            quantity,
        };

        await addToCart(cartItem);
        console.log("success");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Item Details</h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-gray-700 text-xl font-bold cursor-pointer border-2 border-red-500 hover:border-gray-700 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Image and Basic Info */}
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="md:w-1/2">
                            <div className="w-full h-64 overflow-hidden rounded-lg">
                                <Image
                                    src={imgURL}
                                    alt={item.name}
                                    width={400}
                                    height={256}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {item.name}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {item.description}
                            </p>
                            <div className="text-2xl font-bold text-red-600 mb-4">
                                ${calculateTotalPrice().toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Size Selection */}
                    {item.sizes && item.sizes.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Size</h4>
                            <div className="flex flex-wrap gap-2">
                                {item.sizes.map((sizeOption) => (
                                    <button
                                        key={sizeOption._id}
                                        onClick={() => handleSizeChange(sizeOption.size)}
                                        className={`px-4 py-2 rounded-lg border transition-colors ${selectedSize === sizeOption.size
                                            ? 'bg-red-600 text-white border-red-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 cursor-pointer'
                                            }`}
                                    >
                                        {sizeOption.size}
                                        <span className="ml-1 text-sm">
                                            (${sizeOption.price.toFixed(2)})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Extra Ingredients Selection */}
                    {item.extraIngredients && item.extraIngredients.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Extra Ingredients</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {item.extraIngredients.map((ingredient) => (
                                    <label
                                        key={ingredient._id}
                                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedExtraIngredients[ingredient.name] || false}
                                            onChange={(e) => handleExtraIngredientChange(ingredient.name, e.target.checked)}
                                            // className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                            className="w-4 h-4 accent-red-600 border-gray-300 rounded"
                                        />
                                        <span className="flex-1 text-gray-700">{ingredient.name}</span>
                                        <span className="text-sm font-medium text-gray-600">
                                            +${ingredient.price.toFixed(2)}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selection */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h4>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold cursor-pointer"
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedSize}
                            className="flex-1 px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold cursor-pointer"
                        >
                            Add to Cart - ${calculateTotalPrice().toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsModal;