import { describe, expect, it } from 'vitest';
import { serviceCatalog } from './services.catalog';
import { siteConfig } from './site.config';

describe('siteConfig cases', () => {
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
});
