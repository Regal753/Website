import { NavItem, SectionId } from './types';

export const siteConfig = {
  companyName: 'Regalo',
  companyNameEn: 'Regalo Inc.',
  contactEmail: 'hello@regalo.jp',
  siteTitle: 'Regalo | クリエイティブ×テクノロジー',
  siteDescription:
    'YouTube運営、BGM制作・権利管理、業務自動化ソリューションを提供するコーポレートサイト。',
  navItems: [
    { id: SectionId.HOME, label: 'ホーム' },
    { id: SectionId.SERVICES, label: 'サービス' },
    { id: SectionId.TECH, label: '技術' },
    { id: SectionId.CONTACT, label: 'お問い合わせ' },
  ] as NavItem[],
};
