"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
    error: Error;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
    return (
        <div className="fix-height flex flex-col items-center justify-center pt-10 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-red-100 border border-red-400 text-red-700 px-6 py-6 rounded-lg w-full max-w-md shadow-lg"
            >
                <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <h1 className="text-2xl sm:text-3xl font-semibold">Something went wrong</h1>
                <p className="text-gray-700 mt-2 text-base sm:text-lg break-words">{error.message}</p>
            </motion.div>

            <Link
                href="/"
                className="mt-4 px-5 py-2.5 rounded-lg text-lg bg-red-600 text-white hover:text-red-700 shadow-md transition-colors duration-200"
            >
                Go to Home Page
            </Link>
        </div>
    );
};

export default ErrorPage;
