"use client";

import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/queryClient";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-primary text-white shadow-sm">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                Cookies.remove("accessToken");
                router.push("/auth/login");
                queryClient.clear();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
