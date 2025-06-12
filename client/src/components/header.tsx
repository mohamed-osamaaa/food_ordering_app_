'use client';
import Link from 'next/link';
import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';

const Header = () => {
    const { authUser, logout } = useAuthStore();
    const handleClick = async () => {
        await logout();
    };
    console.log("authUser", authUser);
    const { itemCount } = useCartStore();
    return (
        <header className="flex justify-center items-center h-20 gap-60">
            <h1 className="text-red-500 font-bold text-3xl">ST PIZZA</h1>
            <div className="flex justify-center items-center mx-5 gap-10">
                {["home", "menu", "about", "contact"].map((page) => (
                    <Link
                        key={page}
                        href={page === "home" ? "/" : `/home/${page}`}
                        className="font-semibold text-gray-700 hover:text-red-500 transition-colors duration-200"
                    >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                    </Link>
                ))}
            </div>
            <div>
                {
                    authUser ? (
                        <div className='flex justify-center items-center gap-10'>
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                <Image
                                    src={authUser.profileImage}
                                    alt="profile"
                                    width={50}
                                    height={50}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <button onClick={handleClick} className='cursor-pointer bg-red-500 text-white font-bold py-2 px-6 rounded-3xl'>Logout</button>
                            <Link href="/home/cart" className="relative">
                                <ShoppingCartIcon className="size-7" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    ) : (
                        <div className='ml-44'>
                            <Link className='bg-red-500 text-white font-bold py-2.5 px-10 rounded-3xl' href="/auth/login">Login</Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
};

export default Header;
