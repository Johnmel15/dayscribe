"use client";
import React, { FC, useEffect } from "react";
import { SafeUser } from "../types/Response";
import { useRouter } from "next/navigation";

interface UserProps {
  currentUser: SafeUser | null | undefined;
}

const Home: FC<UserProps> = ({ currentUser }) => {
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/logs");
      router.refresh;
    }
  }, []);

  if (currentUser) {
    return (
      <div className="text-center px-10 py-10 mx-10">
        <p>Logged in. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:pr-4 lg:pl-0 w-full sm:w-3/4 md:w-3/4 lg:w-2/4 ">
        <div className="flex justify-center sm:justify-center w-full">
          <div className="w-full sm:max-w-md items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-stone-400">
              <div className="text-center">
                <h1 className="font-bold text-lg">Welcome to Dayscribe</h1>
              </div>
              <div className="flex items-center justify-center mt-6 ">
                <a
                  href="/login"
                  className="text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </a>
              </div>
              <div className="flex items-center justify-center mt-6 ">
                <a
                  href="/register"
                  className="text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
