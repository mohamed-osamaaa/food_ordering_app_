"use client";
import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MenuItemCard from "@/components/menuItemCard";
import pizza from "../../../public/pizza.png";
import sallad1 from "../../../public/salladFF.png";
import sallad2 from "../../../public/sallad2FF.png";
import { useItemStore } from "@/store/useItemsStore";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';


// const items = [
//     {
//         image: "img1.jpeg",
//         title: "Pepperoni Pizza",
//         description: "Spicy pepperoni with cheese",
//     },
//     {
//         image: "img2.jpg",
//         title: "Cheese Burger",
//         description: "Beef patty with melted cheese",
//     },
//     {
//         image: "img3.png",
//         title: "Spaghetti Bolognese",
//         description: "Pasta with meat sauce",
//     },
// ];
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
    const { selectedItems, isLoading, error, fetchItemsByIds } = useItemStore();
    const targetIds = [
        '68482f4b3adc76545f59e2e8',
        '68482fc23adc76545f59e312',
        '684830253adc76545f59e343'
    ];

    useEffect(() => {
        fetchItemsByIds(targetIds);
    }, [fetchItemsByIds]);

    // if (isLoading) {
    //     return <div>Loading specific items...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div className="mx-4 md:mx-12 lg:mx-20 xl:mx-32 mt-10">
            <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 lg:gap-5">
                <div className="flex flex-col gap-8 lg:gap-10 lg:mr-24 text-center lg:text-left">
                    <p className="text-4xl sm:text-5xl font-bold">
                        Everything is better with a{" "}
                        <span className="text-red-500">Pizza</span>
                    </p>
                    <p className="text-gray-600">
                        Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
                    </p>
                    <div className="flex justify-center lg:justify-start flex-wrap gap-4">
                        <Link
                            href="/home/menu"
                            className="flex items-center gap-3 px-6 py-3 rounded-3xl bg-red-600 hover:text-red-700 shadow-md cursor-pointer"
                        >
                            <p className="text-white">ORDER NOW</p>
                            <CircleArrowRight className="text-white" />
                        </Link>
                        <Link
                            href="/home/about"
                            className="flex items-center gap-3 px-6 py-3 rounded-3xl bg-white hover:border-gray-600 shadow-md cursor-pointer"
                        >
                            <p className="text-gray-600">LEARN MORE</p>
                            <CircleArrowRight className="text-gray-600" />
                        </Link>
                    </div>
                </div>
                <div className="lg:ml-24">
                    <Image
                        src={pizza}
                        alt="pizza"
                        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:w-[500px] lg:h-[400px] xl:w-[600px] xl:h-[500px]"
                    />
                </div>
            </div>

            <div>
                <div className="hidden md:block absolute -left-8 top-[550px] overflow-hidden">
                    <Image
                        src={sallad1}
                        alt="sallad1"
                        width={200}
                        height={250}
                    />
                </div>
                <div className="hidden md:block absolute right-0 top-[525px] overflow-hidden">
                    <Image
                        src={sallad2}
                        alt="sallad2"
                        width={200}
                        height={250}
                    />
                </div>
            </div>

            <div className="mb-10 mt-10">
                <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-gray-600 text-xl">CHECK OUT</p>
                    <h1 className="text-red-500 text-4xl sm:text-5xl">Our Best Sellers</h1>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center p-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    visible: {
                        transition: { staggerChildren: 0.15 },
                    },
                }}
            >
                {selectedItems.map((item) => (
                    <motion.div
                        key={item._id}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <MenuItemCard
                            itemId={item._id}
                            image={item.itemImage}
                            title={item.name}
                            description={item.description}
                        />
                    </motion.div>
                ))}
            </motion.div>


            <section className="text-center my-16 px-4" id="about">
                <div>
                    <h3 className="uppercase text-gray-500 font-semibold leading-4">
                        Our story
                    </h3>
                    <h2 className="text-red-500 font-bold text-3xl sm:text-4xl italic">
                        About us
                    </h2>
                </div>
                <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4 text-justify">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
                    </p>
                    <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
                    <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
                </div>
            </section>

            <section className="text-center my-8 px-4" id="contact">
                <div>
                    <h3 className="uppercase text-gray-500 font-semibold leading-4">
                        Don{"'"}t hesitate
                    </h3>
                    <h2 className="text-red-500 font-bold text-3xl sm:text-4xl italic">
                        Contact us
                    </h2>
                </div>
                <div className="mt-8">
                    <a className="text-3xl sm:text-4xl underline text-gray-500" href="tel:+46738123123">
                        +20 1025926249
                    </a>
                </div>
            </section>

            <footer className="text-center py-8 mt-16 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default HomePage;
