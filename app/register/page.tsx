"use client";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import ToastrComponent from "../components/toastr";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegisterFormArgs {
  name: string;
  email: string;
  password: string;
}

const page = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<RegisterFormArgs>();

  const { showToast } = ToastrComponent();
  const router = useRouter();

  async function onSubmit(data: RegisterFormArgs) {
    axios
      .post("/api/register", data)
      .then(() => {
        showToast("Acount created", "success");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/logs");
            router.refresh();
            showToast("Acount created", "success");
          }

          if (callback?.error) {
            showToast(callback.error, "danger");
          }
        });
      })
      .catch(() => showToast("Something went wrong", "danger"))
      .finally(() => console.log("yehey"));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-4 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password")}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
