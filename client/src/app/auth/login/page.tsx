"use client";
import React, { useState } from "react";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";

function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await login(formData);
        if (success) router.replace("/");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-[700px] sm:min-h-[700px] md:min-h-[500px] flex justify-center items-center mx-7">
            <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-8 bg-white shadow-md rounded-lg mt-20 sm:mt-32 border-2 border-red-500">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="mt-1 p-2 w-full pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn !bg-red-500 hover:bg-red-600 text-white py-2 rounded w-full cursor-pointer shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? (
                            <>
                                <Loader2 className="size-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Don{"'"}t have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-red-500 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
