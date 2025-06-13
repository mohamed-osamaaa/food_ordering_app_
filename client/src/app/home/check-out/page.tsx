"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import successImage from "../../../../public/check.png";
import { useAuthStore } from "@/store/useAuthStore";

const SuccessPage = () => {
    const router = useRouter();
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen text-center mt-20 px-6 sm:px-8 md:px-12">
            <Image
                src={successImage}
                alt="Payment Successful"
                width={200}
                height={200}
                className="mb-8 w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 object-contain"
            />

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-4">
                Payment Successful!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
                Thank you for your purchase. Your order has been confirmed.
            </p>

            <button
                onClick={() => router.push("/")}
                className="cursor-pointer bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition text-sm sm:text-base md:text-lg"
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default SuccessPage;
