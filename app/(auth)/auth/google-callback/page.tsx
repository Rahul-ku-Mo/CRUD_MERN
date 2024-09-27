"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Loader } from "@/components/ui/Loader";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      exchangeTokenForAccessToken(code);
    } else {
      router.push("/auth/login?error=NoCode");
    }
  }, [router, searchParams]);

  const exchangeTokenForAccessToken = async (code: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/exchange-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      if (response.ok) {
        const { token } = await response.json();

        Cookies.set("accessToken", token);

        router.push("/dashboard");
      } else {
        router.push("/auth/login?error=TokenExchangeFailed");
      }
    } catch (error) {
      router.push("/auth/login?error=TokenExchangeError");
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
}
