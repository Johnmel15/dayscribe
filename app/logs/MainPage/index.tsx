"use client";
import React, { FC, useEffect, useState } from "react";
import Header from "../Header";
import Form from "../Form/MainForm";
import List from "../List";
import { useRouter } from "next/navigation";

interface UserProps {
  currentUser: any;
}
const MainPage: FC<UserProps> = (props) => {
  const router = useRouter();
  const [showPage, setShowPage] = useState<boolean>(false);

  useEffect(() => {
    if (!props.currentUser) {
      router.push("/login");
    } else {
      setShowPage(true);
    }
  }, [props.currentUser, router]);

  return (
    <>
      {showPage && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Header userName={props?.currentUser?.name} />

          <hr className="mb-4" />
          <div className="flex flex-col sm:flex-row">
            <Form data={props.currentUser} />
            <List data={props.currentUser} />
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
