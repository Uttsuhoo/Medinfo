
import React from 'react';
import { HeartPulse, Stethoscope } from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onNavigate: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate(View.HOME)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Stethoscope size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              MedInfo <span className="text-blue-600">AI</span>
            </h1>
          </button>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate(View.HOME)}
              className={`font-medium transition-colors ${activeView === View.HOME ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              หน้าแรก
            </button>
            <button 
              onClick={() => {
                onNavigate(View.HOME);
                setTimeout(() => {
                  const el = document.getElementById('first-aid-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              การปฐมพยาบาล
            </button>
            <button 
              onClick={() => onNavigate(View.ABOUT)}
              className={`font-medium transition-colors ${activeView === View.ABOUT ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              เกี่ยวกับเรา
            </button>
          </nav>

          <div className="flex items-center gap-4">
             <a 
               href="tel:1669"
               className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-100 transition-colors hidden sm:block border border-red-100"
             >
               Emergency: 1669
             </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <HeartPulse size={20} className="text-blue-500" />
              <span className="text-lg font-bold">MedInfo AI</span>
            </div>
            <p className="text-sm leading-relaxed">
              ผู้ช่วยอัจฉริยะที่ช่วยรวบรวมข้อมูลโรคและวิธีการรักษาเพื่อให้คุณเข้าถึงข้อมูลสุขภาพที่ถูกต้องและรวดเร็ว
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">ลิงก์ที่เป็นประโยชน์</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.niems.go.th" target="_blank" className="hover:text-blue-400">สถาบันการแพทย์ฉุกเฉินแห่งชาติ</a></li>
              <li><a href="https://ddc.moph.go.th" target="_blank" className="hover:text-blue-400">กรมควบคุมโรค</a></li>
              <li><a href="https://www.si.mahidol.ac.th" target="_blank" className="hover:text-blue-400">โรงพยาบาลศิริราช</a></li>
              <li><a href="https://www.chulahospital.org" target="_blank" className="hover:text-blue-400">โรงพยาบาลจุฬาลงกรณ์</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">ข้อควรระวัง</h4>
            <p className="text-xs italic leading-relaxed">
              *ข้อมูลทั้งหมดจัดทำโดยระบบ AI เพื่อวัตถุประสงค์ในการให้ความรู้เท่านั้น ห้ามใช้เพื่อการวินิจฉัยโรคด้วยตนเองหรือทดแทนการตรวจรักษาจากแพทย์ หากมีอาการผิดปกติรุนแรง โปรดพบแพทย์ทันทีหรือโทร 1669
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} MedInfo AI. All rights reserved. Powered by Gemini.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
