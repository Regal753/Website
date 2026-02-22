import { describe, expect, it } from 'vitest';
import { serviceCatalog } from './services.catalog';

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
    expect(serialized).not.toContain('????');
  });

  it('uses optimized media assets', () => {
    for (const service of serviceCatalog) {
      expect(service.media.listImage.endsWith('.webp')).toBe(true);
      expect(service.media.videoPoster.endsWith('.webp')).toBe(true);
      expect(service.media.videoSrc.endsWith('.mp4')).toBe(true);
      for (const image of service.media.galleryImages) {
        expect(image.endsWith('.webp')).toBe(true);
      }
    }
  });
});
