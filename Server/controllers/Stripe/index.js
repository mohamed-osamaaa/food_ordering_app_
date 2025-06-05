import dotenv from "dotenv";
import Stripe from "stripe";

import Cart from "../../models/cart.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.currentUser.id;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.item"
        );

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty.",
            });
        }

        const lineItems = cart.items.map(({ item, quantity }) => {
            const priceInCents = item.sizes?.[0]?.price * 100 || 0;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: priceInCents,
                },
                quantity: quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.CLIENT_URL}/checkout/success`,
            cancel_url: `${process.env.CLIENT_URL}/`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const stripeWebhook = async (req, res) => {
    try {
        const userId = req.currentUser.id;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.item"
        );

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const newOrder = new Order({
            user: userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
        });

        await newOrder.save();
        await Cart.findOneAndDelete({ user: userId });

        res.status(200).json({ success: true, message: "process completed" });
    } catch (error) {
        console.error("process failed:", error.message);
    }
};
