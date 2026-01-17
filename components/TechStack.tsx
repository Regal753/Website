import React from 'react';
import { SectionId } from '../types';
import { Cloud, Database, Bot, Terminal, Shield } from 'lucide-react';

const TechStack: React.FC = () => {
  return (
    <section id={SectionId.TECH} className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-center lg:gap-16">
          
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/20 rounded-full">
              Technical Infrastructure
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              クリエイティブを支える<br/>
              <span className="text-blue-500">堅牢な自動化基盤</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              動画制作の現場は常に時間に追われています。私たちは、Google Cloud Platform や n8n などのモダンな技術を駆使し、ルーチンワークを徹底的に自動化。クリエイターが「創ること」に集中できる環境をエンジニアリングで提供します。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-900 border border-slate-800">
                <Cloud className="text-blue-400" />
                <span className="text-slate-200 font-medium">Google Cloud Platform</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-900 border border-slate-800">
                <Bot className="text-purple-400" />
                <span className="text-slate-200 font-medium">Discord Bot Development</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-900 border border-slate-800">
                <Terminal className="text-green-400" />
                <span className="text-slate-200 font-medium">n8n Automation</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-900 border border-slate-800">
                <Database className="text-yellow-400" />
                <span className="text-slate-200 font-medium">Google Sheets API</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
              <img 
                src="https://picsum.photos/800/600?grayscale" 
                alt="Server Monitoring" 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center gap-2 mb-2 text-green-400 text-sm font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  System Operational
                </div>
                <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded p-4 font-mono text-xs text-slate-300">
                  <p>$ gcloud compute instances list</p>
                  <p className="text-yellow-400">NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ZONE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS</p>
                  <p>discord-bot &nbsp;asia-northeast1 &nbsp;<span className="text-green-400">RUNNING</span></p>
                  <p>n8n-worker &nbsp;&nbsp;asia-northeast1 &nbsp;<span className="text-green-400">RUNNING</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;