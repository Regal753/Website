import { NewsItem } from '../types';

export const NEWS_VISIBLE_DAYS = 90;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface ParsedNewsItem extends NewsItem {
  timestamp: number;
}

export const parseNewsDate = (value: string): Date | null => {
  const match = value.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const sortValidNewsItems = (items: NewsItem[]): ParsedNewsItem[] =>
  items
    .map((item) => ({
      ...item,
      timestamp: parseNewsDate(item.date)?.getTime() ?? Number.NaN,
    }))
    .filter((item) => Number.isFinite(item.timestamp))
    .sort((a, b) => b.timestamp - a.timestamp);

export const shouldDisplayNews = (
  items: ParsedNewsItem[],
  now: Date = new Date(),
  visibleDays = NEWS_VISIBLE_DAYS
): boolean => {
  if (items.length === 0) return false;

  const latestDate = items[0].timestamp;
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const staleDays = Math.floor((today.getTime() - latestDate) / MS_PER_DAY);

  return staleDays <= visibleDays;
};
