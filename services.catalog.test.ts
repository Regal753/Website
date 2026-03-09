import { describe, expect, it } from 'vitest';
import { getServiceBySlug, serviceCatalog } from './services.catalog';

describe('service catalog', () => {
  it('has exactly three divisions', () => {
    expect(serviceCatalog).toHaveLength(3);
  });

  it('uses unique slugs', () => {
    const slugs = serviceCatalog.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('does not contain banned wording', () => {
    const serialized = JSON.stringify(serviceCatalog);
    const forbiddenTerms = ['買い切り', '買切', 'バイアウト'];
    for (const term of forbiddenTerms) {
      expect(serialized).not.toContain(term);
    }
  });

  it('uses optimized media assets', () => {
    const isOptimizedAsset = (path: string) => path.endsWith('.svg') || path.endsWith('.webp');

    for (const service of serviceCatalog) {
      expect(isOptimizedAsset(service.media.listImage)).toBe(true);
      expect(service.media.listImage.includes('/placeholders/')).toBe(false);
      for (const image of service.media.galleryImages) {
        expect(isOptimizedAsset(image)).toBe(true);
        expect(image.includes('/placeholders/')).toBe(false);
      }
    }
  });

  it('resolves legacy slugs including .html suffix', () => {
    expect(getServiceBySlug('music-publishing-bgm')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('music-publishing-bgm.html')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('rights-management')?.slug).toBe('ai-marketing-strategy');
    expect(getServiceBySlug('rights-management.html')?.slug).toBe('ai-marketing-strategy');
  });
});
