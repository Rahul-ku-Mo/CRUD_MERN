"use client";

import Dashboard from "./_components/Dashboard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  const router = useRouter();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return <Dashboard />;
}
