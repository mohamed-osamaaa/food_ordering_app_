import User from "../../models/users.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -__v");
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const makeUserAdmin = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        user.role = "admin";
        await user.save();
        res.status(200).json({
            success: true,
            message: "User made admin successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const searchByName = async (req, res) => {
    const { name } = req.body;

    try {
        // ignores case sensitivity (thanks to the 'i' flag)
        const users = await User.find({ fullname: { $regex: name, $options: 'i' } });

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found with that name",
            });
        }

        res.status(200).json({
            success: true,
            message: "Users found successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
