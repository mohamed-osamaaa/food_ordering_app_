import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <Loader className="animate-spin text-red-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transform -translate-y-20" />
        </div>
    );
};

export default Loading;
