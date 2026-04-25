import { LucideIcon } from 'lucide-react';

export interface ServiceDetail {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  color: string;
}

export interface CaseStudy {
  serviceSlug: string;
  title: string;
  clientType: string;
  challenge: string;
  scope: string;
  outcome: string;
  results: string[];
  deliverables: string[];
}

export interface NewsItem {
  date: string;
  title: string;
  href?: string;
}

export interface ColumnItem {
  date: string;
  category: string;
  title: string;
  summary: string;
  points: string[];
  slug: string;
  readTime: string;
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  COLUMN = 'column',
  CASES = 'cases',
  PRICING = 'pricing',
  PROCESS = 'process',
  TECH = 'tech',
  COMPANY = 'company',
  CONTACT = 'contact',
}

export interface ContactFormState {
  name: string;
  email: string;
  type: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  matchPrefix?: boolean;
}

export interface CompanyProfile {
  brandName: string;
  legalName: string;
  representative: string;
  phone?: string;
  address: string;
  established: string;
  capital?: string;
  corporateNumber?: string;
  partnerBanks?: string[];
  business: string[];
  contactEmail: string;
}
