import React from 'react';
import { Phone, UserCheck, X } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/faqData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

export const CounselorContactModal: React.FC<Props> = ({ isOpen, onClose, productTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-[#005596] to-[#003b6d] p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <UserCheck className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">Tư Vấn Trực Tiếp Tại Quầy</span>
              <h3 className="text-xl font-bold">{CONSULTANT_INFO.name}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {productTitle ? (
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-sm text-slate-700">
              <p className="font-medium text-[#005596]">Sản phẩm Quý khách quan tâm:</p>
              <p className="font-semibold text-slate-900 mt-0.5">{productTitle}</p>
            </div>
          ) : null}

          <p className="text-sm text-slate-600 leading-relaxed">
            Cảm ơn Quý khách đã phản hồi. Quý khách có thể liên hệ trực tiếp với Chuyên viên tư vấn VietinBank để được giải đáp thắc mắc và hỗ trợ kịp thời:
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Chuyên viên:</span>
              <span className="font-bold text-slate-800">{CONSULTANT_INFO.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Đơn vị công tác:</span>
              <span className="font-medium text-slate-700">{CONSULTANT_INFO.branch}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-1 border-t border-slate-200">
              <span className="text-slate-500">Hotline tư vấn:</span>
              <span className="font-bold text-[#c4161c] text-base">{CONSULTANT_INFO.phoneDisplay}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`tel:${CONSULTANT_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c4161c] hover:bg-[#a51217] text-white font-semibold shadow-md shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              <span>Gọi Ngay ({CONSULTANT_INFO.phoneDisplay})</span>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
