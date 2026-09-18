import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { getProjects, getProjectBySlug } from "@/lib/data-engine";
import {
  FolderGit2,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | Modernisum" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/projects" className="hover:text-cyan-300 transition-colors">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-300 font-medium">{project.title}</span>
          </nav>

          <LiquidGlassCard
            glowColor="rgba(0, 242, 254, 0.15)"
            className="p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                  Client: {project.client}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Media Aspect */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-white/10">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <span className="block text-xs font-mono text-slate-400">{m.label}</span>
                    <span className="block text-xl sm:text-2xl font-bold font-display text-cyan-300">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Case Overview & Architecture</h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                Technologies & Architecture Deployed
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Desktop Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      Live Application Interface &amp; Telemetry
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
                      Direct UI captures from active production clients and hardware integrations.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {project.screenshots.length} Live Production Screens
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.screenshots.map((screen, idx) => (
                    <div
                      key={idx}
                      className="group rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-cyan-400/40 transition-all duration-300 flex flex-col"
                    >
                      <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                        <Image
                          src={screen.url}
                          alt={screen.title}
                          fill
                          className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 450px"
                        />
                        {screen.category && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-cyan-300 border border-white/15">
                              {screen.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {screen.title}
                        </h4>
                        {screen.caption && (
                          <p className="text-xs text-slate-400 font-light leading-relaxed">
                            {screen.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <Link href="/contact">
                <GlassButton
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Engineer Similar Architecture
                </GlassButton>
              </Link>
              <Link href="/projects" className="text-xs text-slate-400 hover:text-white transition-colors">
                ← Back to All Case Studies
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
