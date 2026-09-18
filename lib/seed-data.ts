export interface SeedService {
  title: string;
  slug: string;
  category: "AI SaaS" | "Web Development" | "Mobile Development" | "Custom Software" | "IoT & Automation" | "Cloud & APIs" | "Modern School ERP";
  shortDescription: string;
  description: string;
  iconName: string;
  features: string[];
  faqs: { question: string; answer: string }[];
  highlightBadge?: string;
  isPopular?: boolean;
  order: number;
}

export interface SeedProjectScreenshot {
  title: string;
  category?: string;
  caption?: string;
  url: string;
  thumbnailUrl?: string;
}

export interface SeedProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  screenshots?: SeedProjectScreenshot[];
  tags: string[];
  metrics: { label: string; value: string }[];
  websiteUrl?: string;
  isFeatured: boolean;
  order: number;
}

export interface SeedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  coverImage: string;
  readTime: string;
  publishedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export const SEED_SITE_SETTINGS = {
  companyName: "Modernisum",
  tagline: "AI-Integrated SaaS & Precision Software Architecture",
  phone: "+91 9368671007",
  email: "contact@modernisum.com",
  address: "Jail Chungi, Kila Road, Near CCS University, Meerut, Uttar Pradesh, Pin-250001",
  workingHours: "Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 3:00 PM",
  funFacts: {
    projectsCompleted: 128,
    satisfiedClients: 85,
    itSpecialists: 24,
    smartSolutions: 42,
    systemUptime: "99.98%",
  },
  socialLinks: {
    facebook: "https://facebook.com/modernisum",
    twitter: "https://twitter.com/modernisum",
    linkedin: "https://linkedin.com/company/modernisum",
    github: "https://github.com/Modernisum",
  },
};

export const SEED_SERVICES: SeedService[] = [
  {
    title: "Modern School ERP Ecosystem",
    slug: "modern-school-erp",
    category: "Modern School ERP",
    shortDescription: "Complete digital transformation ecosystem for modern K-12 institutions with real-time GPS, RFID, and parent apps.",
    description: "Modern School transforms traditional school administration into a fully digital, automated, and intelligent ecosystem. It eliminates manual registers, paperwork, and disconnected tools—saving time, reducing operational costs, and improving student safety and academic outcomes.",
    iconName: "GraduationCap",
    features: [
      "Cross-Platform Desktop & Cloud Admin Panel",
      "Teacher, Student & Parent Native Mobile Apps",
      "Real-Time GPS Fleet Bus Tracking & Parent Alerts",
      "RFID / NFC Smart I-Card Automated Attendance",
      "AI-Driven Personalized Learning & Gamified Study Modules",
      "Integrated Digital Marketing & School Admission CRM",
    ],
    faqs: [
      {
        question: "How does GPS bus tracking notify parents?",
        answer: "Parents receive live vehicle telemetry directly inside the mobile app with automated proximity push notifications when the school bus is 5-10 minutes away.",
      },
      {
        question: "Does Modern School ERP function offline?",
        answer: "Yes, our desktop client and RFID terminals cache attendance records locally and automatically sync with the cloud whenever connectivity is re-established.",
      },
    ],
    highlightBadge: "Flagship Ecosystem",
    isPopular: true,
    order: 1,
  },
  {
    title: "AI-Integrated SaaS Solutions",
    slug: "ai-solutions",
    category: "AI SaaS",
    shortDescription: "Autonomous AI workflows, cognitive agent pipelines, and intelligent API layers integrated into your software products.",
    description: "We architect next-generation SaaS platforms powered by state-of-the-art Large Language Models, multimodal computer vision, and autonomous agent workflows. We turn static software into dynamic, self-optimizing business engines.",
    iconName: "Sparkles",
    features: [
      "Autonomous Multi-Agent Workflow Orchestration",
      "Natural Language Query Engines & Semantic Search",
      "Gemini & Claude API Production Integration",
      "Real-Time Automated Data Ingestion & Synthesis",
      "Predictive Analytics & Churn Prevention Models",
      "End-to-End Enterprise Role-Based Access Control",
    ],
    faqs: [
      {
        question: "Do you supply hardware or GPU servers?",
        answer: "No. Modernisum is strictly an AI software development and systems architecture company. We build software applications, cloud API integrations, and SaaS architectures on serverless and scalable cloud providers.",
      },
      {
        question: "Can you integrate AI into our existing web or mobile app?",
        answer: "Yes, our team specializes in embedding contextual AI copilot experiences and intelligent microservices into legacy or active software applications.",
      },
    ],
    highlightBadge: "High Demand",
    isPopular: true,
    order: 2,
  },
  {
    title: "Modern Web Application Development",
    slug: "web-development",
    category: "Web Development",
    shortDescription: "High-performance fullstack web applications built with Next.js, React 19, TypeScript, and micro-frontend architecture.",
    description: "Enterprise web applications engineered for sub-second Core Web Vitals, bulletproof security, and seamless user experiences. We implement hybrid rendering (SSR + SSG + ISR) to ensure maximum SEO visibility and lightning-fast customer engagement.",
    iconName: "Globe",
    features: [
      "Next.js 15+ App Router & Server Components",
      "Liquid Glassmorphic & Modern Aesthetic UI/UX",
      "Microservices & Serverless Node.js Backend",
      "Real-Time WebSocket & Push Notification Sync",
      "99+ Google Lighthouse & Core Web Vitals Score",
      "Complete Accessibility (WCAG 2.1 AA) Compliance",
    ],
    faqs: [
      {
        question: "What frameworks do you use for web applications?",
        answer: "We primarily build with React 19, Next.js (App Router), TypeScript, and Tailwind CSS, backed by robust Node.js, Express, or serverless API backends.",
      },
    ],
    highlightBadge: "Core Competency",
    isPopular: true,
    order: 3,
  },
  {
    title: "Mobile Applications (Android & iOS)",
    slug: "mobile-development",
    category: "Mobile Development",
    shortDescription: "Native and hybrid mobile applications delivering 120 FPS fluid physics, offline persistence, and biometric security.",
    description: "We craft award-winning mobile experiences using Flutter and React Native. From high-throughput school tracking apps to complex enterprise fintech portals, our mobile apps deliver flawless performance across both Android and iOS ecosystems.",
    iconName: "Smartphone",
    features: [
      "Cross-Platform Flutter & Native Swift/Kotlin Integration",
      "Offline-First SQLite & WatermelonDB Sync Engines",
      "Biometric FaceID & Fingerprint Authentication",
      "Push Notifications (FCM / APNs) & Background Geolocation",
      "Interactive Native Charts & Analytics Visuals",
      "Play Store & Apple App Store Complete Publishing",
    ],
    faqs: [
      {
        question: "Will one codebase run on both Android and iOS?",
        answer: "Yes, our Flutter and modern cross-platform architectures share over 95% of business logic while maintaining pixel-perfect native animations on both platforms.",
      },
    ],
    isPopular: false,
    order: 4,
  },
  {
    title: "Custom Device & Embedded Software",
    slug: "custom-software",
    category: "Custom Software",
    shortDescription: "Reliable Windows desktop applications, terminal software, and custom hardware controllers for specialized environments.",
    description: "When web browsers aren't enough, we build native desktop software and embedded controllers engineered for raw stability and direct hardware interfacing—such as RFID scanners, biometric sensors, thermal printers, and industrial controllers.",
    iconName: "Cpu",
    features: [
      "C++ / C# / Flutter Desktop Applications (Windows & Linux)",
      "Direct Serial, USB & Bluetooth Device Interfacing",
      "RFID / NFC Card Reader Driver Software",
      "Thermal Receipt & Barcode Printer Integrations",
      "Local Encrypted Data Storage & Cloud Synchronization",
      "Automated Silent Background Updates",
    ],
    faqs: [
      {
        question: "Can your desktop software interface with our existing hardware?",
        answer: "Yes, our engineers develop custom drivers and API bridges for virtually all serial, USB, and network-connected peripheral devices.",
      },
    ],
    isPopular: false,
    order: 5,
  },
  {
    title: "IoT & Industrial Automation",
    slug: "iot-automation",
    category: "IoT & Automation",
    shortDescription: "Industrial IoT telemetry dashboards, MQTT telemetry streaming, and automated PLC control pipelines.",
    description: "Bridge the gap between physical machines and digital intelligence. We develop low-latency IoT telematics, sensor monitoring dashboards, and real-time automated alerting systems designed for manufacturing plants and institutional fleets.",
    iconName: "Zap",
    features: [
      "MQTT & WebSockets Low-Latency Telemetry Hubs",
      "Real-Time Sensor Anomaly Detection Alerts",
      "Industrial Fleet Telematics & Geofence Triggers",
      "Edge Computing & Local Sensor Aggregation",
      "Custom Digital Twin Visualizations",
      "ISO 27001 Cloud Security Compliant Architectures",
    ],
    faqs: [
      {
        question: "What protocols do you support for IoT systems?",
        answer: "We support MQTT, WebSockets, HTTP/2, CoAP, Modbus, and custom TCP/UDP socket connections.",
      },
    ],
    isPopular: false,
    order: 6,
  },
  {
    title: "Cloud Services & Serverless Architecture",
    slug: "cloud-services",
    category: "Cloud & APIs",
    shortDescription: "Resilient Google Cloud and AWS cloud infrastructure, microservices orchestration, and auto-scaling API gateways.",
    description: "Architecting cloud backends that never sleep. We design serverless microservices, managed database clusters, automated CI/CD pipelines, and multi-region disaster recovery systems with zero single point of failure.",
    iconName: "Cloud",
    features: [
      "Google Cloud Platform (GCP) & Cloud Run Architecture",
      "Serverless Auto-Scaling API Gateways & Edge Caching",
      "Automated CI/CD Workflows (GitHub Actions)",
      "MongoDB Atlas, PostgreSQL & Redis Cluster Tuning",
      "Zero-Downtime Rolling Deployment Pipelines",
      "SOC-2 & GDPR Compliance Data Architecture",
    ],
    faqs: [
      {
        question: "Can you help migrate our on-premise servers to cloud?",
        answer: "Yes, we handle complete lift-and-shift or cloud-native containerized refactoring to Google Cloud with zero operational disruption.",
      },
    ],
    isPopular: false,
    order: 7,
  },
];

export const SEED_PROJECTS: SeedProject[] = [
  {
    id: "proj-01",
    title: "Modern School ERP Ecosystem",
    slug: "modern-school-ecosystem",
    client: "Vidhyam Educational Institutions",
    category: "Education Technology",
    description: "A flagship unified school ERP platform servicing over 15,000+ students and 450+ faculty. Incorporates real-time GPS school bus telemetry, RFID card attendance gates, fee installment gateways, and AI-powered report card generation.",
    imageUrl: "https://lh3.googleusercontent.com/d/1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl",
    screenshots: [
      {
        title: "Executive Cockpit & School Dashboard",
        category: "Executive Overview",
        caption: "Real-time administrative telemetry: daily attendance metrics, fee collection summaries, active bus tracking alerts, and quick actions.",
        url: "https://lh3.googleusercontent.com/d/1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl&sz=w1200",
      },
      {
        title: "Automated RFID & Face AI Attendance Console",
        category: "Attendance & Security",
        caption: "Sub-second contactless campus entry logging with instant parent WhatsApp notifications and leave quota tracking.",
        url: "https://lh3.googleusercontent.com/d/1Mq_K-wM8ecoGYfOXAn2U34LlW2DCSlXf",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1Mq_K-wM8ecoGYfOXAn2U34LlW2DCSlXf&sz=w1200",
      },
      {
        title: "Conflict-Free Timetable & Teacher Substitution Engine",
        category: "Academic Scheduling",
        caption: "Intelligent timetable matrix with drag-and-drop slot reordering and automated teacher substitution resolving.",
        url: "https://lh3.googleusercontent.com/d/1klhVZQF3Sl0OI7eE5fHK8-ytjiK5XeM2",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1klhVZQF3Sl0OI7eE5fHK8-ytjiK5XeM2&sz=w1200",
      },
      {
        title: "Autonomous Voice Campaign & Parent Call Center",
        category: "Communication & CRM",
        caption: "Integrated outbound calling engine for batch attendance alerts, fee recovery reminders, and automated DTMF feedback collection.",
        url: "https://lh3.googleusercontent.com/d/1zolpd19pwgMUkrbOyqvxRCRkO8NVkaGA",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1zolpd19pwgMUkrbOyqvxRCRkO8NVkaGA&sz=w1200",
      },
      {
        title: "Integrated AI Administrative Copilot",
        category: "Cognitive AI",
        caption: "Context-aware conversational assistant delivering instant student dossiers, marksheet analytics, and board policy answers.",
        url: "https://lh3.googleusercontent.com/d/11-stkPD2IHBY5rQwCQW9Z7wbLXhXRnLC",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=11-stkPD2IHBY5rQwCQW9Z7wbLXhXRnLC&sz=w1200",
      },
      {
        title: "In-Place Multi-Step Student Admission Suite",
        category: "Student Onboarding",
        caption: "Paperless admission workflow with instant certificate OCR, fee schedule assignment, and bus route mapping.",
        url: "https://lh3.googleusercontent.com/d/1zHW-V9GfAuSltlqUSVJvs696Y1-QGR4K",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1zHW-V9GfAuSltlqUSVJvs696Y1-QGR4K&sz=w1200",
      },
      {
        title: "Centralized Student Information & Dossier Directory",
        category: "Records & Dossiers",
        caption: "Comprehensive student records with multi-attribute filtering, emergency contact cards, and complete academic audit trails.",
        url: "https://lh3.googleusercontent.com/d/1UiW8Ecr9IKOUwaOeJQJU58iFqD0v1-W6",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1UiW8Ecr9IKOUwaOeJQJU58iFqD0v1-W6&sz=w1200",
      },
    ],
    tags: ["Flutter", "Next.js", "RFID / IoT", "GPS Fleet", "Node.js"],
    metrics: [
      { label: "Active Students", value: "15,000+" },
      { label: "Attendance Speed", value: "< 0.4s" },
      { label: "Parent Engagement", value: "98.4%" },
    ],
    websiteUrl: "https://modernisum.com/modern-school",
    isFeatured: true,
    order: 1,
  },
  {
    id: "proj-02",
    title: "Vidhyam Desktop Admin Management Suite",
    slug: "vidhyam-desktop-suite",
    client: "Modern School Network",
    category: "Custom Software",
    description: "High-performance offline-first desktop application developed for campus bursars, principals, and administrative heads. Manages complex examination grading schemas, fee ledger reconciliations, and staff biometrics.",
    imageUrl: "https://lh3.googleusercontent.com/d/1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl",
    screenshots: [
      {
        title: "Executive Cockpit & School Dashboard",
        category: "Executive Overview",
        caption: "Real-time administrative telemetry: daily attendance metrics, fee collection summaries, active bus tracking alerts, and quick actions.",
        url: "https://lh3.googleusercontent.com/d/1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1yhZbZalbypbFJ8WCqyaLNi3wX4g0VMMl&sz=w1200",
      },
      {
        title: "Automated RFID & Face AI Attendance Console",
        category: "Attendance & Security",
        caption: "Sub-second contactless campus entry logging with instant parent WhatsApp notifications and leave quota tracking.",
        url: "https://lh3.googleusercontent.com/d/1Mq_K-wM8ecoGYfOXAn2U34LlW2DCSlXf",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1Mq_K-wM8ecoGYfOXAn2U34LlW2DCSlXf&sz=w1200",
      },
      {
        title: "Conflict-Free Timetable & Teacher Substitution Engine",
        category: "Academic Scheduling",
        caption: "Intelligent timetable matrix with drag-and-drop slot reordering and automated teacher substitution resolving.",
        url: "https://lh3.googleusercontent.com/d/1klhVZQF3Sl0OI7eE5fHK8-ytjiK5XeM2",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1klhVZQF3Sl0OI7eE5fHK8-ytjiK5XeM2&sz=w1200",
      },
      {
        title: "Autonomous Voice Campaign & Parent Call Center",
        category: "Communication & CRM",
        caption: "Integrated outbound calling engine for batch attendance alerts, fee recovery reminders, and automated DTMF feedback collection.",
        url: "https://lh3.googleusercontent.com/d/1zolpd19pwgMUkrbOyqvxRCRkO8NVkaGA",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1zolpd19pwgMUkrbOyqvxRCRkO8NVkaGA&sz=w1200",
      },
      {
        title: "Integrated AI Administrative Copilot",
        category: "Cognitive AI",
        caption: "Context-aware conversational assistant delivering instant student dossiers, marksheet analytics, and board policy answers.",
        url: "https://lh3.googleusercontent.com/d/11-stkPD2IHBY5rQwCQW9Z7wbLXhXRnLC",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=11-stkPD2IHBY5rQwCQW9Z7wbLXhXRnLC&sz=w1200",
      },
      {
        title: "In-Place Multi-Step Student Admission Suite",
        category: "Student Onboarding",
        caption: "Paperless admission workflow with instant certificate OCR, fee schedule assignment, and bus route mapping.",
        url: "https://lh3.googleusercontent.com/d/1zHW-V9GfAuSltlqUSVJvs696Y1-QGR4K",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1zHW-V9GfAuSltlqUSVJvs696Y1-QGR4K&sz=w1200",
      },
      {
        title: "Centralized Student Information & Dossier Directory",
        category: "Records & Dossiers",
        caption: "Comprehensive student records with multi-attribute filtering, emergency contact cards, and complete academic audit trails.",
        url: "https://lh3.googleusercontent.com/d/1UiW8Ecr9IKOUwaOeJQJU58iFqD0v1-W6",
        thumbnailUrl: "https://drive.google.com/thumbnail?id=1UiW8Ecr9IKOUwaOeJQJU58iFqD0v1-W6&sz=w1200",
      },
    ],
    tags: ["Flutter Desktop", "SQLite", "Cloud Sync", "Thermal Printing"],
    metrics: [
      { label: "Transaction Speed", value: "10x Faster" },
      { label: "Offline Resilience", value: "100%" },
    ],
    isFeatured: true,
    order: 2,
  },
  {
    id: "proj-03",
    title: "AI Cognitive Document Intelligence SaaS",
    slug: "ai-document-intelligence",
    client: "Global Logistics Enterprise",
    category: "AI SaaS",
    description: "Multimodal generative AI document processing pipeline that automatically parses, extracts, and validates complex invoices, bills of lading, and customs manifests with 99.2% OCR precision.",
    imageUrl: "/logo.png",
    tags: ["Gemini Vision API", "Next.js", "FastAPI", "Vector Search"],
    metrics: [
      { label: "Processing Time", value: "2.1s / doc" },
      { label: "Accuracy Rate", value: "99.2%" },
    ],
    isFeatured: true,
    order: 3,
  },
  {
    id: "proj-04",
    title: "Real-Time GPS Fleet & Child Safety Hub",
    slug: "realtime-gps-child-safety",
    client: "Interstate Transport Corporation",
    category: "IoT & Mobility",
    description: "Custom IoT firmware and mobile dispatch cockpit tracking 120+ active school buses concurrently. Features automated speed monitoring, driver behavior scoring, and geo-fence arrival SMS notifications.",
    imageUrl: "/logo.png",
    tags: ["MQTT", "Flutter", "Google Maps API", "WebSockets"],
    metrics: [
      { label: "Fleet Monitored", value: "120+ Buses" },
      { label: "Telemetry Latency", value: "< 250ms" },
    ],
    isFeatured: false,
    order: 4,
  },
];

export const SEED_BLOG_POSTS: SeedBlogPost[] = [
  {
    id: "blog-01",
    title: "How Modern AI SaaS Architecture Transforms Traditional School Operations",
    slug: "ai-saas-school-erp-transformation",
    excerpt: "Discover how combining intelligent cognitive agents with RFID attendance and GPS telemetry eliminates 90% of school administrative overhead.",
    content: `
# Transforming Educational Institutions with AI-Integrated SaaS

Modern educational institutions are often bogged down by fragmented systems: manual paper attendance registers, disjointed fee spreadsheets, and anxious parents constantly calling reception desks regarding school bus delays.

At **Modernisum**, our mission with **Modern School ERP** was clear: design a unified, intelligent software ecosystem that connects school administrators, teachers, students, and parents under a single pane of glass.

### 1. The Power of Automated RFID I-Card Check-Ins

By deploying contactless RFID/NFC gates at school entrances, attendance is taken effortlessly as students arrive. The system pushes immediate SMS and mobile app notifications to parents:

> "Your child has safely arrived at campus at 08:04 AM."

### 2. Eliminating School Bus Anxiety with Sub-Second GPS

Our IoT telemetry engine streams bus location coordinates over WebSockets every few seconds. Parents can view the bus moving in real-time, receiving automated notifications when the bus is 1 kilometer away.

### 3. AI-Driven Personalized Student Insights

Rather than traditional static report cards, Modernisum's AI layer analyzes student quiz performances to identify conceptual weaknesses, automatically suggesting remedial practice problems tailored to each child's learning pace.
    `,
    category: "EdTech & AI",
    author: {
      name: "Shivank & Modernisum Engineering",
      role: "Chief Technology Architect",
      avatar: "/logo.png",
    },
    tags: ["Modern School", "AI SaaS", "IoT", "Education"],
    coverImage: "/images/blog/ai-saas-school-erp.jpg",
    readTime: "4 min read",
    publishedAt: "2026-03-15",
    seo: {
      metaTitle: "AI SaaS School ERP Architecture | Modernisum Tech Insights",
      metaDescription: "Explore how Modernisum leverages AI SaaS, RFID and GPS tracking to transform modern K-12 school operations.",
      keywords: ["School ERP", "AI SaaS", "GPS bus tracking", "Modernisum", "EdTech software"],
    },
  },
  {
    id: "blog-02",
    title: "Liquid Glass UI: Why Apple-Grade Frosted Glass is the Future of Enterprise Software",
    slug: "liquid-glass-design-enterprise-software",
    excerpt: "Enterprise applications don't have to look like grey spreadsheets. Here is how modern Glassmorphism enhances clarity, visual hierarchy, and focus.",
    content: `
# The Psychology of Liquid Glass Design in Modern SaaS

For decades, enterprise business software was synonymous with dull, static, grey user interfaces. When users are forced to spend 8 hours a day staring at dense data tables, visual fatigue sets in rapidly.

### The Apple Liquid Glass Philosophy
Drawing inspiration from macOS and iOS design languages, Modernisum created the **Liquid Chromatic Glass** system:
- **Depth & Dimension**: Translucent background blurs (\`backdrop-blur-xl\`) create natural visual layers.
- **Micro-Delight**: Specular cursor reflections track mouse movements, making the interface feel alive and tactile.
- **Information Hierarchy**: High-priority alert badges float on glowing chromatic rings, directing the user's focus effortlessly.

By combining aesthetics with ruthless performance (sub-10ms render latency), we prove that business software can be both an analytical powerhouse and a visual masterpiece.
    `,
    category: "Design & UX",
    author: {
      name: "Modernisum UI/UX Lab",
      role: "Lead Product Designer",
      avatar: "/logo.png",
    },
    tags: ["UI/UX", "Liquid Glass", "Next.js", "Design System"],
    coverImage: "/images/blog/liquid-glass-ui.jpg",
    readTime: "3 min read",
    publishedAt: "2026-03-10",
    seo: {
      metaTitle: "Liquid Glass Design for Enterprise SaaS | Modernisum Design",
      metaDescription: "Learn how Liquid Chromatic Glass design elevates enterprise user experience and reduces visual fatigue.",
      keywords: ["Liquid Glass UI", "Glassmorphism", "Enterprise UX", "Next.js design"],
    },
  },
];

export const SEED_TESTIMONIALS = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Director of Academics, Vidhyam Schools",
    content: "Modernisum's Modern School ERP transformed our entire campus operations. RFID attendance and GPS bus tracking solved parent safety concerns overnight. The software is lightning-fast and visually stunning.",
    avatar: "/logo.png",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    role: "VP of Product, CloudScale Inc.",
    content: "The custom AI SaaS platform developed by Modernisum reduced our customer support ticket volume by 65%. Their engineering discipline and clean architecture are truly top-tier.",
    avatar: "/logo.png",
    rating: 5,
  },
  {
    name: "Vikram Malhotra",
    role: "Founder & CEO, Apex Logistics",
    content: "Modernisum delivered our IoT device firmware and real-time dashboard 2 weeks ahead of schedule. Flawless execution and zero downtime since day one.",
    avatar: "/logo.png",
    rating: 5,
  },
];

export const SEED_FAQS = [
  {
    question: "What specific software services does Modernisum provide?",
    answer: "Modernisum specializes exclusively in software engineering: AI-Integrated SaaS platforms, Custom Web Applications (Next.js/React), Mobile Applications (iOS & Android via Flutter), Custom Windows & Embedded Device software, and the flagship Modern School ERP ecosystem.",
  },
  {
    question: "Do you sell or host GPU hardware or AI clusters?",
    answer: "No, Modernisum does not sell or provide GPU hardware or physical server clusters. We are strictly a software development and architecture company that designs, builds, and deploys cloud-native software and AI agent workflows.",
  },
  {
    question: "How does the Modern School ERP ecosystem work?",
    answer: "Modern School is a comprehensive suite comprising a high-speed desktop/cloud administration panel for school staff, native mobile apps for parents and teachers, real-time GPS fleet bus tracking, and RFID/NFC contactless student attendance.",
  },
  {
    question: "Where is Modernisum located and how can we get in touch?",
    answer: "Our primary development center is located at Jail Chungi, Kila Road, Near CCS University, Meerut, Uttar Pradesh, 250001. You can call us directly at +91 9368671007 or email contact@modernisum.com.",
  },
  {
    question: "Can you build a custom AI solution tailored to our business workflow?",
    answer: "Yes! We specialize in understanding unique business bottlenecks and creating custom AI agents, automated workflow pipelines, and secure API integrations to automate your manual processes.",
  },
];
