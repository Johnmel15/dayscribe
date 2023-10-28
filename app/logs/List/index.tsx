import React from "react";
import Display from "../Data";

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
            <Display data={logs} />
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
