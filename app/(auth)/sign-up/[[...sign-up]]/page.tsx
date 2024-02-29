import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center w-full flex-col bg-[#c0c0c0] ">
      <SignUp />
    </div>
  );
}
