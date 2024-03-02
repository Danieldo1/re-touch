import { Schema, model, models, Document } from "mongoose";

export interface IImage extends Document{
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string;
  transformationUrl?: string;
  width?: number;
  height?: number;
  config?: object;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    clerkId: string;
  }
  createdAt: Date;
  updatedAt: Date;
}

const ImageScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    transformationType: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    secureURL: {
      type: String,
      required: true,
    },
    transformationUrl: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    config: {
      type: Object,
    },
    aspectRatio: {
      type: String,
    },
    color: {
      type: String,
    },
    prompt: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Image = models?.Image || model("Image", ImageScheme);

export default Image;