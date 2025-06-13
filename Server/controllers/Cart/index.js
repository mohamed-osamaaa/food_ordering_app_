import Cart from "../../models/cart.js";
import Item from "../../models/items.js";

// const calculateTotalPrice = async (items) => {
//     let total = 0;

//     for (const { item, quantity } of items) {
//         const dbItem = await Item.findById(item);
//         if (!dbItem) continue;

//         // Use base price (assuming first size as default)
//         const price = dbItem.sizes?.[0]?.price || 0;
//         total += price * quantity;
//     }

//     return total;
// };

// export const addToCart = async (req, res) => {
//     try {
//         const userId = req.currentUser.id;
//         const item = req.body.item;
//         const quantity = item.quantity;

//         if (!item._id || !item.price || !quantity) {
//             return res.status(400).json({ success: false, message: "Invalid item data." });
//         }

//         let cart = await Cart.findOne({ user: userId });

//         if (!cart) {
//             cart = new Cart({
//                 user: userId,
//                 items: [{ item, quantity }],
//                 totalPrice: item.price,
//             });
//         } else {
//             const existingItem = cart.items.find((i) => i.item._id.toString() === item._id);
//             if (existingItem) {
//                 existingItem.quantity += quantity;
//             } else {
//                 cart.items.push({ item, quantity });
//             }

//             cart.totalPrice += item.price;
//         }

//         await cart.save();

//         const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

//         return res.status(200).json({ success: true, cart, itemCount: itemCount });
//     } catch (err) {
//         return res.status(500).json({ success: false, message: err.message });
//     }
// };
export const addToCart = async (req, res) => {
    try {
        const userId = req.currentUser.id;
        const item = req.body.item;
        const quantity = item.quantity;
        const price = parseFloat(item.price); // price per unit with size and extras

        if (!item._id || !price || !quantity) {
            return res.status(400).json({ success: false, message: "Invalid item data." });
        }

        const newCartItem = {
            item: item._id,
            name: item.name,
            itemImage: item.itemImage,
            selectedSize: item.selectedSize,
            extraIngredients: item.extraIngredients,
            price: price,
            quantity: quantity,
        };

        let cart = await Cart.findOne({ user: userId });

        // if (!cart) {
        //     cart = new Cart({
        //         user: userId,
        //         items: [newCartItem],
        //     });
        //     cart.totalPrice += price;
        // } else {
        //     cart.items.push(newCartItem);
        //     cart.totalPrice += price;
        // }
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [newCartItem],
                totalPrice: 0, // Initialize totalPrice
            });
        } else {
            cart.items.push(newCartItem);
        }

        cart.totalPrice += price * quantity;


        await cart.save();
        cart = await Cart.findById(cart._id);
        const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

        return res.status(200).json({ success: true, cart, itemCount });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


export const deleteFromCart = async (req, res) => {
    try {
        const userId = req.currentUser.id;
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ success: false, message: "Item ID is required." });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart is empty." });
        }

        const itemIndex = cart.items.findIndex((i) => i._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart." });
        }

        const cartItem = cart.items[itemIndex];
        const itemPrice = cartItem.price;

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            cart.totalPrice -= itemPrice;
        } else {
            cart.items.splice(itemIndex, 1);
            cart.totalPrice -= itemPrice;
        }

        if (cart.totalPrice < 0) cart.totalPrice = 0;

        await cart.save();

        const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

        return res.status(200).json({ success: true, cart, itemCount });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


export const getUserCart = async (req, res) => {
    try {
        const userId = req.currentUser.id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart is empty." });
        }

        const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

        return res.status(200).json({
            success: true,
            cart,
            itemCount,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
