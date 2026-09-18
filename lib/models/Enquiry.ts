import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  serviceNeeded: string;
  budgetRange?: string;
  projectDescription: string;
  status: "new" | "in_progress" | "resolved" | "archived";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    serviceNeeded: { type: String, required: true },
    budgetRange: { type: String },
    projectDescription: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved", "archived"],
      default: "new",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
