import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  action: string; // e.g. "SCHOOL_REGISTERED", "SCHOOL_SUSPENDED", "SCHOOL_UNSUSPENDED", "COUPON_CREATED"
  category: "Schools" | "Billing" | "Auth" | "Security" | "System";
  actor: string; // Admin email or System
  target: string; // School code or entity ID
  details: string;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: ["Schools", "Billing", "Auth", "Security", "System"],
      default: "Schools",
      index: true,
    },
    actor: { type: String, required: true, default: "system" },
    target: { type: String, required: true, index: true },
    details: { type: String, required: true },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
