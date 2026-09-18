import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAppRelease extends Document {
  version: string; // e.g. "2.8.1"
  title: string; // e.g. "Chat Responsiveness Improvements"
  releaseDate: string; // e.g. "August 13, 2026"
  overview: string; // Summary description
  improvements: string[];
  fixes: string[];
  patches: string[];
  downloadUrl: string; // Google Drive direct link or public link
  gdriveFileId?: string;
  fileSize: string; // e.g. "68.4 MB"
  sha256?: string;
  isPublished: boolean;
  isLatest: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AppReleaseSchema = new Schema<IAppRelease>(
  {
    version: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    releaseDate: { type: String, required: true },
    overview: { type: String, required: true },
    improvements: [{ type: String }],
    fixes: [{ type: String }],
    patches: [{ type: String }],
    downloadUrl: { type: String, required: true },
    gdriveFileId: { type: String },
    fileSize: { type: String, default: "68.4 MB" },
    sha256: { type: String },
    isPublished: { type: Boolean, default: true, index: true },
    isLatest: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AppRelease: Model<IAppRelease> =
  mongoose.models.AppRelease || mongoose.model<IAppRelease>("AppRelease", AppReleaseSchema);
