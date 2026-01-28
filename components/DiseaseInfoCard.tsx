
import React from 'react';
import { ExternalLink, Clock, AlertTriangle, Bookmark, Share2 } from 'lucide-react';
import { DiseaseResult } from '../types';

interface DiseaseInfoCardProps {
  result: DiseaseResult;
}

const DiseaseInfoCard: React.FC<DiseaseInfoCardProps> = ({ result }) => {
  // Simple markdown renderer alternative (manual parsing for headers and lists for safety)
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i}>{line.replace(/^[*-] /, '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      
      // Basic bolding
      const parts = line.split(/(\*\*.*?\*\*)/);
      return (
        <p key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <Clock size={16} />
            <span className="text-xs opacity-90">ข้อมูลเมื่อ: {result.timestamp}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <Bookmark size={18} />
            </button>
            <button className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 flex gap-3">
            <AlertTriangle className="text-amber-500 shrink-0" size={20} />
            <p className="text-sm text-amber-800 font-medium">
              ข้อควรระวัง: ข้อมูลนี้เป็นเพียงข้อมูลเบื้องต้นที่รวบรวมโดย AI ไม่สามารถทดแทนการวินิจฉัยหรือคำแนะนำจากแพทย์ผู้เชี่ยวชาญได้
            </p>
          </div>

          <div className="markdown-content">
            {formatContent(result.content)}
          </div>
        </div>
      </div>

      {result.sources.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h4 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
            <ExternalLink size={18} className="text-blue-600" />
            แหล่งข้อมูลอ้างอิง
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.sources.map((source, idx) => (
              <a 
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-200 group-hover:text-blue-600 transition-colors">
                  {idx + 1}
                </div>
                <div className="flex-grow overflow-hidden">
                  <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-700">{source.title}</p>
                  <p className="text-xs text-slate-400 truncate">{new URL(source.uri).hostname}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseInfoCard;
