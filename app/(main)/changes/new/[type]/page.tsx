import Header from "@/components/Header";
import React from "react";
import {
  ScanEye,
  Images,
  Eraser,
  Paintbrush,
  GalleryVerticalEnd,
} from "lucide-react";

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: <ScanEye className="w-7 h-7" />,
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: <GalleryVerticalEnd className="w-7 h-7" />,
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: <Images className="w-7 h-7" />,
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: <Eraser className="w-7 h-7" />,
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: <Paintbrush className="w-7 h-7" />,
  },
};


const UniqueStylesPage = ({params: {type}}:SearchParamProps) => {
  const transformation = transformationTypes[type];
  return (
  <Header 
    title={transformation.title} 
    subtitle={transformation.subTitle} 
    icon={transformation.icon}
    />
    
    );
};

export default UniqueStylesPage;
