'use client'

import React from 'react'
import { ImageDown, Loader2 } from "lucide-react";
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

const ChangedImage = ({
    image,type,title,transformationConfig,isLoading,setIsLoading,hasDownload = false
}: TransformedImageProps) => {

    const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        download(getCldImageUrl({
          width: image?.width,
          height: image?.height,
          src: image?.publicId,
          ...transformationConfig}),title);
    }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[30px] leading-[140%] text-blue-900">
          Transformed
        </h3>

        {hasDownload && (
          <button
            className="bg-blue-900 flex justify-center items-center gap-2 hover:bg-blue-800 text-white font-bold rounded-full px-2 py-1"
            onClick={downloadHandler}
          >
            <ImageDown /> Download
          </button>
        )}
      </div>
      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 768px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
            onLoad={() => {
              setIsLoading && setIsLoading(false);
            }}
            onError={() => {
              debounce(() => {
                setIsLoading && setIsLoading(false);
              }, 8000)()
            }}
            {...transformationConfig}
          />
          {isLoading && (
            <div className="flex justify-center items-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-blue-900/90">
                <Loader2 className="animate-spin w-8 h-8" />
                <p className="text-white/80 ">Please wait this may take few seconds</p>
            </div>
          )}
        </div>
      ) : (
        <div className=" font-medium text-[14px] leading-[120%] h-full min-h-72 flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner flex justify-center items-center">
          Transformation Image
        </div>
      )}
    </div>
  );
}

export default ChangedImage