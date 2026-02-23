import { describe, expect, it } from 'vitest';
import { NEWS_VISIBLE_DAYS, parseNewsDate, shouldDisplayNews, sortValidNewsItems } from './news';

describe('news utils', () => {
  it('parses yyyy.mm.dd, yyyy/mm/dd, yyyy-mm-dd formats', () => {
    for (const value of ['2026.02.18', '2026/02/18', '2026-02-18']) {
      const parsed = parseNewsDate(value);
      expect(parsed).not.toBeNull();
      expect(parsed?.getFullYear()).toBe(2026);
      expect(parsed?.getMonth()).toBe(1);
      expect(parsed?.getDate()).toBe(18);
    }
  });

  it('rejects malformed and impossible dates', () => {
    expect(parseNewsDate('20260218')).toBeNull();
    expect(parseNewsDate('2026.02.31')).toBeNull();
    expect(parseNewsDate('2026/13/01')).toBeNull();
  });

  it('filters invalid items and sorts by date desc', () => {
    const items = sortValidNewsItems([
      { date: '2025.04.12', title: 'old' },
      { date: 'invalid', title: 'skip' },
      { date: '2026.02.18', title: 'latest' },
    ]);

    expect(items).toHaveLength(2);
    expect(items[0].title).toBe('latest');
    expect(items[1].title).toBe('old');
  });

  it('shows news when latest item is within visible days', () => {
    const items = sortValidNewsItems([{ date: '2026.02.18', title: 'latest' }]);
    const now = new Date('2026-02-22T09:00:00+09:00');

    expect(shouldDisplayNews(items, now)).toBe(true);
  });

  it('hides news when latest item is older than visible days', () => {
    const items = sortValidNewsItems([{ date: '2025.01.01', title: 'old' }]);
    const now = new Date('2026-02-22T09:00:00+09:00');

    expect(shouldDisplayNews(items, now, NEWS_VISIBLE_DAYS)).toBe(false);
  });
});
