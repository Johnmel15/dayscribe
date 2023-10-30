"use client";
import Modal from "@/app/components/modal";
import moment from "moment";
import React, { FC, useState } from "react";

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

const Show: FC<Props> = (props) => {
  const { title, action, date, Tag: tag } = props.data;
  const [isOpenShowModal, setIsOpenShowModal] = useState(false);

  const openModal = () => {
    setIsOpenShowModal(true);
  };

  const closeModal = () => {
    setIsOpenShowModal(false);
  };

  return (
    <>
      <button
        className="font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-red-500 dark:hover:text-red-700"
        onClick={openModal}
      >
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
            fillRule="nonzero"
            style={{ fill: "#167ccd" }}
          />
        </svg>
      </button>
      <Modal isOpen={isOpenShowModal} title={`${title}`} onClose={closeModal}>
        <div className="mt-2 text-start">
          <p className="text-xs text-gray-500 italic">
            {moment(date).format("MMMM Do YYYY @ h:mm: A")}
          </p>
          <p className="text-sm text-gray-500">{action}</p>
        </div>
      </Modal>
    </>
  );
};

export default Show;
