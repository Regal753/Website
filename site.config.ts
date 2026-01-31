import { NavItem, SectionId, CompanyProfile } from './types';

const CONTACT_EMAIL = 'retoa@regalocom.net';

export const companyProfile: CompanyProfile = {
    brandName: 'Regalo',
    legalName: '株式会社Regalo',
    representative: '塩田玲央',
    address: '京都府長岡京市',
    established: '2024年6月10日',
    business: [
          'SNS運用支援',
          '知的財産管理',
          '業務効率化・DXサポート',
        ],
    contactEmail: CONTACT_EMAIL,
};

export const siteConfig = {
    companyName: 'Regalo',
    companyNameEn: 'Regalo Inc.',
    contactEmail: CONTACT_EMAIL,
        contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdbqMVhTDUHcfhnrv5Vj96aBF9WhyAwysTfmG9CdgElhrGm1A/viewform',
    siteTitle: 'Regalo | YouTube運用・BGM・自動化',
    siteDescription:
          'RegaloはYouTube運用、BGM制作・権利管理、ワークフロー自動化を支援する企業です。',
    companyProfile,
    navItems: [
      { id: SectionId.HOME, label: 'ホーム' },
      { id: SectionId.SERVICES, label: 'サービス' },
      { id: SectionId.TECH, label: '技術' },
      { id: SectionId.COMPANY, label: '会社情報' },
      { id: SectionId.CONTACT, label: 'お問い合わせ' },
        ] as NavItem[],
};
