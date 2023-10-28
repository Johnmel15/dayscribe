"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ToastrComponent from "@/app/components/toastr";

const Form = () => {
  const [title, setTitle] = useState<string>("");
  const [ampm, setAmpm] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const router = useRouter();
  const { showToast } = ToastrComponent();

  async function submitLog(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch(`/api/logs`, {
      method: "POST",
      body: JSON.stringify({ title, action, time, ampm, date }),
    });
    const res = await data.json();
    showToast("Log is successfully saved!", "success");
    clearFields();
    router.refresh();
    if (!res.ok) console.log(res.message);
  }

  const clearFields = () => {
    setTitle("");
    setAmpm("");
    setAction("");
    setTime("");
    setDate("");
  };

  return (
    <div className="flex justify-center w-5/12">
      <div className="w-full max-w-md items-center ">
        <form
          onSubmit={submitLog}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-stone-400 "
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Action
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Action"
              onChange={(e) => setAction(e.target.value)}
              value={action}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="datetime-local"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div className="flex items-end justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
