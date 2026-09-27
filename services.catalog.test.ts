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
    for (const service of serviceCatalog) {
      expect(service.media.listImage.endsWith('.webp')).toBe(true);
      for (const image of service.media.galleryImages) {
        expect(image.endsWith('.webp')).toBe(true);
      }
    }
  });

  it('publishes decision-ready scope information for every service', () => {
    for (const service of serviceCatalog) {
      expect(service.audience.length).toBeGreaterThanOrEqual(3);
      expect(service.intakeItems.length).toBeGreaterThanOrEqual(3);
      expect(service.boundaries.length).toBeGreaterThanOrEqual(2);
      expect(service.faqs.length).toBeGreaterThanOrEqual(3);
      expect(service.detailSummary.length).toBeGreaterThan(20);
    }
  });

  it('uses a service-specific decision summary instead of one shared template', () => {
    const summaries = serviceCatalog.map((service) => service.detailSummary);
    expect(new Set(summaries).size).toBe(serviceCatalog.length);
    expect(summaries.join('\n')).not.toContain(
      '現在の運用状況を確認し、対応内容、納品物、進行手順を明確にします。',
    );
  });

  it('uses customer-facing service names outside the internal company profile', () => {
    expect(serviceCatalog.map((service) => service.title)).toEqual([
      '音楽出版・BGM制作',
      'YouTube・SNS運用',
      '制作進行・業務自動化',
    ]);
  });

  it('states the music-rights decision boundary without claiming authority', () => {
    const music = serviceCatalog.find((service) => service.slug === 'music-publishing');
    expect(music?.boundaries).toContain(
      '利用許諾の可否や使用料は、権利者、管理団体等の判断に従います。',
    );
    expect(music?.boundaries).toContain(
      '個別案件の法的判断や権利侵害がないことの保証は行いません。',
    );
  });

  it('resolves legacy slugs including .html suffix', () => {
    expect(getServiceBySlug('music-publishing-bgm')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('music-publishing-bgm.html')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('/music-publishing-bgm/')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('rights-management')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('rights-management.html')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('/rights-management/')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('ai-marketing-strategy')?.slug).toBe('workflow-automation');
    expect(getServiceBySlug('workflow-automation')?.slug).toBe('workflow-automation');
  });

  it('puts music publishing first without dropping the other divisions', () => {
    expect(serviceCatalog.map((service) => service.slug)).toEqual([
      'music-publishing',
      'sns-management',
      'workflow-automation',
    ]);
  });
});
