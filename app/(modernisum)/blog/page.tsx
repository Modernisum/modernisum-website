import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogListSection } from "@/components/shared/BlogListSection";
import { getBlogPosts } from "@/lib/data-engine";

export const metadata: Metadata = {
  title: "Engineering Blog & Tech Insights | Modernisum",
  description:
    "Technical articles and deep architectural insights on autonomous AI SaaS pipelines, Modernisum School OS, and Liquid Glass design systems.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-36 pb-24">
        <BlogListSection posts={posts} />
      </main>
      <Footer />
    </div>
  );
}
