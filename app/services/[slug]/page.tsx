import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { getServices, getServiceBySlug } from "@/lib/data-engine";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

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

  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      {service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      <main className="flex-1 pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-cyan-300 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-300 font-medium">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content Body */}
            <div className="lg:col-span-8 space-y-10">
              {/* Header Card */}
              <LiquidGlassCard
                glowColor="rgba(0, 242, 254, 0.15)"
                className="p-8 sm:p-10 rounded-3xl border border-white/10"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-300 mb-4 border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{service.category}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight mb-4">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                  <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                    <GlassButton
                      variant="primary"
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Request Architecture Proposal
                    </GlassButton>
                  </Link>

                  <a href="tel:+919368671007">
                    <GlassButton variant="secondary">
                      Call Technical Architect
                    </GlassButton>
                  </a>
                </div>
              </LiquidGlassCard>

              {/* Core Features & Deliverables */}
              <LiquidGlassCard
                glowColor="rgba(121, 40, 202, 0.12)"
                className="p-8 sm:p-10 rounded-3xl border border-white/10"
              >
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-6 flex items-center gap-2.5">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                  <span>Architecture Specifications & Features</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </LiquidGlassCard>

              {/* Service Specific FAQs */}
              {service.faqs.length > 0 && (
                <LiquidGlassCard
                  glowColor="rgba(0, 242, 254, 0.1)"
                  className="p-8 sm:p-10 rounded-3xl border border-white/10"
                >
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-6 flex items-center gap-2.5">
                    <HelpCircle className="w-6 h-6 text-purple-400" />
                    <span>Technical Inquiries & FAQs</span>
                  </h3>

                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                      >
                        <h4 className="text-sm sm:text-base font-semibold text-white mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </LiquidGlassCard>
              )}
            </div>

            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Inquiry Box */}
              <LiquidGlassCard
                glowColor="rgba(0, 242, 254, 0.15)"
                className="p-6 rounded-3xl border border-cyan-500/30 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto mb-3 text-cyan-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Need a Custom Solution?
                </h4>
                <p className="text-xs text-slate-300 mb-4 font-light">
                  Our Meerut engineering center can assemble a specialized prototype within 7 days.
                </p>
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                  <GlassButton variant="primary" size="sm" className="w-full">
                    Schedule Technical Discussion
                  </GlassButton>
                </Link>
              </LiquidGlassCard>

              {/* Related Services List */}
              <LiquidGlassCard
                glowColor="rgba(121, 40, 202, 0.1)"
                className="p-6 rounded-3xl border border-white/10"
              >
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">
                  Explore Other Capabilities
                </h4>
                <div className="space-y-2">
                  {otherServices.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/services/${other.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/10 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all group"
                    >
                      <span className="truncate pr-2">{other.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-cyan-300 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
