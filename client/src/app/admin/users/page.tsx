"use client";
import { useEffect, useState } from "react";
import { useUsersStore } from "@/store/useUsersStore";

const UsersPage = () => {
    const { users, isLoading, fetchUsers, makeAdmin, searchByName } = useUsersStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            fetchUsers();
        } else {
            await searchByName(searchTerm);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 mt-10">
            <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="w-full sm:flex-1 px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                    onClick={handleSearch}
                    className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Search
                </button>
            </div>

            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
                    >
                        <p className="text-gray-800 font-medium text-center sm:text-left">
                            {user.fullname}{" "}
                            <span className="text-gray-500">({user.role})</span>
                        </p>
                        {user.role !== "admin" && (
                            <button
                                onClick={() => makeAdmin(user._id)}
                                className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
                            >
                                Make Admin
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
