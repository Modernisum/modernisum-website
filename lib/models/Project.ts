import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProjectScreenshot {
  title: string;
  category?: string;
  caption?: string;
  url: string;
  thumbnailUrl?: string;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  screenshots?: IProjectScreenshot[];
  tags: string[];
  metrics: { label: string; value: string }[];
  websiteUrl?: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    client: { type: String, default: "Enterprise Client" },
    category: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "/logo.png" },
    screenshots: [
      new Schema(
        {
          title: { type: String, required: true },
          category: { type: String },
          caption: { type: String },
          url: { type: String, required: true },
          thumbnailUrl: { type: String },
        },
        { _id: false }
      ),
    ],
    tags: [{ type: String }],
    metrics: [
      new Schema(
        {
          label: { type: String },
          value: { type: String },
        },
        { _id: false }
      ),
    ],
    websiteUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
