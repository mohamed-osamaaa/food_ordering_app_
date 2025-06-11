import Image from "next/image";

const MenuItemCard = ({ image, title, description }) => {
    // try {
    //     console.log(`${process.env.ITEM_IMAGES_SERVER_URL}${image}`);
    //     console.log(image);

    // } catch (e) {
    //     console.log("error image");
    // }

    const imgURL = String(process.env.NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL) + String(image);
    console.log(imgURL);

    return (
        <div className="bg-gray-500 w-80 h-auto p-4 rounded-xl">
            <div className="w-full h-64 overflow-hidden rounded-lg">
                <Image
                    // src={`${process.env.ITEM_IMAGES_SERVER_URL}${image}`}
                    src={imgURL}
                    alt={title}
                    width={320}
                    height={256}
                    className="object-cover w-full h-full"
                />
            </div>
            <h1 className="text-center text-black text-xl font-semibold my-4">{title}</h1>
            <p className="text-center text-gray-300 text-sm my-4">{description}</p>
            <button
                className="
                    flex justify-center items-center gap-3 
                    px-6 py-3 rounded-3xl 
                    bg-red-600 hover:bg-white hover:text-red-700 
                    shadow-md cursor-pointer w-full 
                    text-white font-medium transition duration-300
                "
            >
                Add to cart
            </button>
        </div>
    );
};

export default MenuItemCard;
