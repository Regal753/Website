import React from 'react';

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
};

// トップの各節で共通の見出し：英字の小見出し＋見出し＋任意の説明文（左揃え）
const SectionHeading: React.FC<SectionHeadingProps> = ({ id, eyebrow, title, lead }) => (
  <div className="mb-10 max-w-3xl md:mb-14">
    <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">{eyebrow}</p>
    <h2 id={id} className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
      {title}
    </h2>
    {lead ? <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">{lead}</p> : null}
  </div>
);

export default SectionHeading;
