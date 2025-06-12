import dotenv from "dotenv";
import Stripe from "stripe";

import Cart from "../../models/cart.js";
import Order from "../../models/orders.js"

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.currentUser.id;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.item"
        );
        // const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty.",
            });
        }

        const lineItems = cart.items.map(({ item, price, quantity }) => {
            // const priceInCents = item.sizes?.[0]?.price * 100 || 0;
            const priceInCents = Math.round(price * 100) || 0; //Multiply by 100 to convert dollars to cents.

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
            success_url: `${process.env.CLIENT_URL}/home/check-out`,
            cancel_url: `${process.env.CLIENT_URL}/home/cart`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const successPageDetails = async (req, res) => {
    try {
        const userId = req.currentUser.id;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.item"
        );
        // const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Checkout successful",
            cart,
        });
    } catch (error) {
        console.error("Error fetching cart details:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const stripeWebhook = async (req, res) => {
    try {
        const userId = req.currentUser.id;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.item"
        );
        // const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const newOrder = new Order({
            user: userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
        });

        await newOrder.save();
        await Cart.findOneAndDelete({ user: userId });

        return res.status(200).json({ success: true, message: "process completed" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
