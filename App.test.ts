import { describe, expect, it } from 'vitest';
import { getRouteMeta } from './App';

describe('route metadata', () => {
  it.each([
    ['/company/', '会社情報 | Regalo', '/company'],
    ['/contact/', 'お問い合わせ | Regalo', '/contact'],
    ['/privacy/', 'プライバシーポリシー | Regalo', '/privacy'],
    ['/terms/', '利用規約 | Regalo', '/terms'],
  ])('normalizes the trailing slash for %s', (path, title, canonicalPath) => {
    expect(getRouteMeta(path)).toMatchObject({ title, canonicalPath });
  });

  it('keeps canonical service paths with a trailing slash', () => {
    expect(getRouteMeta('/services/music-publishing/')).toMatchObject({
      title: '音楽出版・権利情報管理 | Regalo',
      canonicalPath: '/services/music-publishing/',
    });
  });
});
