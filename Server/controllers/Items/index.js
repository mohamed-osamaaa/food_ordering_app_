import Category from "../../models/categories.js";
import Item from "../../models/items.js";

const createItem = async (req, res) => {
    try {
        const itemData = req.body;

        // Find the category by name
        const categoryDoc = await Category.findOne({ name: itemData.category });
        if (!categoryDoc) {
            return res.status(400).json({
                success: false,
                message: `Category '${itemData.category}' not found`,
            });
        }

        // Replace category name with ObjectId
        itemData.category = categoryDoc._id;
        const newItem = new Item(itemData);
        await newItem.save();
        res.status(201).json({
            success: true,
            message: "Item created successfully",
            data: newItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
const updateItem = async (req, res) => {
    const { itemId } = req.params;
    try {
        if (req.body.category) {
            // Find the category by name
            const categoryDoc = await Category.findOne({
                name: itemData.category,
            });
            if (!categoryDoc) {
                return res.status(400).json({
                    success: false,
                    message: `Category '${itemData.category}' not found`,
                });
            }

            // Replace category name with ObjectId
            itemData.category = categoryDoc._id;
        }
        const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Item updated successfully",
            data: updatedItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
const deleteItem = async (req, res) => {
    const { itemId } = req.params;
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Item deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
const deleteExtraIngredient = async (req, res) => {
    const { itemId, ingredientName } = req.params;

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            {
                $pull: { extraIngredients: { name: ingredientName } },
            },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Extra ingredient deleted successfully",
            updatedItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const getItem = async (req, res) => {
    const { itemId } = req.params;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        res.status(200).json({
            success: true,
            data: item,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({
            success: true,
            data: items,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
const getItemsBySameCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;

        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        // Find the category by name
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Find all items with the matched category ID
        const items = await Item.find({ category: category._id }).populate(
            "category"
        );

        res.status(200).json({
            success: true,
            data: items,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export default {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getItems,
    deleteExtraIngredient,
    getItemsBySameCategory,
};
