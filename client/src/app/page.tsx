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
    }, [checkAuth]);

    useEffect(() => {
        // TODO: make it in switch case
        if (!isCheckingAuth) {
            if (!authUser) {
                router.push("/auth/login");
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
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin text-red-500 w-16 h-16 transform translate-y-[-120px]" />
            </div>
        );
    }

    return null;
}