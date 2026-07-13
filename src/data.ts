/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, PortfolioItem, Testimonial, ProcessStep, PricingTier } from "./types";

export const SERVICES_DATA: Service[] = [
  {
    id: "longform",
    title: "Cinematic YouTube Editing",
    description: "High-retention editing engineered to capture attention in the first 5 seconds and maintain it through psychological pacing, storytelling arcs, and dynamic B-rolls.",
    iconName: "Video",
    features: [
      "Custom storytelling narrative structuring",
      "Cinematic sound design & atmospheric SFX",
      "Dynamic typography & 2D motion graphics",
      "Color grading & visual enhancements",
      "Pacing adjustments based on retention analytics"
    ],
    badge: "Most Popular",
    metric: "45% retention increase"
  },
  {
    id: "shortform",
    title: "Vertical Growth Loops (Shorts/Reels)",
    description: "Highly energetic, fast-paced vertical video editing designed to capture scrolling viewers, trigger algorithms, and drive millions of impressions across Shorts, Reels, and TikTok.",
    iconName: "Smartphone",
    features: [
      "Auto-captions with custom trendy animations",
      "High-frequency sound effects and pops",
      "Pattern-interrupts every 1.5 seconds",
      "Hook engineering & loop-structure design",
      "B-roll overlays and zoom-in transitions"
    ],
    badge: "Viral Scale",
    metric: "10M+ collective impressions"
  },
  {
    id: "thumbnails",
    title: "High-CTR Psychology Thumbnails",
    description: "Click-driven thumbnail designs utilizing color theory, custom assets, depth layer composites, and negative space to stand out on the YouTube home page.",
    iconName: "Image",
    features: [
      "Deep behavioral psychology-based layouts",
      "High-contrast color grading & facial retouching",
      "3D depth styling & glow elements",
      "A/B testing support with multiple variations",
      "Niche-tailored layout engineering"
    ],
    metric: "Average 8.4% CTR"
  },
  {
    id: "strategy",
    title: "YouTube Consulting & Systems",
    description: "Complete channel audit, title-to-thumbnail concept matching, video ideation, and production system streamlining to scale your content operation sustainably.",
    iconName: "TrendingUp",
    features: [
      "Comprehensive retention & analytics audits",
      "Title ideation and concept synergy maps",
      "Script structuring and hook refinement",
      "Workflow setup for raw footage delivery",
      "Competitor and trend analysis dashboards"
    ],
    badge: "Enterprise",
    metric: "2x Channel Growth Speed"
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "pf-1",
    title: "The Silent War of Tech Giants",
    creator: "TechChronicles (1.2M Subs)",
    category: "longform",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Standard mock but with beautiful frame
    duration: "14:22",
    metrics: {
      viewsBefore: "120K",
      viewsAfter: "840K",
      retentionImprovement: "+28%",
      ctr: "9.2%"
    }
  },
  {
    id: "pf-2",
    title: "How I Survived 100 Hours in Desolation",
    creator: "ApexQuest (4.5M Subs)",
    category: "longform",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5edd0cd9?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "21:05",
    metrics: {
      viewsBefore: "450K",
      viewsAfter: "2.8M",
      retentionImprovement: "+34%",
      ctr: "11.1%"
    }
  },
  {
    id: "pf-3",
    title: "The AI Revolution Nobody is Talking About",
    creator: "MindMelt (850K Subs)",
    category: "longform",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "11:45",
    metrics: {
      viewsBefore: "90K",
      viewsAfter: "610K",
      retentionImprovement: "+19%",
      ctr: "8.5%"
    }
  },
  {
    id: "pf-4",
    title: "Why AI Will Replace Your Job by 2027",
    creator: "FutureFin (2.1M Subs)",
    category: "shortform",
    thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "0:58",
    metrics: {
      viewsBefore: "15K",
      viewsAfter: "1.4M",
      retentionImprovement: "+52%",
      ctr: "14.2%"
    }
  },
  {
    id: "pf-5",
    title: "The Ultimate Cold Shower Experiment",
    creator: "BioHackers (320K Subs)",
    category: "shortform",
    thumbnailUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "0:45",
    metrics: {
      viewsBefore: "8K",
      viewsAfter: "950K",
      retentionImprovement: "+41%",
      ctr: "12.8%"
    }
  },
  {
    id: "pf-6",
    title: "3 Books That Will Rearrange Your Brain",
    creator: "NootropicMind (540K Subs)",
    category: "shortform",
    thumbnailUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "0:52",
    metrics: {
      viewsBefore: "22K",
      viewsAfter: "1.1M",
      retentionImprovement: "+48%",
      ctr: "15.0%"
    }
  },
  {
    id: "pf-7",
    title: "Designing the Perfect City from Scratch",
    creator: "UrbanIdea (1.7M Subs)",
    category: "thumbnail",
    thumbnailUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
    beforeThumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400", // Standard boring cityscape
    afterThumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=400", // Glistening colorful neon city
    metrics: {
      viewsBefore: "4.2% CTR",
      viewsAfter: "9.8% CTR",
      retentionImprovement: "+133% Clicks"
    }
  },
  {
    id: "pf-8",
    title: "I Bought a Mountain and Did This",
    creator: "WildCabin (3.2M Subs)",
    category: "thumbnail",
    thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    beforeThumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400", // Boring gray mountain
    afterThumbnail: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=400", // Vibrant high contrast snow peak with yellow text overlay
    metrics: {
      viewsBefore: "3.8% CTR",
      viewsAfter: "10.4% CTR",
      retentionImprovement: "+173% Clicks"
    }
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t-1",
    name: "Alex Sterling",
    channel: "TechChronicles",
    subscriberCount: "1.2M",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    quote: "Working with BRONTICX Media was a turning point for my channel. Our average retention jumped by nearly 30% in just two weeks. They don't just cut clips—they craft a psychological experience that hooks viewers and refuses to let go. Our view velocity has never been this high.",
    viewsGenerated: "12M+ Views"
  },
  {
    id: "t-2",
    name: "Nicolette Finch",
    channel: "ApexQuest",
    subscriberCount: "4.5M",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    quote: "I put my life on the line for raw footage, so I can't afford lazy editors ruining the final cut. BRONTICX understands the intensity, the pauses, the sound-design elements that keep millions watching the screen. Absolute professionals, rapid turnaround times.",
    viewsGenerated: "45M+ Views"
  },
  {
    id: "t-3",
    name: "Marcus Vance",
    channel: "FutureFin",
    subscriberCount: "2.1M",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    quote: "Shorts require instant hooks and extreme speed. BRONTICX's style is flawless. They know how to loop videos to double views and their subtitle animations are high-retention gold. They scaled our Shorts from average views to regular viral hits.",
    viewsGenerated: "18M+ Views"
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: 1,
    title: "Concept & Hook Audit",
    description: "We deep-dive into your raw footage, title, and topic. We isolate the most exciting moments to craft an undeniable intro hook that keeps viewers from clicking away.",
    deliverables: ["Pacing brief", "Intro hook concepts", "B-roll roadmap"],
    duration: "Day 1"
  },
  {
    step: 2,
    title: "The Narrative Draft",
    description: "Our editors assemble the primary storyline, removing dead air, awkward pauses, and pacing bottlenecks. We establish a rhythmic momentum suited to your niche.",
    deliverables: ["First rough cut", "Audio sync review", "Sub-timeline markers"],
    duration: "Day 2-3"
  },
  {
    step: 3,
    title: "Motion Overlays & Grading",
    description: "We add custom visual assets, dynamic zoom-ins, 2D vector popups, stock elements, color grading, and pattern interrupts to visually refresh the screen every few seconds.",
    deliverables: ["Graded draft", "Typography treatments", "Motion templates"],
    duration: "Day 4"
  },
  {
    step: 4,
    title: "Foley & Sound Landscapes",
    description: "We layer rich soundscapes, custom rising elements, whooshes, background beats, and contextual volume dipping. Sound represents 50% of retention value.",
    deliverables: ["Full audio mastering", "SFX layers", "Audio dip check"],
    duration: "Day 5"
  },
  {
    step: 5,
    title: "Analytical Polish",
    description: "Our head of growth reviews the completed cut against retention logs of similar viral videos. We tweak, tighten, export in 4K, and hand off your high-CTR thumbnails.",
    deliverables: ["Final 4K Master", "2-3 Thumbnail options", "Metadata suggestions"],
    duration: "Day 6"
  }
];

export const PRICING_DATA: PricingTier[] = [
  {
    id: "price-shorts",
    name: "Vertical Growth Loop",
    price: "$1,499",
    period: "month",
    description: "Perfect for creators and brands looking to dominate short-form algorithms across TikTok, Shorts, and Reels with hyper-engaging 9:16 edits.",
    features: [
      "12 High-Retention Shorts / Reels per month",
      "Dynamic typography & custom sound effects",
      "Pattern-interrupts and pacing refinement",
      "2 Revision rounds per video",
      "Dedicated editor & project Slack channel",
      "Average 48-hour delivery timeline"
    ],
    popular: false,
    ctaText: "Secure Shorts Tier"
  },
  {
    id: "price-core",
    name: "The Channel Core",
    price: "$2,999",
    period: "month",
    description: "Our signature flagship bundle. Designed for serious YouTubers wanting professional cinematic long-form video editing and high-CTR thumbnails.",
    features: [
      "4 Cinematic Long-Form Videos (Up to 15 mins)",
      "4 Psychology-Backed Thumbnails (with A/B versions)",
      "Storyline restructuring & audio sound design",
      "Title & concept synergy strategy consultation",
      "Unlimited revision rounds within reason",
      "Shared Trello / Frame.io workspace dashboard",
      "Analytical retention monitoring & adjustments"
    ],
    popular: true,
    ctaText: "Scale My Channel",
    badge: "Recommended"
  },
  {
    id: "price-scale",
    name: "Omnipresent Engine",
    price: "$4,999",
    period: "month",
    description: "The ultimate content operation. We become your fully outsourced post-production team, handling long-form, shorts, and weekly optimization strategy.",
    features: [
      "8 Long-Form Videos per month",
      "16 Verticals repurposed from long-form content",
      "8 Custom thumbnails + dynamic CTR variations",
      "Bi-weekly analytical audits & competitor insights",
      "Custom channel branding & intro templates",
      "Direct Slack/Telegram channel with our head of growth",
      "Priority editing queue & emergency speed overrides"
    ],
    popular: false,
    ctaText: "Outsource Post-Production"
  }
];

export const AVAILABLE_TIMESLOTS: string[] = [
  "09:00 AM EST",
  "10:30 AM EST",
  "01:00 PM EST",
  "02:30 PM EST",
  "04:00 PM EST",
  "05:30 PM EST"
];
