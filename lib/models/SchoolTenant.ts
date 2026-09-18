import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISchoolTenant extends Document {
  schoolCode: string; // e.g. "SCH-1082"
  name: string;
  affiliationBoard: string; // e.g. "CBSE", "ICSE", "State Board", "IB", "Cambridge"
  affiliationNumber?: string;
  streams: string[]; // e.g. ["PCM", "PCB", "Commerce", "Arts"]
  classLevels?: string[]; // e.g. ["Primary", "Secondary", "Senior Secondary"]
  contactEmail: string;
  contactPhone: string;
  adminName: string;
  adminEmail: string;
  adminPasswordHash: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  address: string;
  subscriptionTier: "Starter" | "Growth" | "Enterprise";
  subscriptionPriceYearly: number;
  isActive: boolean;
  isSuspended: boolean;
  suspendedReason?: string;
  rateLimitRpm: number;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolTenantSchema = new Schema<ISchoolTenant>(
  {
    schoolCode: { type: String, required: true, unique: true, index: true, uppercase: true },
    name: { type: String, required: true, trim: true, index: true },
    affiliationBoard: { type: String, required: true, default: "CBSE" },
    affiliationNumber: { type: String, trim: true },
    streams: [{ type: String }],
    classLevels: [{ type: String }],
    contactEmail: { type: String, required: true, lowercase: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    adminName: { type: String, required: true, trim: true },
    adminEmail: { type: String, required: true, lowercase: true, trim: true },
    adminPasswordHash: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    subscriptionTier: {
      type: String,
      enum: ["Starter", "Growth", "Enterprise"],
      default: "Growth",
      index: true,
    },
    subscriptionPriceYearly: { type: Number, default: 35000 },
    isActive: { type: Boolean, default: true, index: true },
    isSuspended: { type: Boolean, default: false, index: true },
    suspendedReason: { type: String },
    rateLimitRpm: { type: Number, default: 120 },
  },
  { timestamps: true }
);

export const SchoolTenant: Model<ISchoolTenant> =
  mongoose.models.SchoolTenant || mongoose.model<ISchoolTenant>("SchoolTenant", SchoolTenantSchema);
