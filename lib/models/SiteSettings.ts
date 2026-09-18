import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  funFacts: {
    projectsCompleted: number;
    satisfiedClients: number;
    itSpecialists: number;
    smartSolutions: number;
    systemUptime: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, default: "Modernisum" },
    tagline: { type: String, default: "AI-Integrated SaaS & Precision Software Architecture" },
    phone: { type: String, default: "+91 9368671007" },
    email: { type: String, default: "contact@modernisum.com" },
    address: {
      type: String,
      default: "Jail Chungi, Kila Road, Near CCS University, Meerut, Uttar Pradesh, Pin-250001",
    },
    workingHours: { type: String, default: "Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 3:00 PM" },
    funFacts: {
      projectsCompleted: { type: Number, default: 128 },
      satisfiedClients: { type: Number, default: 85 },
      itSpecialists: { type: Number, default: 24 },
      smartSolutions: { type: Number, default: 42 },
      systemUptime: { type: String, default: "99.98%" },
    },
    socialLinks: {
      facebook: { type: String, default: "https://facebook.com/modernisum" },
      twitter: { type: String, default: "https://twitter.com/modernisum" },
      linkedin: { type: String, default: "https://linkedin.com/company/modernisum" },
      github: { type: String, default: "https://github.com/Modernisum" },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
