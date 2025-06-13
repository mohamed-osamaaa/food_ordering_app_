"use client";
import React, { useState } from "react";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";

function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        profileImage: null as File | null,
    });

    const { register, isRegister } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const success = await register(formData);
        if (success) router.replace("/auth/login");
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, profileImage: e.target.files[0] });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-10 border-2 border-red-500 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r md:pr-6 pb-6 md:pb-0">
                <label
                    htmlFor="profileImage"
                    className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-red-500 transition"
                >
                    {formData.profileImage ? (
                        <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <span className="text-gray-500 text-sm text-center px-2">
                            Click to upload photo
                        </span>
                    )}
                </label>
                <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                />
            </div>

            <div className="w-full md:w-1/2">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Register
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.fullname}
                            onChange={(e) =>
                                setFormData({ ...formData, fullname: e.target.value })
                            }
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                            }
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn !bg-red-500 hover:bg-red-600 text-white py-2 rounded w-full cursor-pointer shadow-md transition-colors duration-200"
                        disabled={isRegister}
                    >
                        {isRegister ? (
                            <>
                                <Loader2 className="size-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-red-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
