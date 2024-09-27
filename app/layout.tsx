import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello Small Scale",
  description: "A small scale version of Trello",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <nav className="bg-primary text-white shadow-sm fixed top-0 w-full">
            <div className=" px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-14">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold">Task Manager</h1>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
