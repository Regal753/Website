import { describe, expect, it } from 'vitest';
import { getRouteMeta } from './App';

describe('getRouteMeta', () => {
  it('normalizes trailing slashes for canonical pages', () => {
    const companyMeta = getRouteMeta('/company/');
    expect(companyMeta.title).toBe('会社情報 | Regalo');
    expect(companyMeta.canonicalPath).toBe('/company/');

    const contactMeta = getRouteMeta('/contact/');
    expect(contactMeta.title).toBe('お問い合わせ | Regalo');
    expect(contactMeta.canonicalPath).toBe('/contact/');

    const columnMeta = getRouteMeta('/column/');
    expect(columnMeta.title).toBe('コラム | Regalo');
    expect(columnMeta.canonicalPath).toBe('/column/');
  });

  it('normalizes trailing slashes for service detail pages', () => {
    const serviceMeta = getRouteMeta('/services/sns-management/');
    expect(serviceMeta.title).toBe('YouTube/SNS運用支援 | Regalo');
    expect(serviceMeta.canonicalPath).toBe('/services/sns-management/');
  });

  it('keeps legacy top-level html aliases canonical', () => {
    expect(getRouteMeta('/company.html').canonicalPath).toBe('/company/');
    expect(getRouteMeta('/contact.html').canonicalPath).toBe('/contact/');
    expect(getRouteMeta('/column.html').canonicalPath).toBe('/column/');
  });
});
