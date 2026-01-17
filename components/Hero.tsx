import React from 'react';
import { SectionId } from '../types';
import { ArrowRight, Youtube, Music, Cpu } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-blue-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting New Clients
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-slate-100">コンテンツを</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              加速させる。
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            YouTube運営、BGM制作・権利管理、そして業務自動化。
            クリエイティブとテクノロジーを融合させ、次世代のメディア運営をサポートします。
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection(SectionId.CONTACT)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-900/70"
            >
              お問い合わせ
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => scrollToSection(SectionId.SERVICES)}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold rounded-lg transition-all"
            >
              事業内容を見る
            </button>
          </div>
        </div>

        {/* Visual Element */}
        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl bg-slate-800/50 border border-slate-700 p-8 backdrop-blur-sm shadow-2xl">
            {/* Mock Floating Cards */}
            <div className="absolute -top-12 -right-12 p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="p-2 bg-red-500/20 rounded-lg text-red-500"><Youtube size={24} /></div>
              <div>
                <div className="text-xs text-slate-400">Total Views</div>
                <div className="font-bold text-white">10M+ / Month</div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><Cpu size={24} /></div>
              <div>
                <div className="text-xs text-slate-400">Automation</div>
                <div className="font-bold text-white">24/7 Active</div>
              </div>
            </div>

            <img 
              src="https://picsum.photos/600/400?grayscale&blur=2" 
              alt="Studio and Workflow" 
              className="rounded-lg opacity-80"
            />
            
            <div className="mt-6 flex justify-between items-end border-t border-slate-700 pt-6">
               <div>
                  <div className="text-sm text-slate-400 mb-2">Expertise</div>
                  <div className="flex gap-2">
                     <span className="p-2 bg-slate-700 rounded text-slate-300"><Music size={20}/></span>
                     <span className="p-2 bg-slate-700 rounded text-slate-300"><Youtube size={20}/></span>
                     <span className="p-2 bg-slate-700 rounded text-slate-300"><Cpu size={20}/></span>
                  </div>
               </div>
               <div className="text-right">
                 <div className="text-4xl font-bold text-white">5+</div>
                 <div className="text-xs text-slate-400">Years Experience</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;