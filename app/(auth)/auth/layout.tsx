export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
    </>
  );
}
