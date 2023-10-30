import axios from "axios";
import React, { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface FormErrorProps {
  field: string;
  message: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Props {
  tagsData: Tag[];
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<{
    title: string;
    action: string;
    date: Date | string;
    tagId: string;
  }>;
}

const Tags: FC<Props> = ({ tagsData, errors, register }) => {
  return (
    <>
      {tagsData.length > 0 && (
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.tagId ? "border-red-500" : ""
          }`}
          {...register("tagId", { required: "This field is required" })}
        >
          <option disabled value="">
            Select Tag
          </option>
          {tagsData.map((tag: Tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default Tags;
