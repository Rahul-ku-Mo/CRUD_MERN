import { Loader } from "@/components/ui/Loader";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login");

  return (
    <div className="absolute inset-0 flex items-center justify-center h-full w-full">
      <Loader />
    </div>
  );
}
