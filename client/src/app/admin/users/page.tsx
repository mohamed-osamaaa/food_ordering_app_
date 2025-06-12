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
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
                    >
                        <p className="text-gray-800 font-medium">
                            {user.fullname} <span className="text-gray-500">({user.role})</span>
                        </p>
                        {user.role !== "admin" && (
                            <button
                                onClick={() => makeAdmin(user._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition cursor-pointer"
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