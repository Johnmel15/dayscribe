"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ToastrComponent from "@/app/components/toastr";
import Tags from "../Select/Tags";
import { useLogs } from "@/app/state/logs";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios, { AxiosResponse } from "axios";

interface LogFormArgs {
  title: string;
  action: string;
  date: Date | string;
  tagId: string;
}

interface UserProps {
  data: any;
}

interface Tag {
  id: string;
  name: string;
}

const Form: FC<UserProps> = (props) => {
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
  const { data: userInfo } = props;
  const [tagsData, setTagsData] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LogFormArgs>({
    defaultValues: { title: title, action: action, date: date, tagId: tagId },
  });

  const router = useRouter();
  const { showToast } = ToastrComponent();
  const watchAll = watch();

  useEffect(() => {
    const fetchTagsData = async () => {
      axios
        .get(`/api/tags`)
        .then((res) => {
          console.log(res);
          const data = res.data;
          setTagsData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchTagsData();
  }, []);

  useEffect(() => {
    const setUpdate = {
      id: id,
      title: title,
      action: action,
      date: date ? new Date(date) : date,
      tagId: tagId,
    };
    Object.entries(setUpdate).forEach(([name, value]) =>
      setValue(name as keyof LogFormArgs, value)
    );
  }, [id]);

  async function onSubmit(form: any) {
    setIsLoading(true);
    const data = { ...form, userId: userInfo.id };
    console.log(data);
    let logs: any = {};
    let res: any = {};
    if (id) {
      logs = await fetch(`/api/logs/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).finally(() => {
        setIsLoading(false);
      });
      res = await logs.json();
    } else {
      logs = await fetch(`/api/logs`, {
        method: "POST",
        body: JSON.stringify(data),
      }).finally(() => {
        setIsLoading(false);
      });
      res = await logs.json();
    }

    if (logs.status === 200) {
      showToast("Log is successfully saved!", "success");
      clearFields();
      await handleAddData();
      router.refresh();
    } else {
      console.log(res.message);
    }
  }

  const clearFields = () => {
    resetField("title");
    resetField("action");
    resetField("date");
    resetField("tagId");
    setId("");
    setTitle("");
    setAction("");
    setDate("");
    setTagId("");
  };

  const handleAddData = async () => {
    const event = new Event("dataAdded");
    window.dispatchEvent(event);
  };

  const handleLogDate = (e: Date) => {
    setValue("date", e);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:pr-4 lg:pl-0 w-full sm:w-3/4 md:w-3/4 lg:w-2/4 ">
      <div className="flex justify-center sm:justify-start w-full">
        <div className="w-full sm:max-w-md items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-stone-400"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.title ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Title"
                {...register("title", { required: "This field is required" })}
              />
              {errors.title && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.title.message as React.ReactNode}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Action
              </label>
              <textarea
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.action ? "border-red-500" : ""
                }`}
                placeholder="Action"
                {...register("action", { required: "This field is required" })}
              ></textarea>
              {errors.action && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.action.message as React.ReactNode}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <DatePicker
                wrapperClassName="w-full"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.date ? "border-red-500" : ""
                }`}
                placeholderText="Select Date"
                selected={watchAll.date as Date}
                maxDate={new Date()}
                {...register("date", {
                  required: "This field is required!",
                })}
                onChange={handleLogDate}
                showTimeSelect
                timeFormat="h:mm aa"
                dateFormat="MMMM d, yyyy h:mm aa"
              />

              {errors.action && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.date?.message as React.ReactNode}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tag As
              </label>
              <Tags tagsData={tagsData} register={register} errors={errors} />
              {errors.tagId && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.tagId.message as React.ReactNode}
                </span>
              )}
            </div>

            <div className="flex items-end justify-end">
              <button
                className={`${isLoading} ? btn : bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
