// app/index.tsx
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RootIndex() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/dashboard");
    } else {
      router.replace("/login");
    }
  }, [user]);

  return null; // just redirect, nothing to render
}
