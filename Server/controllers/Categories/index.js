import categories from "../../models/categories.js";

const getAllCategories = async (req, res) => {
    try {
        const categoriesList = await categories.find();
        res.status(200).json({
            success: true,
            data: categoriesList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        const category = await categories.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id || !name) {
            return res.status(400).json({
                success: false,
                message: "Category ID and name are required",
            });
        }

        const updatedCategory = await categories.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name are required",
            });
        }

        const newCategory = new categories({
            name,
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export { createCategory, deleteCategory, getAllCategories, updateCategory };
