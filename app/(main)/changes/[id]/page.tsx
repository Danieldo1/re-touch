import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import ChangedImage from "@/components/ChangedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";

const ChangesPage = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="font-medium text-[14px] leading-[120%] md:font-medium  md:text-[16px]  md:leading-[140%] flex gap-2">
          <p className="text-blue-900">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-blue-700/50 md:block">&#x25CF;</p>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium  md:text-[16px]  md:leading-[140%] flex gap-2 ">
              <p className="text-blue-900">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-blue-700/50 md:block">&#x25CF;</p>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium  md:text-[16px]  md:leading-[140%] flex gap-2">
              <p className="text-blue-900">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-blue-700/50 md:block">&#x25CF;</p>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium  md:text-[16px]  md:leading-[140%] flex gap-2">
              <p className="text-blue-900">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-blue-700/15">
        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-8 md:grid-cols-2">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[30px] leading-[140%] text-blue-900">
              Original
            </h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <ChangedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isLoading={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>
        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button
              asChild
              type="button"
              className="bg-purple-700 bg-cover rounded-full py-4 px-6 font-medium text-[16px] leading-[140%] h-[50px] w-full md:h-[54px] capitalize"
            >
              <Link href={`/changes/${image._id}/update`}>Update Image</Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ChangesPage;
