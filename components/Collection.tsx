"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { IImage } from "@/lib/models/Image";
import { formUrlQuery } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "./ui/button";

import { Search } from "./Search";
import { ScanEye, GalleryVerticalEnd, Images, Eraser, Paintbrush } from "lucide-react";


export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="md:flex md:justify-between md:items-center mb-6 flex flex-col gap-5 md:flex-row">
        <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-blue-900">
          Recent Edits
        </h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-60 w-full rounded-[10px] border border-blue-600/10 bg-white/20">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent  bg-purple-100 w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex justify-center items-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent w-32 bg-purple-100 bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link
        href={`/changes/${image._id}`}
        className="flex flex-1 cursor-pointer flex-col gap-5 rounded-[16px] border-2 border-purple-200/15 bg-white p-4 shadow-xl shadow-purple-200/10 transition-all hover:shadow-purple-200/20"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[20px] leading-[140%] mr-3 line-clamp-1 text-blue-800">
            {image.title}
          </p>

          {image.transformationType && (
            <p className="font-semibold text-[20px] leading-[140%] text-blue-800">
              {image.transformationType === "restore" && <ScanEye />}
              {image.transformationType === "removeBackground" && (
                <GalleryVerticalEnd />
              )}
              {image.transformationType === "fill" && <Images />}
              {image.transformationType === "remove" && <Eraser />}
              {image.transformationType === "recolor" && <Paintbrush />}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};