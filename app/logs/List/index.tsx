import ToastrComponent from "@/app/components/toastr";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import Delete from "../Buttons/Delete";

async function getLogs() {
  const res = await fetch(`${process.env.BASE_URL}/api/logs`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    console.log(res);
  }

  return res.json();
}

const List = async () => {
  const data = await getLogs();
  return (
    <div className="container mx-auto px-4">
      {data.length > 0 ? (
        <>
          {data.map((logs: any, index: number) => (
            <div className="bg-white p-6 rounded-lg shadow-xl mb-4" key={index}>
              <div className="flex items-start justify-between h-7">
                <h2 className="mb-0 font-medium text-lg text-gray-600">
                  {logs.title}
                </h2>

                <div className="flex items-baseline">
                  <div className="tooltip" data-tip="Delete">
                    <Delete id={data.id} />
                  </div>
                  <div className="tooltip" data-tip="Edit">
                    <button
                      type="button"
                      className="font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-red-500 dark:hover:text-red-700 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"
                          style={{ fill: "green" }}
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline">
                <p className="mb-3 font-300 text-xs text-gray-600">
                  <span className="font-bold">Date & Time:</span>&nbsp;
                  {moment(logs.date).format("MMMM Do YYYY @ h:mm: A")}
                </p>
              </div>
              <p className="text-gray-500 text-sm font-normal">{logs.action}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <p className="text-gray-500 text-sm text-center">No Data Found.</p>
        </>
      )}
    </div>
  );
};

export default List;
