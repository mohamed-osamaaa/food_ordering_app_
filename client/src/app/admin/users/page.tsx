"use client";
import { useEffect } from "react";
import { useUsersStore } from "@/store/useUsersStore";

const UsersPage = () => {
    const { users, isLoading, fetchUsers, makeAdmin } = useUsersStore();

    useEffect(() => {
        fetchUsers();
    }, []);
    console.log(users);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 mt-10">
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
                                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
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