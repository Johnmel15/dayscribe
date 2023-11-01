"use client";
import React, { FC, useEffect, useState } from "react";
import Display from "../Data";

interface DataProps {
  data: any;
}

const List: FC<DataProps> = (props) => {
  const { data } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data?.DailyLogs) {
      setIsLoading(false);
    }
  }, [data?.DailyLogs]);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div className="text-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <>
          {data?.DailyLogs.length > 0 ? (
            <>
              {data?.DailyLogs.map((logs: any, index: number) => (
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
