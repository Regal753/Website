import React from 'react';
import { Link } from 'react-router';

// 記事用の小さなMarkdown表示。使える書き方は content/articles/_template.md を参照。
// 段落・見出し(## / ###)・箇条書き(- / 1.)・引用(>)・区切り線(---)・太字(**)・リンク([文字](URL))だけを扱い、
// HTMLは文字としてそのまま表示する（埋め込まない）。

type Block =
  | { kind: 'heading'; level: 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'rule' };

export const parseBlocks = (markdown: string): Block[] => {
  const blocks: Block[] = [];
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      blocks.push({ kind: 'heading', level: heading[1].length as 2 | 3, text: heading[2].trim() });
      i += 1;
      continue;
    }
    if (/^-{3,}\s*$/.test(line)) {
      blocks.push({ kind: 'rule' });
      i += 1;
      continue;
    }
    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[2]);
      const items: string[] = [];
      while (i < lines.length) {
        const item = lines[i].match(/^\s*([-*]|\d+\.)\s+(.+)$/);
        if (!item || /\d+\./.test(item[1]) !== ordered) break;
        items.push(item[2].trim());
        i += 1;
      }
      blocks.push({ kind: 'list', ordered, items });
      continue;
    }
    if (line.startsWith('>')) {
      const quoted: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoted.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push({ kind: 'quote', text: quoted.join('\n').trim() });
      continue;
    }
    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3})\s+/.test(lines[i]) &&
      !/^\s*([-*]|\d+\.)\s+/.test(lines[i]) &&
      !lines[i].startsWith('>') &&
      !/^-{3,}\s*$/.test(lines[i])
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ kind: 'paragraph', text: paragraph.join('\n') });
  }
  return blocks;
};

const isSafeHref = (href: string): boolean => /^(https?:\/\/|\/|#|mailto:)/.test(href);

// 太字とリンクだけを解釈する。行内の改行はそのまま改行として表示する
export const renderInline = (text: string, keyPrefix = 'i'): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\n/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${index++}`;
    if (match[0] === '\n') {
      nodes.push(<br key={key} />);
    } else if (match[1] !== undefined) {
      nodes.push(<strong key={key} className="font-semibold text-brand-ink">{renderInline(match[1], key)}</strong>);
    } else if (isSafeHref(match[3])) {
      const href = match[3];
      const className = 'font-semibold text-brand-primary-700 underline decoration-brand-primary-300 underline-offset-4 hover:text-brand-primary-800';
      nodes.push(
        href.startsWith('/') ? (
          <Link key={key} to={href} className={className}>{match[2]}</Link>
        ) : (
          <a key={key} href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {match[2]}
          </a>
        ),
      );
    } else {
      nodes.push(match[0]);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

export const Markdown: React.FC<{ source: string }> = ({ source }) => (
  <>
    {parseBlocks(source).map((block, index) => {
      const key = `b-${index}`;
      switch (block.kind) {
        case 'heading':
          return block.level === 2 ? (
            <h2 key={key} className="mt-12 text-2xl font-semibold leading-snug text-brand-ink">{renderInline(block.text, key)}</h2>
          ) : (
            <h3 key={key} className="mt-8 text-xl font-semibold leading-snug text-brand-ink">{renderInline(block.text, key)}</h3>
          );
        case 'list': {
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <ListTag key={key} className={`mt-5 space-y-2 pl-6 text-base leading-8 text-slate-700 ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-brand-primary-700`}>
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
              ))}
            </ListTag>
          );
        }
        case 'quote':
          return (
            <blockquote key={key} className="mt-6 border-l-4 border-brand-primary-300 bg-paper-alt px-5 py-4 text-base leading-8 text-slate-700">
              {renderInline(block.text, key)}
            </blockquote>
          );
        case 'rule':
          return <hr key={key} className="my-10 border-slate-300" />;
        default:
          return (
            <p key={key} className="mt-5 text-base leading-8 text-slate-700">{renderInline(block.text, key)}</p>
          );
      }
    })}
  </>
);
