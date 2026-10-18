import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data-engine";
import { BlogArticleContent } from "@/components/shared/BlogArticleContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found | Modernisum" };
  }

  return {
    title: `${post.title} | Modernisum Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage.startsWith("http")
            ? post.coverImage
            : `https://modernisum.com${post.coverImage}`,
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = await getBlogPosts();
  const post = allPosts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

  if (!post) {
    notFound();
  }

  const otherPosts = allPosts.filter((p) => p.slug.toLowerCase() !== slug.toLowerCase());
  const nextPost = otherPosts.length > 0 ? otherPosts[0] : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        <BlogArticleContent post={post} nextPost={nextPost} />
      </main>
      <Footer />
    </div>
  );
}
