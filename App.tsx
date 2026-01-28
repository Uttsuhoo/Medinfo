
import React, { useState, useCallback } from 'react';
import { Search, Activity, Thermometer, ShieldAlert, Heart, Loader2, Sparkles, AlertCircle, LifeBuoy, Flame, Zap, Droplets, UserMinus, Info, CheckCircle2 } from 'lucide-react';
import Layout from './components/Layout';
import DiseaseInfoCard from './components/DiseaseInfoCard';
import { searchMedicalInfo } from './services/geminiService';
import { DiseaseResult, AppState, QuickLink, View } from './types';

const DISEASE_LINKS: QuickLink[] = [
  { id: 'd1', title: 'ไข้เลือดออก', description: 'อาการและการเฝ้าระวังภัยจากยุงลาย', icon: 'Thermometer' },
  { id: 'd2', title: 'โควิด-19', description: 'แนวทางการรักษาและสายพันธุ์ล่าสุด', icon: 'ShieldAlert' },
  { id: 'd3', title: 'ออฟฟิศซินโดรม', description: 'วิธีบรรเทาปวดหลังและคอจากการทำงาน', icon: 'Activity' },
  { id: 'd4', title: 'โรคเบาหวาน', description: 'การควบคุมน้ำตาลและโภชนาการ', icon: 'Activity' },
];

const FIRST_AID_LINKS: QuickLink[] = [
  { id: 'f1', title: 'การทำ CPR', description: 'ขั้นตอนการกู้ชีพเบื้องต้นที่ถูกต้อง', icon: 'Heart' },
  { id: 'f2', title: 'สำลักอาหาร (Heimlich)', description: 'วิธีช่วยเหลือเมื่อสิ่งของติดคอ', icon: 'UserMinus' },
  { id: 'f3', title: 'แผลไฟไหม้ น้ำร้อนลวก', description: 'การปฐมพยาบาลลดความรุนแรง', icon: 'Flame' },
  { id: 'f4', title: 'เลือดไหลไม่หยุด', description: 'การห้ามเลือดและทำแผลเบื้องต้น', icon: 'Droplets' },
  { id: 'f5', title: 'ไฟดูด ไฟฟ้าช็อต', description: 'การช่วยเหลือผู้ถูกไฟฟ้าดูดอย่างปลอดภัย', icon: 'Zap' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [query, setQuery] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setAppState(AppState.LOADING);
    setError(null);
    setCurrentView(View.HOME);
    
    try {
      const data = await searchMedicalInfo(searchQuery);
      setResult(data);
      setAppState(AppState.SUCCESS);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการค้นหา');
      setAppState(AppState.ERROR);
    }
  }, []);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="text-blue-500" size={24} />;
      case 'Thermometer': return <Thermometer className="text-red-500" size={24} />;
      case 'ShieldAlert': return <ShieldAlert className="text-amber-500" size={24} />;
      case 'Heart': return <Heart className="text-pink-500" size={24} />;
      case 'UserMinus': return <UserMinus className="text-orange-500" size={24} />;
      case 'Flame': return <Flame className="text-orange-600" size={24} />;
      case 'Droplets': return <Droplets className="text-red-600" size={24} />;
      case 'Zap': return <Zap className="text-yellow-500" size={24} />;
      default: return <Activity size={24} />;
    }
  };

  const AboutView = () => (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4">
            <Info size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">เกี่ยวกับ MedInfo AI</h2>
          <p className="text-blue-100">นวัตกรรม AI เพื่อยกระดับความรู้ด้านสุขภาพของคนไทย</p>
        </div>
        
        <div className="p-8 md:p-12 space-y-10">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-2">พันธกิจของเรา</h3>
            <p className="text-slate-600 leading-relaxed">
              MedInfo AI ถูกพัฒนาขึ้นเพื่อแก้ปัญหาการเข้าถึงข้อมูลทางการแพทย์ที่ซับซ้อนและกระจัดกระจาย 
              เราใช้เทคโนโลยีปัญญาประดิษฐ์ระดับโลกอย่าง Gemini เพื่อรวบรวม วิเคราะห์ และสรุปข้อมูล
              ให้เข้าใจง่ายและพร้อมใช้งานในสถานการณ์จริง โดยเฉพาะในเวลาฉุกเฉินที่ทุกวินาทีมีค่า
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-blue-600" />
                จุดเด่นของระบบ
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• ค้นหาข้อมูลโรคที่ครอบคลุมและแม่นยำ</li>
                <li>• ขั้นตอนปฐมพยาบาลแบบ Step-by-Step</li>
                <li>• ข้อมูลอ้างอิงจากแหล่งที่เชื่อถือได้ทั่วโลก</li>
                <li>• ระบบตอบโต้ด้วยภาษาไทยที่เป็นธรรมชาติ</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-600" />
                ข้อจำกัดที่ควรทราบ
              </h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                ระบบนี้เป็นเพียงผู้ช่วยให้ข้อมูลเบื้องต้นเท่านั้น <strong>ไม่ใช่เครื่องมือวินิจฉัยโรค</strong> 
                ข้อมูลที่ได้รับควรใช้ประกอบการตัดสินใจเบื้องต้น และควรปรึกษาแพทย์ผู้เชี่ยวชาญทุกครั้งเพื่อความถูกต้อง
              </p>
            </div>
          </section>

          <section className="text-center py-8 border-t border-slate-100">
             <p className="text-slate-400 text-sm mb-4">ขับเคลื่อนด้วยเทคโนโลยีระดับสูง</p>
             <div className="flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
                <span className="font-bold text-slate-600">Google Gemini</span>
                <span className="font-bold text-slate-600">React.js</span>
                <span className="font-bold text-slate-600">Tailwind CSS</span>
             </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <Layout activeView={currentView} onNavigate={setCurrentView}>
      {currentView === View.HOME ? (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm animate-pulse">
                <Sparkles size={16} />
                <span>AI Medical & First Aid Assistant</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                ค้นหาข้อมูลโรค และ <span className="text-blue-200">คู่มือปฐมพยาบาล</span>
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                เข้าถึงคำแนะนำทางการแพทย์และการช่วยเหลือฉุกเฉินเบื้องต้นที่ถูกต้อง รวดเร็ว และเชื่อถือได้
              </p>

              <form onSubmit={onFormSubmit} className="relative max-w-2xl mx-auto mt-10">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ค้นหาชื่อโรค หรือ วิธีปฐมพยาบาล เช่น สำลัก, เลือดกำเดาไหล..."
                  className="w-full h-16 pl-14 pr-32 rounded-2xl bg-white text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-400/30 shadow-2xl transition-all text-lg"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <button
                  type="submit"
                  disabled={appState === AppState.LOADING}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {appState === AppState.LOADING ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    'ค้นหา'
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 -mt-8 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Main Content Area */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                {appState === AppState.IDLE && (
                  <div className="space-y-12">
                    {/* First Aid Section */}
                    <section id="first-aid-section" className="space-y-6 scroll-mt-20">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                          <LifeBuoy size={24} className="text-red-500" />
                          คู่มือปฐมพยาบาลเบื้องต้น (First Aid)
                        </h3>
                        <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">ฉุกเฉิน</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FIRST_AID_LINKS.map((link) => (
                          <button
                            key={link.id}
                            onClick={() => {
                              setQuery(link.title);
                              handleSearch(link.title);
                            }}
                            className="flex items-start gap-4 p-5 bg-white border-l-4 border-l-red-400 border-slate-200 rounded-2xl hover:border-red-400 hover:shadow-lg transition-all text-left group"
                          >
                            <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                              {renderIcon(link.icon)}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800">{link.title}</h4>
                              <p className="text-sm text-slate-500 mt-1">{link.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>

                    {/* Popular Diseases Section */}
                    <section className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Activity size={24} className="text-blue-600" />
                        ข้อมูลโรคที่พบบ่อย
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {DISEASE_LINKS.map((link) => (
                          <button
                            key={link.id}
                            onClick={() => {
                              setQuery(link.title);
                              handleSearch(link.title);
                            }}
                            className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all text-left group"
                          >
                            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                              {renderIcon(link.icon)}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800">{link.title}</h4>
                              <p className="text-sm text-slate-500 mt-1">{link.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-2xl shadow-lg shadow-blue-200">
                        !
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">สถาบันการแพทย์ฉุกเฉินแห่งชาติ</h4>
                        <p className="text-blue-700 text-sm">หากพบผู้ป่วยวิกฤต หรือต้องการความช่วยเหลือเร่งด่วน โทร <strong className="text-lg">1669</strong></p>
                      </div>
                      <a href="tel:1669" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors whitespace-nowrap shadow-lg shadow-red-200">
                        โทร 1669
                      </a>
                    </div>
                  </div>
                )}

                {appState === AppState.LOADING && (
                  <div className="bg-white rounded-3xl p-12 text-center space-y-6 border border-slate-100 shadow-sm">
                    <div className="flex justify-center">
                       <div className="relative">
                          <Loader2 size={64} className="text-blue-600 animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Activity size={24} className="text-blue-400" />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-800">กำลังดึงข้อมูลที่ถูกต้อง...</h3>
                      <p className="text-slate-500">ระบบ AI กำลังวิเคราะห์และสรุปขั้นตอนการรักษาเบื้องต้นให้คุณ</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-100"></span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200"></span>
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-300"></span>
                    </div>
                  </div>
                )}

                {appState === AppState.ERROR && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-4">
                    <AlertCircle size={48} className="text-red-500 mx-auto" />
                    <h3 className="text-xl font-bold text-red-800">เกิดข้อผิดพลาด</h3>
                    <p className="text-red-600">{error}</p>
                    <button 
                      onClick={() => handleSearch(query)}
                      className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors"
                    >
                      ลองใหม่อีกครั้ง
                    </button>
                  </div>
                )}

                {appState === AppState.SUCCESS && result && (
                  <DiseaseInfoCard result={result} />
                )}
              </div>

              {/* Sidebar Area */}
              <div className="lg:col-span-4 order-1 lg:order-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <ShieldAlert size={18} className="text-amber-500" />
                    หลักการปฐมพยาบาล 3 ขั้นตอน
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                      <p className="text-sm text-slate-600"><strong>Check:</strong> ตรวจสอบความปลอดภัยของสถานที่และประเมินอาการผู้บาดเจ็บ</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                      <p className="text-sm text-slate-600"><strong>Call:</strong> โทรแจ้ง 1669 เพื่อขอความช่วยเหลือทางการแพทย์ทันที</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                      <p className="text-sm text-slate-600"><strong>Care:</strong> ให้การดูแลเบื้องต้นตามอาการจนกว่าเจ้าหน้าที่จะมาถึง</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold mb-3 flex items-center gap-2 text-red-400">
                    <AlertCircle size={18} />
                    สัญญาณอันตราย
                  </h4>
                  <p className="text-xs text-slate-300 mb-4">หากพบบุคคลมีอาการดังต่อไปนี้ โปรดตามแพทย์ทันที:</p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">• หมดสติ ไม่รู้สึกตัว</li>
                    <li className="flex items-center gap-2">• หายใจลำบาก หรือหยุดหายใจ</li>
                    <li className="flex items-center gap-2">• เจ็บหน้าอกรุนแรง</li>
                    <li className="flex items-center gap-2">• ปากเบี้ยว แขนขาอ่อนแรง</li>
                    <li className="flex items-center gap-2">• เลือดออกรุนแรงไม่หยุด</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </>
      ) : (
        <AboutView />
      )}
    </Layout>
  );
};

export default App;
