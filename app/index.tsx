import type { RootState } from "@/redux/store";
import { Redirect } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state: RootState) => state.user.user);

  // If user is logged in, redirect to dashboard
  // Otherwise, redirect to login
  return user ? (
    <Redirect href="/(tabs)/dashboard" />
  ) : (
    <Redirect href="/login" />
  );
}
