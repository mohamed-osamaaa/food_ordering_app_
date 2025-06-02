import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        items: [
            {
                item: {
                    type: String,
                    ref: "Item",
                    required: true,
                },
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
        deliveryPrice: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Cart", CartSchema);
