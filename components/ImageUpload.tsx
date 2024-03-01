'use cleint'

import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
    publicId: string;
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    image: any;
    type: string;
}

const ImageUpload = ({
    publicId,
    onValueChange,
    setImage,
    image,
    type,
}:MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prev: any) => ({
        ...prev,
        publicId: result?.info?.public_id,
        width: result?.info?.width,
        height: result?.info?.height,
        secureUrl: result?.info?.secure_url
    }))
    onValueChange(result?.info?.public_id)
    toast({
        title: "Upload successful.",
        description: "1 credit deducted from your balance.",
        variant: "success",
        duration: 4000,
    })
  };
  const onErrorHandler = () => {
    toast({
        title: "Upload failed.",
        description: "Please try again.",
        variant: "destructive",
        duration: 4000,
    })
  };

  return (
    <CldUploadWidget
      uploadPreset="RE-TOUCH"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[30px] leading-[140%] text-blue-900">
            Original
          </h3>
          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="Image Preview"
                  sizes={"(max-width: 768px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
                />
              </div>
            </>
          ) : (
            <div
              className="flex justify-center items-center h-72 cursor-pointer flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner"
              onClick={() => open()}
            >
              <div className="rounded-[16px] bg-white  flex flex-col items-center p-5 shadow-sm shadow-purple-200/50">
                <Image
                  src={"/add-img.svg"}
                  alt="Add Image"
                  width={24}
                  height={24}
                  className="pb-2 w-24 h-24"
                />
                <p className="font-medium text-[14px] leading-[120%]">
                  Click Here to Upload
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
