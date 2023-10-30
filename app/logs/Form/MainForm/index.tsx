"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToastrComponent from "@/app/components/toastr";
import Tags from "../Select/Tags";
import { useLogs } from "@/app/state/logs";

interface FormErrorProps {
  field: string;
  message: string;
}

const Form = () => {
  const {
    id,
    title,
    action,
    date,
    tagId,
    setId,
    setTitle,
    setAction,
    setDate,
    setTagId,
  } = useLogs();
  const [tagsData, setTagsData] = useState([]);
  const [formErrors, setFormErrors] = useState<FormErrorProps[]>([]);

  const router = useRouter();
  const { showToast } = ToastrComponent();

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        setTagsData(data);
      } catch (error) {
        console.error("Error fetching tags data:", error);
      }
    };
    fetchTagsData();
  }, []);

  async function submitLog(e: React.FormEvent) {
    e.preventDefault();
    const errors: FormErrorProps[] = [];

    if (!title) {
      errors.push({
        field: "title",
        message: "This field is required!",
      });
    }

    if (!action) {
      errors.push({
        field: "action",
        message: "This field is required!",
      });
    }

    if (!date) {
      errors.push({
        field: "date",
        message: "This field is required!",
      });
    }

    if (tagId === "0") {
      errors.push({
        field: "tagid",
        message: "This field is required!",
      });
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    let data: any = {};
    let res: any = {};
    if (id) {
      data = await fetch(`/api/logs/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title, action, date, tagId }),
      });
      res = await data.json();
    } else {
      data = await fetch(`/api/logs`, {
        method: "POST",
        body: JSON.stringify({ title, action, date, tagId }),
      });
      res = await data.json();
    }
    console.log(data);
    if (data.status === 200) {
      showToast("Log is successfully saved!", "success");
      clearFields();
      await handleAddData();
      router.refresh();
    } else {
      console.log(res.message);
    }
  }

  const handleAddData = async () => {
    const event = new Event("dataAdded");
    window.dispatchEvent(event);
  };

  const clearFields = () => {
    setId("");
    setTitle("");
    setAction("");
    setDate(new Date());
    setTagId("0");
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formErrors.find((error) => error.field === "title")
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {formErrors.find((error) => error.field === "title") && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formErrors.find((error) => error.field === "title")?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Action
            </label>
            <textarea
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formErrors.find((error) => error.field === "action")
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Action"
              onChange={(e) => setAction(e.target.value)}
              value={action}
            ></textarea>
            {formErrors.find((error) => error.field === "action") && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formErrors.find((error) => error.field === "action")?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formErrors.find((error) => error.field === "date")
                  ? "border-red-500"
                  : ""
              }`}
              type="datetime-local"
              onChange={(e) => setDate(new Date(e.target.value))}
              // value={new Date(date}
            />
            {formErrors.find((error) => error.field === "date") && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formErrors.find((error) => error.field === "date")?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tag As
            </label>
            <Tags
              tagsData={tagsData}
              tagId={tagId}
              setTagId={setTagId}
              formErrors={formErrors}
            />
            {formErrors.find((error) => error.field === "tagid") && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {formErrors.find((error) => error.field === "tagid")?.message}
              </span>
            )}
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
