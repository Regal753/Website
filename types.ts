import { LucideIcon } from 'lucide-react';

export interface ServiceDetail {
      title: string;
      description: string;
      items: string[];
      icon: LucideIcon;
      color: string;
}

export interface CaseStudy {
      clientType: string;
      scope: string;
      outcome: string;
}

export enum SectionId {
      HOME = 'home',
      SERVICES = 'services',
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
      id: SectionId;
      label: string;
}

export interface CompanyProfile {
      brandName: string;
      legalName: string;
      representative: string;
      address: string;
      established: string;
      business: string[];
      contactEmail: string;
}
