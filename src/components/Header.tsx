import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Download, 
  Gamepad2, 
  PiggyBank, 
  Calculator, 
  Sparkles, 
  MapPin, 
  PhoneCall,
  Clock,
  Building2
} from 'lucide-react';
import { TabId } from '../types';
import { CONSULTANT_INFO } from '../data/faqData';

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenCounselor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenCounselor
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems: { id: TabId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'faq', label: '1. Giải đáp thắc mắc', icon: HelpCircle },
    { id: 'download', label: '2. Tải App iPay', icon: Download, badge: 'Miễn phí' },
    { id: 'game', label: '3. Thử thách Game', icon: Gamepad2, badge: 'Voucher 2L' },
    { id: 'deposit', label: '4. Tính lãi tiền gửi', icon: PiggyBank },
    { id: 'loan', label: '5. Lịch trả nợ vay', icon: Calculator },
    { id: 'products', label: '6. Sản phẩm nổi bật', icon: Sparkles, badge: 'Hot' },
    { id: 'branches', label: '7. Điểm giao dịch', icon: MapPin }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Utility Bar */}
      <div className="bg-[#003b6d] text-white text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2 border-b border-blue-900/30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-blue-100">
            <Building2 className="w-3.5 h-3.5 text-yellow-400" />
            <span>Kiosk Tương Tác Quầy Giao Dịch VietinBank</span>
          </span>
          <span className="hidden sm:inline text-blue-300">|</span>
          <span className="hidden sm:flex items-center gap-1 text-blue-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Giờ phục vụ: 07:30 - 11:30 | 13:00 - 16:30</span>
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {currentTime && (
            <span className="font-mono text-blue-200 bg-white/10 px-2 py-0.5 rounded text-[11px]">
              {currentTime}
            </span>
          )}
          <button
            onClick={onOpenCounselor}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c4161c] hover:bg-red-700 text-white font-medium transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Hotline: {CONSULTANT_INFO.phoneDisplay}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo VietinBank */}
        <div 
          onClick={() => onTabChange('faq')}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <img
            src="https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Logo%20VietinBank.png"
            alt="VietinBank Logo"
            className="h-9 sm:h-11 object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              // fallback if external network glitch
              const target = e.currentTarget;
              target.onerror = null;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-logo')) {
                const span = document.createElement('span');
                span.className = 'fallback-logo font-black text-2xl text-[#005596] tracking-tighter';
                span.innerText = 'VietinBank';
                parent.appendChild(span);
              }
            }}
          />
          <div className="hidden lg:block pl-3 border-l border-slate-200">
            <h1 className="text-sm font-bold text-[#005596] leading-tight">
              NGÂN HÀNG TMCP CÔNG THƯƠNG VIỆT NAM
            </h1>
            <p className="text-xs text-slate-500 font-medium">Trợ Lý Dịch Vụ Khách Hàng Tại Quầy</p>
          </div>
        </div>

        {/* Quick Advisor Badge */}
        <div 
          onClick={onOpenCounselor}
          className="hidden md:flex items-center gap-3 p-1.5 pr-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#005596] to-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            TH
          </div>
          <div className="text-left leading-tight">
            <p className="text-[11px] text-slate-500">Chuyên viên tư vấn quầy</p>
            <p className="text-xs font-bold text-slate-800">{CONSULTANT_INFO.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar (Horizontal Scrollable on Mobile) */}
      <div className="border-t border-slate-200 bg-slate-50/80 px-2 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
                  isActive
                    ? 'bg-[#005596] text-white shadow-md shadow-blue-900/20'
                    : 'text-slate-600 hover:text-[#005596] hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-300' : 'text-slate-500'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                      isActive 
                        ? 'bg-yellow-400 text-slate-900' 
                        : 'bg-red-100 text-[#c4161c]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
