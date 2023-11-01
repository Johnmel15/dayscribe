import React from "react";
import Home from "./home";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function index() {
  const currentUser = await getCurrentUser();
  return <Home currentUser={currentUser} />;
}
