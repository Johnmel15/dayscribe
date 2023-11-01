import React from "react";
import RegisterForm from "./RegisterForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function Register() {
  const currentUser = await getCurrentUser();

  return <RegisterForm currentUser={currentUser} />;
}
