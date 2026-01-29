import { NavItem, SectionId } from './types';

const CONTACT_EMAIL = 'retoa@regalocom.net';

export const siteConfig = {
  companyName: 'Regalo',
  companyNameEn: 'Regalo Inc.',
  contactEmail: CONTACT_EMAIL,
  siteTitle: 'Regalo | YouTube運用・BGM・自動化',
  siteDescription:
    'RegaloはYouTube運用、BGM制作・権利管理、ワークフロー自動化を支援する企業です。',
  navItems: [
    { id: SectionId.HOME, label: 'ホーム' },
    { id: SectionId.SERVICES, label: 'サービス' },
    { id: SectionId.TECH, label: '技術' },
    { id: SectionId.CONTACT, label: 'お問い合わせ' },
  ] as NavItem[],
};
