import Cart from "../../models/cart.js";
import Item from "../../models/items.js";

const calculateTotalPrice = async (items) => {
    let total = 0;

    for (const { item, quantity } of items) {
        const dbItem = await Item.findById(item);
        if (!dbItem) continue;

        // Use base price (assuming first size as default)
        const price = dbItem.sizes?.[0]?.price || 0;
        total += price * quantity;
    }

    return total;
};

export const addToCart = async (req, res) => {
    try {
        const userId = req.currentUser.id;
        const { itemId } = req.params;
        const quantity = 1;

        const itemExists = await Item.findById(itemId);
        if (!itemExists) {
            return res
                .status(404)
                .json({ success: false, message: "Item not found" });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(
            (i) => i.item.toString() === itemId
        );
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ item: itemId, quantity });
        }

        cart.totalPrice = await calculateTotalPrice(cart.items);
        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteFromCart = async (req, res) => {
    try {
        const userId = req.currentUser.id;
        const { itemId } = req.params;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        }

        cart.items = cart.items.filter((i) => i.item.toString() !== itemId);
        cart.totalPrice = await calculateTotalPrice(cart.items);

        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
