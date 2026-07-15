import { describe, expect, it } from 'vitest';
import { serviceCatalog } from './services.catalog';
import { JASRAC_RELATION_LABEL, siteConfig } from './site.config';

describe('siteConfig cases', () => {
  it('uses the official JASRAC trustor term instead of conflating it with membership', () => {
    expect(JASRAC_RELATION_LABEL).toBe('JASRAC信託者');
    expect(JASRAC_RELATION_LABEL).not.toContain('会員');
  });

  it('keeps published trust copy aligned with verified evidence', () => {
    expect(siteConfig.companyProfile.business[0]).toBe('音楽出版事業部');
    expect(siteConfig.newsItems.some((item) => item.title.includes('音楽著作権管理者養成講座を修了'))).toBe(true);
    expect(siteConfig.newsItems.some((item) => item.title.includes('資格取得'))).toBe(false);
  });

  it('reference valid services', () => {
    const serviceSlugs = new Set(serviceCatalog.map((service) => service.slug));

    for (const item of siteConfig.cases) {
      expect(serviceSlugs.has(item.serviceSlug)).toBe(true);
    }
  });

  it('include proof details for each published case', () => {
    for (const item of siteConfig.cases) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.challenge.length).toBeGreaterThan(0);
      expect(item.results.length).toBeGreaterThan(0);
      expect(item.deliverables.length).toBeGreaterThan(0);
    }
  });

  it('does not present support examples as unverified quantified outcomes', () => {
    const serialized = JSON.stringify(siteConfig.cases);
    const forbiddenPatterns = [/約\d/, /\d+\s*%/, /\d+\s*時間/, /トラブル\s*0件/];

    for (const pattern of forbiddenPatterns) {
      expect(serialized).not.toMatch(pattern);
    }
  });
});
