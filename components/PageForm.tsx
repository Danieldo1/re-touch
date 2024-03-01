"use client";

import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomField } from "./CustomField";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AspectRatioKey,
  aspectRatioOptions,
  debounce,
  deepMergeObjects,
} from "@/lib/utils";

import { updateCredits } from "@/lib/actions/user.actions";
import ImageUpload from "./ImageUpload";
import ChangedImage from "./ChangedImage";
import { transformationTypes } from "@/types/transformationTypes";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image.actions";
import { useRouter } from "next/navigation";

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const formSchema = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 characters" }),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const PageForm = ({
  data = null,
  action,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const [image, setImage] = useState(data);
  const [newChange, setNewChange] = useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const transformationType = transformationTypes[type];
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    if(data || image){
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      })

      const imageData = {
          title: values.title,
         aspectRatio: values.aspectRatio,
         color: values.color,
         prompt: values.prompt,
         publicId: image?.publicId,
         transformationType: type,
         width: image?.width,
         height: image?.height,
         config: transformationConfig,
         secureURL: image?.secureURL,
         transformationURL: transformationUrl,
      }
if(action === 'New'){
  try {
    const newImage = await addImage({
      image: imageData,
      userId,
      path: '/',
    })
    if(newImage){
      form.reset();
      setImage(data)
      router.push(`/changes/${newImage._id}`)
    }
  } catch (error) {
    console.log(error)
  }
}
if (action === "Update") {
  try {
    const updatedImage = await updateImage({
      image: {
        ...imageData,
        _id: data._id,
      },
      userId,
      path: `/changes/${data._id}`,
    });
    if (updatedImage) router.push(`/changes/${updatedImage._id}`);
  } catch (error) {
    console.log(error);
  }
}
}
setIsSubmitting(false);
  
}
  

  const onSelectField = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imgSize = aspectRatioOptions[value as AspectRatioKey];
    setImage((prev: any) => ({
      ...prev,
      aspectRatio: imgSize.aspectRatio,
      width: imgSize?.width,
      height: imgSize?.height,
    }));
    setNewChange(transformationType.config);
    return onChangeField(value);
  };

  const onInputChange = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewChange((prev: any) => ({
        ...prev,
        [type]: {
          ...prev?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000);
    return onChangeField(value);
  };

  const onTransformHandler = async () => {
    setIsLoading(true);
    setTransformationConfig(deepMergeObjects(newChange, transformationConfig));
    setNewChange(null);
    startTransition(async () => {
     await updateCredits(userId,-1);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => (
            <Input
              {...field}
              className="rounded-[16px] border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 text-blue-800 disabled:opacity-100 p-16-semibold h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent "
            />
          )}
        />

        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) => onSelectField(value, field.onChange)}
              >
                <SelectTrigger className="w-full border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 rounded-[16px] h-[50px] md:h-[54px] text-blue-800 p-16-semibold disabled:opacity-100 placeholder:text-blue-400/50 px-4 py-3 focus:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-0 focus-visible:outline-none">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="py-3 cursor-pointer hover:bg-purple-100"
                    >
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <CustomField
              name="prompt"
              control={form.control}
              formLabel={
                type === "remove" ? "Object to remove" : "Object to recolor"
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="rounded-[16px] border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 text-blue-800 disabled:opacity-100 p-16-semibold h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                  onChange={(e) =>
                    onInputChange(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />

            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="rounded-[16px] border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 text-blue-800 disabled:opacity-100 p-16-semibold h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                    onChange={(e) =>
                      onInputChange(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <ImageUpload
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />
          <ChangedImage
            image={image}
            type={type}
            title={form.getValues("title") || ""}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className="flex flex-col gap-5 ">
          <Button
            className="bg-[#6075c8] hover:bg-[#5956bb] font-bold bg-cover rounded-full py-4 px-6 p-16-semibold h-[50px] w-full md:h-[54px] capitalize"
            type="button"
            disabled={isLoading || newChange === null}
            onClick={onTransformHandler}
          >
            {isLoading ? "Loading..." : "Apply Transform"}
          </Button>
          <Button
            className="bg-[#4b7c51] hover:bg-[#38753f] font-bold bg-cover rounded-full py-4 px-6 p-16-semibold h-[50px] w-full md:h-[54px] capitalize"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PageForm;
