import React from 'react';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReturnHome: () => void;
}

export const EndChatModal: React.FC<Props> = ({ isOpen, onClose, onReturnHome }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-8 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center text-[#005596] shadow-inner">
          <HeartHandshake className="w-10 h-10 text-[#005596]" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>VietinBank - Nâng giá trị cuộc sống</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Cảm ơn Quý khách!
          </h3>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Cảm ơn Quý khách đã sử dụng dịch vụ của VietinBank. Chúc Quý khách một ngày tốt lành!
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <button
            onClick={() => {
              onClose();
              onReturnHome();
            }}
            className="w-full py-3.5 px-6 rounded-xl bg-[#005596] hover:bg-[#003f75] text-white font-semibold shadow-lg shadow-blue-800/20 transition-all hover:scale-[1.01] active:scale-95"
          >
            Quay Về Trang Chủ
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-6 text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            Đóng thông báo
          </button>
        </div>
      </div>
    </div>
  );
};
