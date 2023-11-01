"use client";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ToastrComponent from "../components/toastr";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "../types/Response";

interface RegisterFormArgs {
  name: string;
  email: string;
  password: string;
}

interface UserProps {
  currentUser: SafeUser | null | undefined;
}

const RegisterForm: FC<UserProps> = ({ currentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormArgs>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const { showToast } = ToastrComponent();
  const router = useRouter();

  async function onSubmit(data: RegisterFormArgs) {
    setIsloading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        showToast("Account created", "success");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/logs");
            router.refresh();
            showToast("Login Successfully", "success");
            setIsloading(false);
          }

          if (callback?.error) {
            showToast(callback.error, "danger");
            setIsloading(false);
          }
        });
      })
      .catch(() => showToast("Something went wrong", "danger"))
      .finally(() => console.log("yehey"));
  }

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-stone-400"
            >
              <div className="text-center">
                <h1 className="font-bold text-lg">Create An Account</h1>
              </div>
              <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "This field is required" })}
                />
                {errors.name && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.name.message as React.ReactNode}
                  </span>
                )}
              </div>
              <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.email.message as React.ReactNode}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                {errors.password && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.password.message as React.ReactNode}
                  </span>
                )}
              </div>

              <div className="flex items-end justify-end">
                <button
                  className={`${isLoading} ? btn w-full : text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      &nbsp;
                    </>
                  )}
                  Submit
                </button>
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-center mt-2 ">
                <a
                  href="/login"
                  className="text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Go to login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
