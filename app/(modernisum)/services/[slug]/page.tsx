import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getServices, getServiceBySlug } from "@/lib/data-engine";
import { ServiceDetailSection } from "@/components/shared/ServiceDetailSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | Modernisum" };
  }

  return {
    title: `${service.title} | Software Solutions`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Modernisum Software Solutions`,
      description: service.shortDescription,
    },
  };
}

export const revalidate = 60;

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-36 pb-24">
        <ServiceDetailSection service={service} allServices={allServices} />
      </main>
      <Footer />
    </div>
  );
}
