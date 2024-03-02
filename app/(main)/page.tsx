

import { navigationLinks } from "@/components/SideBar";

import Link from "next/link";
import Image from "next/image";
import { Collection } from "@/components/Collection";
import { getAllImages } from "@/lib/actions/image.actions";
import NavLink from "@/components/NavLink";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

   const images = await getAllImages({ page, searchQuery });
  return (
    <>
      <section className="sm:flex sm:justify-center sm:items-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="text-[36px]  font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] max-w-[500px] flex-wrap text-center text-white shadow-sm">
          Get inspired with
          <span className="text1 line-clamp-1 "> Re-Touch!</span>
        </h1>
        <ul className="flex gap-20 justify-center items-center w-full">
         <NavLink />
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection hasSearch={true} images={images?.data} totalPages={images?.totalPages} page={page} />
      </section>
    </>
  );
};

export default Home;
