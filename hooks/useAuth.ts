// Authentication hook - middleware-style protection for pages
import type { RootState } from "@/redux/store";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useAuthProtection() {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const segments = useSegments();
  const [isMounted, setIsMounted] = useState(false);

  // Wait for component to mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Don't navigate until component is mounted and router is ready
    if (!isMounted) return;

    console.log("🔐 Auth check - User:", user ? "Authenticated" : "Not authenticated");
    console.log("📍 Current segments:", segments);

    // Check if user is not logged in and not already on login page
    if (!user && segments[0] !== "login") {
      console.log("🚪 No user found - redirecting to login");
      // Small delay to ensure router is ready
      setTimeout(() => {
        router.replace("/login");
      }, 100);
    } else if (user) {
      console.log("✅ User authenticated - allowing access");
    }
  }, [user, isMounted, segments]);

  return { user, isAuthenticated: !!user };
}
