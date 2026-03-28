import React from 'react';
import { useRouter } from 'next/navigation';

const UserBookApp = () => {
    const router = useRouter();

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center 
                        bg-black bg-opacity-70 z-50">
            <div className="w-[90%] max-w-md mx-auto bg-blue-100 p-10 rounded-xl shadow-lg text-center">
                <h1 className="mb-6 text-2xl font-bold text-gray-600">
                    To book an appointment, you should login
                </h1>
                <button
                    onClick={() => router.push('/auth/login')}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md 
                               hover:bg-blue-100 hover:text-blue-500 border border-blue-500 
                               transition-all duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default UserBookApp;