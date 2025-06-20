"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import Image from 'next/image';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type NavBarProfileProps = {
    defaultTab?: string;
};

function NavBarAdmin({ defaultTab = "Categories" }: NavBarProfileProps) {
    const { authUser, logout } = useAuthStore();
    const handleClickLogout = async () => {
        await logout();
    };
    console.log("authUser", authUser);
    const [activeTab, setActiveTab] = useState<string>(defaultTab);
    const router = useRouter();

    const tabs = ["Categories", "Menu Items", "Users", "Orders"];

    const handleClick = (tab: string) => {
        setActiveTab(tab);
        const path =
            tab === "Category"
                ? "/admin/categories"
                : `/admin/${tab.toLowerCase().replace(/\s+/g, "-")}`;
        router.push(path);
    };

    return (
        <>
            <header className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 px-6 sm:px-12 md:px-24 lg:mx-36 py-4">
                <h1 className="text-red-500 font-bold text-3xl mb-4 sm:mb-0">ST PIZZA</h1>
                <div>
                    {
                        authUser ? (
                            <div className='flex justify-center items-center gap-8 sm:gap-10'>
                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                    <Image
                                        src={authUser.profileImage}
                                        alt="profile"
                                        width={50}
                                        height={50}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <button onClick={handleClickLogout} className='cursor-pointer bg-red-500 text-white font-bold py-2 px-6 rounded-3xl'>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className='sm:ml-44 mt-2 sm:mt-0'>
                                <Link className='bg-red-500 text-white font-bold py-2.5 px-10 rounded-3xl' href="/auth/login">
                                    Login
                                </Link>
                            </div>
                        )
                    }
                </div>
            </header>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-6 px-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleClick(tab)}
                        className={`cursor-pointer rounded-2xl px-4 py-2 text-white transition-colors duration-300 ${activeTab === tab ? "bg-red-500" : "bg-gray-500"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </>
    );
}

export default NavBarAdmin;
