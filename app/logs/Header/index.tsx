"use client";
import { signOut } from "next-auth/react";
import React, { FC, useState } from "react";

interface UserProps {
  userName: string | undefined | null;
}

const Header: FC<UserProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="mb-4 sm:mb-0">
        <h1 className="pt-5 text-2xl font-bold text-gray-600">Dayscribe</h1>
        <p className="text-sm font-300 text-gray-600">Your Digital Logbook</p>
      </div>
      <div>
        <h1 className="pt-5 text-md font-bold text-gray-600">
          {props.userName}
        </h1>
        <p
          className="text-right text-sm font-300 text-gray-600 mb-4 sm:mb-0 text-red-500 cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Header;
