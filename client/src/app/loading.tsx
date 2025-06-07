import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader className="animate-spin text-red-500 w-16 h-16 transform translate-y-[-120px]" />
        </div>
    );
};

export default Loading;
