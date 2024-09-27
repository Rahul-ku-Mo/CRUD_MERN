import { Loader } from "@/components/ui/Loader";

export default function LoadingPage() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
}
