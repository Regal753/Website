import { describe, expect, it } from 'vitest';
import { getServiceBySlug, serviceCatalog } from './services.catalog';

describe('service catalog', () => {
  it('has exactly three service areas', () => {
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

  it('uses concrete public-facing service names', () => {
    expect(serviceCatalog.map((service) => service.title)).toEqual([
      '音楽権利管理・BGM制作',
      'YouTube運用・制作進行',
      '業務改善・自動化支援',
    ]);
    expect(JSON.stringify(serviceCatalog)).not.toContain('AIマーケティング戦略事業部');
  });

  it('resolves legacy slugs including .html suffix', () => {
    expect(getServiceBySlug('music-publishing-bgm')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('music-publishing-bgm.html')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('/music-publishing-bgm/')?.slug).toBe('music-publishing');
    expect(getServiceBySlug('rights-management')?.slug).toBe('ai-marketing-strategy');
    expect(getServiceBySlug('rights-management.html')?.slug).toBe('ai-marketing-strategy');
    expect(getServiceBySlug('/rights-management/')?.slug).toBe('ai-marketing-strategy');
  });

  it('puts music publishing first without dropping the other divisions', () => {
    expect(serviceCatalog.map((service) => service.slug)).toEqual([
      'music-publishing',
      'sns-management',
      'ai-marketing-strategy',
    ]);
  });
});
