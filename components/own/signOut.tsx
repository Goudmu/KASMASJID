"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

const LogoutComponent = () => {
  const logoutHandler = async () => {
    await signOut();
  };
  return <Button onClick={logoutHandler}>Logout</Button>;
};

export default LogoutComponent;
