import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { serviceCatalog } from '../services.catalog';

const Services: React.FC = () => {

  const getGradientStyle = (colorClass: string) => {
    const gradients: Record<string, string> = {
      "from-red-500 to-red-600": "linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))",
      "from-blue-500 to-blue-600": "linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))",
      "from-indigo-500 to-indigo-600": "linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))",
      "from-emerald-500 to-emerald-600": "linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))",
      "from-cyan-500 to-cyan-600": "linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))"
    };
    return gradients[colorClass] || gradients["from-red-500 to-red-600"];
  };

  return (
    <section id={SectionId.SERVICES} className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">提供サービス</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            メディア運営から技術基盤の構築まで、包括的なソリューションを提供します。
          </p>
        </div>
        <div className="space-y-0">
          {serviceCatalog.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 items-start py-10 border-b border-slate-200 last:border-b-0"
              >
                <div className="text-2xl md:text-3xl font-bold text-slate-300 whitespace-nowrap">
                  SERVICE.{String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                      style={{ background: getGradientStyle(service.color) }}
                    >
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                        <Link
                          to={`/services/${service.slug}`}
                          className="hover:text-blue-700 transition-colors"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-16 mt-4">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {service.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm md:text-base font-semibold text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-16 mt-5">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors"
                    >
                      詳細ページへ
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
