"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";

export default function Home() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        console.log(authUser);
    }, [checkAuth, authUser]);

    useEffect(() => {
        if (!isCheckingAuth) {
            if (!authUser) {
                router.push("/home");
            } else if (authUser.role === "admin") {
                router.push("/admin/categories");
            } else {
                router.push("/home");
            }
        }
    }, [authUser, isCheckingAuth, router]);

    console.log({ authUser });

    if (isCheckingAuth) {
        return (
            <div className="flex justify-center items-center min-h-screen px-4">
                <Loader className="animate-spin text-red-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transform -translate-y-20" />
            </div>
        );
    }

    return null;
}