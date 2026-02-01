import React from 'react';
import { companyProfile } from '../site.config';
import { SectionId } from '../types';

const rows = [
  { label: '屋号 / ブランド名', value: companyProfile.brandName },
  { label: '法人名', value: companyProfile.legalName },
  { label: '代表者', value: companyProfile.representative },
  { label: '所在地', value: companyProfile.address },
  { label: '設立日', value: companyProfile.established },
  { label: '事業内容', value: companyProfile.business.join('／') },
  { label: 'お問い合わせ', value: companyProfile.contactEmail },
];

const CompanyInfo: React.FC = () => {
  return (
    <section
      id={SectionId.COMPANY}
      className="py-20 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          会社情報
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-slate-100 last:border-b-0">
                  <th className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap w-1/3">
                    {row.label}
                  </th>
                  <td className="px-6 py-4 text-slate-900">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
