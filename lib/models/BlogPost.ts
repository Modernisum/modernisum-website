import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  coverImage: string;
  readTime: string;
  published: boolean;
  publishedAt: Date;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  comments?: Array<{
    _id?: string;
    authorName: string;
    authorEmail: string;
    commentText: string;
    createdAt: Date;
    isRead: boolean;
    isApproved: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "AI & Tech" },
    author: {
      name: { type: String, default: "Modernisum Team" },
      role: { type: String, default: "Senior Software Architect" },
      avatar: { type: String, default: "/logo.png" },
    },
    tags: [{ type: String }],
    coverImage: { type: String, default: "/logo.png" },
    readTime: { type: String, default: "5 min read" },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },
    comments: [
      {
        authorName: { type: String, required: true },
        authorEmail: { type: String, required: true },
        commentText: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
        isApproved: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
