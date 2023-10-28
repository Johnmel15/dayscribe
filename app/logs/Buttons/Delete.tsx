"use client";
import ToastrComponent from "@/app/components/toastr";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface Props {
  id: string;
}

const Delete: FC<Props> = (props) => {
  const { id } = props;

  const router = useRouter();
  const { showToast } = ToastrComponent();

  const handleDelete = () => {
    axios
      .delete(`/api/logs/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
        showToast("Log is successfully saved!", "success");
      });
  };
  return (
    <>
      <button
        className="font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-red-500 dark:hover:text-red-700"
        onClick={handleDelete}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          {" "}
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />{" "}
        </svg>
      </button>
    </>
  );
};

export default Delete;
