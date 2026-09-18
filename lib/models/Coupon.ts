import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountPercent: number;
  validUntil: Date;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    discountPercent: { type: Number, required: true, min: 1, max: 100 },
    validUntil: { type: Date, required: true },
    maxUses: { type: Number, default: 50 },
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);
