/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  badge?: string;
  metric?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  creator: string;
  category: "longform" | "shortform" | "thumbnail";
  thumbnailUrl: string;
  videoUrl?: string; // YouTube embed or mock link
  duration?: string;
  metrics?: {
    viewsBefore?: string;
    viewsAfter: string;
    retentionImprovement?: string;
    ctr?: string;
  };
  beforeThumbnail?: string; // For comparing editing/design quality
  afterThumbnail?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  channel: string;
  subscriberCount: string;
  avatarUrl: string;
  quote: string;
  viewsGenerated: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
  badge?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
