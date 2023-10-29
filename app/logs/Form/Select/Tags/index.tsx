import axios from "axios";
import React, { FC } from "react";

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
  tagId: string;
  setTagId: (value: string) => void;
  formErrors: FormErrorProps[];
}

const Tags: FC<Props> = ({ tagsData, tagId, setTagId, formErrors }) => {
  const handleTags = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTagId(value);
  };
  return (
    <>
      {tagsData.length > 0 && (
        <select
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formErrors.find((error) => error.field === "tagid")
              ? "border-red-500"
              : ""
          }`}
          onChange={(e) => handleTags(e)}
          value={tagId}
        >
          <option disabled value="0">
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
