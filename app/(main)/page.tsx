import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="">
      <p>Home</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
