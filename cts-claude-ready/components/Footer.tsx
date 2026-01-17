import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">NEXT CREATION</h2>
          <p className="text-slate-500 text-sm">
            Empowering content creators with technology and sound.
          </p>
        </div>
        
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Company Profile</a>
        </div>

        <div className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Next Creation Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;