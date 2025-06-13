'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingCartIcon, MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';

const Header = () => {
    const { authUser, logout } = useAuthStore();
    const handleClick = async () => {
        await logout();
    };
    const { itemCount } = useCartStore();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full px-4 py-4 bg-gray-200 sm:bg-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-red-500 font-bold text-2xl sm:text-3xl">ST PIZZA</h1>

                <nav className="hidden lg:flex items-center gap-10">
                    {["home", "menu", "about", "contact"].map((page) => (
                        <Link
                            key={page}
                            href={page === "home" ? "/" : `/home/${page}`}
                            className="font-semibold text-gray-700 hover:text-red-500 transition-colors duration-200"
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-6">
                    {authUser ? (
                        <>
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
                        </>
                    ) : (
                        <Link className='bg-red-500 text-white font-bold py-2.5 px-6 rounded-3xl' href="/auth/login">Login</Link>
                    )}
                </div>

                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-red-500 w-8 h-8 flex items-center justify-center border-2 border-red-500 rounded-full hover:border-gray-700 hover:text-gray-700 transition-colors duration-200">
                    {menuOpen ? <X size={20} /> : <MenuIcon className="size-6" />}
                </button>
            </div>

            {menuOpen && (
                <div className="lg:hidden mt-4 space-y-4 flex justify-between px-4">
                    <div className='flex flex-col items-star gap-4t'>
                        {["home", "menu", "about", "contact"].map((page) => (
                            <Link
                                key={page}
                                href={page === "home" ? "/" : `/home/${page}`}
                                className="font-semibold text-gray-700 hover:text-red-500 transition-colors duration-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                {page.charAt(0).toUpperCase() + page.slice(1)}
                            </Link>
                        ))}
                    </div>
                    <div>
                        {authUser ? (
                            <div className='flex flex-col items-end gap-4 w-full'>
                                <div className='flex justify-end gap-6'>
                                    <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                                        <Image
                                            src={authUser.profileImage}
                                            alt="profile"
                                            width={35}
                                            height={35}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <Link href="/home/cart" className="relative mt-2">
                                        <ShoppingCartIcon className="size-6" />
                                        {itemCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                {itemCount}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                                <button onClick={handleClick} className='mt-2 bg-red-500 text-white font-bold py-1 px-4 rounded-3xl'>Logout</button>
                            </div>
                        ) : (
                            <Link className='bg-red-500 text-white font-bold py-2 px-6 rounded-3xl' href="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
