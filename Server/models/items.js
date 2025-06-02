import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        itemImage: {
            type: String,
            default: "uploads/items/img1.jpeg",
        },
        sizes: [
            {
                size: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        extraIngredients: [
            {
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Item", ItemSchema);
