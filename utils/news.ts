import { NewsItem } from '../types';

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

export const shouldDisplayNews = (items: ParsedNewsItem[]): boolean => items.length > 0;
