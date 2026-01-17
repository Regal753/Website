import { LucideIcon } from 'lucide-react';

export interface ServiceDetail {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  color: string;
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  TECH = 'tech',
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