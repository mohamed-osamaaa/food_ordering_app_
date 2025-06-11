import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MenuItemCard from "@/components/menuItemCard"
import pizza from "../../../public/pizza.png";
import sallad1 from "../../../public/salladFF.png";
import sallad2 from "../../../public/sallad2FF.png";

const items = [
    {
        image: "img1.jpeg",
        title: "Pepperoni Pizza",
        description: "Spicy pepperoni with cheese",
    },
    {
        image: "img2.jpg",
        title: "Cheese Burger",
        description: "Beef patty with melted cheese",
    },
    {
        image: "img3.png",
        title: "Spaghetti Bolognese",
        description: "Pasta with meat sauce",
    },
];

const HomePage = async () => {
    return (
        <div className="mx-32">
            <div className="flex justify-center items-center gap-5">
                <div className="flex flex-col gap-10 mr-24">
                    <p className="text-5xl font-bold w-75">
                        Everything is better with a{" "}
                        <span className="text-red-500">Pizza</span>
                    </p>
                    <p className="text-gray-600 w-75">
                        Pizza is the missing piece that makes every day
                        complete, a simple yet delicious joy in life
                    </p>
                    <div className="flex justify-center items-center flex-row gap-5">
                        <Link
                            href="/home/menu"
                            className="flex justify-center items-center gap-5 px-6 py-3 rounded-3xl bg-red-600 hover:text-red-700 shadow-md cursor-pointer"
                        >
                            <p className="text-white">ORDER NOW</p>
                            <CircleArrowRight className="text-white" />
                        </Link>
                        <Link
                            href="/home/about"
                            className="flex justify-center items-center gap-5 px-6 py-3 rounded-3xl bg-white hover:border-gray-600 shadow-md cursor-pointer"
                        >
                            <p className="text-gray-600">LEARN MORE</p>
                            <CircleArrowRight className="text-gray-600" />
                        </Link>
                    </div>
                </div>
                <div className="ml-24">
                    <Image
                        src={pizza}
                        alt="pizza"
                        className="w-[600px] h-[600px]"
                    />
                </div>
            </div>
            <div>
                <div className="absolute -left-8 top-[550px] overflow-hidden">
                    <Image
                        src={sallad1}
                        alt="sallad2"
                        width={200}
                        height={250}
                    />
                </div>
                <div className="absolute right-0 top-[525px] overflow-hidden">
                    <Image
                        src={sallad2}
                        alt="sallad2"
                        width={200}
                        height={250}
                    />
                </div>
            </div>
            <div className="mb-10 mt-5">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-gray-600 text-xl">CHECK OUT</p>
                    <h1 className="text-red-500 text-5xl">Our Best Sellers</h1>
                </div>
            </div>
            <div className="flex justify-center items-center p-3 gap-15">
                {items.map((item, index) => (
                    <MenuItemCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
            <section className="text-center my-16" id="about">
                <div>
                    <h3 className="uppercase text-gray-500 font-semibold leading-4">
                        Our story
                    </h3>
                    <h2 className="text-red-500 font-bold text-4xl italic">
                        About us
                    </h2>
                </div>
                <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
                    </p>
                    <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
                    <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
                </div>
            </section>
            <section className="text-center my-8" id="contact">
                <div>
                    <h3 className="uppercase text-gray-500 font-semibold leading-4">
                        Don{"'"}t hesitate
                    </h3>
                    <h2 className="text-red-500 font-bold text-4xl italic">
                        Contact us
                    </h2>
                </div>
                <div className="mt-8">
                    <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
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