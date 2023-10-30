"use client";
import React, { FC, useState } from "react";
import Delete from "../Buttons/Delete";
import moment from "moment";
import Show from "../Buttons/Show";
import Edit from "../Buttons/Edit";

interface Props {
  data: {
    id: string;
    title: string;
    action: string;
    date: Date;
    Tag: {
      id: string;
      name: string;
    };
  };
}

const Display: FC<Props> = (props) => {
  const { id, title, action, date, Tag: tag } = props.data;

  let badgeColor = "badge-info";
  if (tag.name.toUpperCase() === "JOURNAL") {
    badgeColor = "badge-warning";
  }
  if (tag.name.toUpperCase() === "REMINDER") {
    badgeColor = "badge-error";
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-xl mb-4">
        <div className="flex items-baseline sm:items-start md:items-start lg:items-center justify-between h-fit flex-col sm:flex-col md:flex-col lg:flex-row">
          <div className="flex items-center sm:items-start md:items-start lg:items-center flex-row sm:flex-col md:flex-col lg:flex-row">
            <h2 className="mb-0 font-medium text-lg text-gray-600 mr-2">
              {title}
            </h2>
            <div className={`badge badge-info badge-outline ${badgeColor}`}>
              {tag.name}
            </div>
          </div>

          <div className="flex items-baseline">
            <div className="tooltip" data-tip="Show">
              <Show data={props.data} />
            </div>
            <div className="tooltip" data-tip="Edit">
              <Edit data={props.data} />
            </div>
            <div className="tooltip" data-tip="Delete">
              <Delete id={id} />
            </div>
          </div>
        </div>

        <div className="flex items-baseline">
          <p className="mb-3 font-300 text-xs text-gray-600">
            <span className="font-bold">Date & Time:</span>&nbsp;
            {moment(date).format("MMMM Do YYYY @ h:mm: A")}
          </p>
        </div>
        <p className="text-gray-500 text-sm font-normal line-clamp-1">
          {action}
        </p>
      </div>
    </>
  );
};

export default Display;
