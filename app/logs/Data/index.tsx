"use client";
import React, { FC, useState } from "react";
import Delete from "../Buttons/Delete";
import moment from "moment";
import Show from "../Buttons/Show";

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
        <div className="flex items-end justify-between h-7">
          <div className="flex items-center">
            <h2 className="mb-0 font-medium text-lg text-gray-600">{title}</h2>
            &nbsp;
            <div className={`badge badge-info badge-outline ${badgeColor}`}>
              {tag.name}
            </div>
          </div>

          <div className="flex items-baseline">
            <div className="tooltip" data-tip="Show">
              <Show data={props.data} />
            </div>
            <div className="tooltip" data-tip="Edit">
              <button
                type="button"
                className="font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-red-500 dark:hover:text-red-700 "
              >
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-7.403-3.398 9.124-9.125c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-9.143 9.103c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 7.651-7.616 2.335 2.327-7.637 7.638z"
                    fillRule="nonzero"
                    style={{ fill: "green" }}
                  />
                </svg>
              </button>
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
