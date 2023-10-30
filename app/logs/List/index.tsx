"use client";
import React, { useEffect, useState } from "react";
import Display from "../Data";

const List = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();

    const handleDataAdded = () => {
      fetchLogs();
    };
    const handleDataDeleted = () => {
      fetchLogs();
    };

    window.addEventListener("dataAdded", handleDataAdded);
    window.addEventListener("dataDeleted", handleDataDeleted);

    return () => {
      window.removeEventListener("dataAdded", handleDataAdded);
      window.removeEventListener("dataDeleted", handleDataDeleted);
    };
  }, []);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div className="text-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <>
          {logs.length > 0 ? (
            <>
              {logs.map((logs: any, index: number) => (
                <Display data={logs} key={index} />
              ))}
            </>
          ) : (
            <p className="text-gray-500 text-sm text-center">No Data Found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default List;
