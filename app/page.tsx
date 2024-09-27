"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  router.push("/auth/login");

  return (
    <div>
      <h1>Hello World</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
