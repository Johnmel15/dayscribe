"use client";
import React, { useEffect, useState } from "react";
import Display from "../Data";

const List = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/logs`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch logs");
        }
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error(error);
        setLogs([]);
      }
    };

    fetchLogs();
  }, [logs]);

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
