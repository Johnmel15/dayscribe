import { getCurrentUser } from "@/actions/getCurrentUser";
import React from "react";
import LoginForm from "./LoginForm";

export default async function login() {
  const currentUser = await getCurrentUser();

  return <LoginForm currentUser={currentUser} />;
}
