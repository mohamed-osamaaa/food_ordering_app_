import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        items: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Item",
                    required: true,
                },
                name: String,
                itemImage: String,
                selectedSize: String,
                extraIngredients: [{ name: String, }],
                price: Number, // final price for that unit
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        // deliveryPrice: {
        //     type: Number,
        //     default: 0,
        // },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("Cart", CartSchema);
