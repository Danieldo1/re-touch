import React from 'react'
import { ImageDown } from "lucide-react";

const ChangedImage = ({
    image,type,title,transformationConfig,isLoading,setIsLoading,hasDownload = false
}: TransformedImageProps) => {

    const downloadHandler = () => {
        
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
        <div className="relative"></div>
      ) : (
        <div className=" font-medium text-[14px] leading-[120%] h-full min-h-72 flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner flex justify-center items-center">
            Transformation Image
        </div>
      )}
    </div>
  );
}

export default ChangedImage