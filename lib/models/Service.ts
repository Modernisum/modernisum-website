import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: "AI SaaS" | "Web Development" | "Mobile Development" | "Custom Software" | "IoT & Automation" | "Cloud & APIs" | "Modern School ERP";
  iconName: string;
  features: string[];
  faqs: { question: string; answer: string }[];
  highlightBadge?: string;
  isPopular?: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "AI SaaS",
        "Web Development",
        "Mobile Development",
        "Custom Software",
        "IoT & Automation",
        "Cloud & APIs",
        "Modern School ERP",
      ],
      required: true,
      index: true,
    },
    iconName: { type: String, default: "Sparkles" },
    features: [{ type: String }],
    faqs: [
      new Schema(
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
        { _id: false }
      ),
    ],
    highlightBadge: { type: String },
    isPopular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
