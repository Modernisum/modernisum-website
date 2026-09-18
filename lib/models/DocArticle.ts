import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDocArticle extends Document {
  slug: string;
  category: string;
  title: string;
  overview: string;
  steps: string[];
  tip?: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DocArticleSchema = new Schema<IDocArticle>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    steps: [{ type: String }],
    tip: { type: String },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const DocArticle: Model<IDocArticle> =
  mongoose.models.DocArticle || mongoose.model<IDocArticle>("DocArticle", DocArticleSchema);
