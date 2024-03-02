"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { XIcon } from "lucide-react";


const NoCredits = () => {
    const router = useRouter();
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[16px] leading-[140%] text-blue-700">
              Insufficient Credits
            </p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
              onClick={() => router.push("/profile")}
            >
              <XIcon className="text-blue-700" />
            </AlertDialogCancel>
          </div>

          <Image
            src="/no-coins.svg"
            alt="credit coins"
            width={462}
            height={122}
          />

          <AlertDialogTitle className="font-bold text-[24px] leading-[120%] text-blue-900">
            Oops.... Looks like you&#39;ve run out of free credits!
          </AlertDialogTitle>

          <AlertDialogDescription className="font-normal text-[16px] leading-[140%] py-3">
            No worries, though - you can keep enjoying our services by grabbing
            more credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-purple-100 text-blue-600"
            onClick={() => router.push("/profile")}
          >
            No, Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-purple-100 text-blue-600  hover:bg-purple-200 bg-cover"
            onClick={() => router.push("/credits")}
          >
            Yes, Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoCredits;
