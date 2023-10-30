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
  const logs = await getLogs();

  return (
    <div className="container mx-auto px-4">
      {logs.length > 0 ? (
        <>
          {logs.map((logs: any, index: number) => (
            <Display data={logs} key={index} />
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
