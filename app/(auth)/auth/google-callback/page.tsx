"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Loader } from "@/components/ui/Loader";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  if (code) {
    exchangeTokenForAccessToken(code);
  } else {
    // Handle error case
    router.push("/auth/login?error=NoCode");
  }

  async function exchangeTokenForAccessToken(code : string) {
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
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Handle error
        router.push("/auth/login?error=TokenExchangeFailed");
      }
    } catch (error) {
      console.error("Error exchanging token:", error);
      router.push("/auth/login?error=TokenExchangeError");
    }
  }

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={<Loader />}>
      <CallbackContent />
    </Suspense>
  );
}
