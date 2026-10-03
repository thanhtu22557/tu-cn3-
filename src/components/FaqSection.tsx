import React, { useState } from 'react';
import { 
  KeyRound, 
  CreditCard, 
  Fingerprint, 
  Receipt, 
  CalendarClock, 
  ArrowLeft, 
  ExternalLink, 
  Youtube, 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  ZoomIn, 
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { FAQ_DATA, CONSULTANT_INFO } from '../data/faqData';
import { FaqItem } from '../types';

interface FaqSectionProps {
  onEndChat: () => void;
  onOpenCounselor: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onEndChat, onOpenCounselor }) => {
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'not_ok'>('idle');

  const cardIcons: Record<string, React.ElementType> = {
    'quen-mat-khau': KeyRound,
    'dong-the': CreditCard,
    'sinh-trac-hoc': Fingerprint,
    'nop-thue': Receipt,
    'dat-lich': CalendarClock
  };

  const handleSelectFaq = (faq: FaqItem) => {
    setSelectedFaq(faq);
    setActiveStepIndex(0);
    setFeedbackState('idle');
  };

  const handleBackToMenu = () => {
    setSelectedFaq(null);
    setActiveStepIndex(0);
    setFeedbackState('idle');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {!selectedFaq ? (
        // Grid Menu Screen
        <div className="space-y-8 animate-fade-in">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-br from-[#005596] via-[#004780] to-[#002f5a] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-blue-950/10">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Trợ lý điện tử tại quầy VietinBank</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                Anh/chị đang gặp khó khăn với nội dung nào?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Chạm vào các chủ đề bên dưới để xem hướng dẫn từng bước chi tiết kèm hình ảnh minh họa và video hướng dẫn trực quan.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FAQ_DATA.map((faq, index) => {
              const Icon = cardIcons[faq.id] || HelpCircle;
              return (
                <div
                  key={faq.id}
                  onClick={() => handleSelectFaq(faq)}
                  className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#005596] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#005596] group-hover:bg-[#005596] group-hover:text-white flex items-center justify-center transition-colors shadow-inner">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#005596] transition-colors">
                        Mục 0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005596] transition-colors line-clamp-2">
                        {faq.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {faq.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-[#005596]">
                    <span>{faq.steps.length} bước thực hiện</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#005596]">
                      Xem hướng dẫn →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Help Banner */}
          <div className="bg-slate-100/80 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c4161c]/10 text-[#c4161c] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Cần sự hỗ trợ trực tiếp từ nhân viên?</p>
                <p className="text-xs text-slate-500">Chuyên viên tư vấn: {CONSULTANT_INFO.name} ({CONSULTANT_INFO.phoneDisplay})</p>
              </div>
            </div>
            <button
              onClick={onOpenCounselor}
              className="px-4 py-2 rounded-xl bg-[#005596] hover:bg-[#003b6d] text-white text-xs font-semibold shadow transition-colors whitespace-nowrap"
            >
              Liên Hệ Cán Bộ Quầy
            </button>
          </div>
        </div>
      ) : (
        // Detail Step-by-Step Guide
        <div className="space-y-6 animate-fade-in">
          {/* Top Navigation Bar inside Guide */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={handleBackToMenu}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại menu chính</span>
            </button>

            <div className="flex items-center gap-2">
              {selectedFaq.videoUrl && (
                <a
                  href={selectedFaq.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all hover:scale-105"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Xem Video Youtube</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              )}
              <button
                onClick={onEndChat}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-medium text-xs sm:text-sm transition-colors"
              >
                <LogOut className="w-4 h-4 text-slate-400" />
                <span>Kết thúc cuộc trò chuyện</span>
              </button>
            </div>
          </div>

          {/* Guide Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#005596] uppercase tracking-wider">
                  Hướng Dẫn Thao Tác Chi Tiết
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {selectedFaq.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  {selectedFaq.description}
                </p>
              </div>
            </div>

            {/* Steps Progress Tabs */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {selectedFaq.steps.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeStepIndex === idx
                      ? 'bg-[#005596] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Bước {s.step}
                </button>
              ))}
            </div>

            {/* Active Step Display */}
            {selectedFaq.steps[activeStepIndex] && (
              <div className="mt-4 p-5 sm:p-7 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#005596] text-white font-extrabold flex items-center justify-center flex-shrink-0 text-base shadow">
                    {selectedFaq.steps[activeStepIndex].step}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase font-bold text-slate-400">
                      Bước {selectedFaq.steps[activeStepIndex].step} / {selectedFaq.steps.length}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-800 mt-0.5 leading-relaxed">
                      {selectedFaq.steps[activeStepIndex].text}
                    </p>
                  </div>
                </div>

                {/* Step Image */}
                {selectedFaq.steps[activeStepIndex].image && (
                  <div className="relative group max-w-xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
                    <img
                      src={selectedFaq.steps[activeStepIndex].image}
                      alt={`Minh họa bước ${selectedFaq.steps[activeStepIndex].step}`}
                      className="w-full h-auto max-h-[460px] object-contain mx-auto cursor-pointer transition-transform group-hover:scale-[1.01]"
                      onClick={() => setZoomImage(selectedFaq.steps[activeStepIndex].image || null)}
                      onError={(e) => {
                        // show friendly image fallback placeholder
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.img-fallback')) {
                          const div = document.createElement('div');
                          div.className = 'img-fallback p-8 text-center text-slate-400 text-sm font-medium';
                          div.innerText = 'Hình ảnh minh họa bước ' + selectedFaq.steps[activeStepIndex].step;
                          parent.appendChild(div);
                        }
                      }}
                    />
                    <button
                      onClick={() => setZoomImage(selectedFaq.steps[activeStepIndex].image || null)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm transition-all opacity-90 group-hover:opacity-100"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Xem phóng to</span>
                    </button>
                  </div>
                )}

                {/* Navigation Between Steps */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm disabled:opacity-30 disabled:pointer-events-none hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Bước trước</span>
                  </button>

                  <span className="text-xs text-slate-500 font-medium">
                    Bước {activeStepIndex + 1} trên {selectedFaq.steps.length}
                  </span>

                  <button
                    disabled={activeStepIndex === selectedFaq.steps.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(selectedFaq.steps.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#005596] text-white font-semibold text-xs sm:text-sm disabled:opacity-30 disabled:pointer-events-none hover:bg-[#003b6d] transition-colors shadow"
                  >
                    <span>Bước tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Feedback & Satisfaction Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                ?
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  Anh/chị đã thực hiện ổn chưa?
                </h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Hãy cho chúng tôi biết để có thể hỗ trợ Quý khách kịp thời.
                </p>
              </div>
            </div>

            {feedbackState === 'idle' ? (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleBackToMenu}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã ổn (Quay lại menu chính)</span>
                </button>
                <button
                  onClick={() => setFeedbackState('not_ok')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-sm border border-rose-200 transition-colors"
                >
                  <span>Chưa ổn (Cần hỗ trợ thêm)</span>
                </button>
                <button
                  onClick={onEndChat}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-sm transition-colors ml-auto"
                >
                  <LogOut className="w-4 h-4 text-slate-400" />
                  <span>Kết thúc cuộc trò chuyện</span>
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-4 animate-fade-in">
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                  Cảm ơn Quý khách đã phản hồi. Quý khách có thể liên hệ{' '}
                  <span className="font-bold text-[#005596]">Chuyên viên tư vấn {CONSULTANT_INFO.name}</span> – số điện thoại:{' '}
                  <a href={`tel:${CONSULTANT_INFO.phone}`} className="font-bold text-[#c4161c] underline">
                    {CONSULTANT_INFO.phoneDisplay}
                  </a>{' '}
                  để hỗ trợ trực tiếp. Em sẽ cố gắng cải thiện để phục vụ Quý khách tốt hơn!
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`tel:${CONSULTANT_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c4161c] hover:bg-[#a51217] text-white font-semibold text-sm shadow transition-all hover:scale-105"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Gọi Chuyên Viên ({CONSULTANT_INFO.phoneDisplay})</span>
                  </a>
                  <button
                    onClick={handleBackToMenu}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-300 transition-colors"
                  >
                    Quay lại menu chính
                  </button>
                  <button
                    onClick={onEndChat}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-600 font-medium text-sm transition-colors"
                  >
                    Kết thúc cuộc trò chuyện
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col items-center">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={zoomImage}
              alt="Phóng to ảnh"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
