import React from 'react';
import { 
  Smartphone, 
  Apple, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Gift, 
  CreditCard,
  QrCode,
  Download
} from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  const iosUrl = 'https://apps.apple.com/vn/app/vietinbank-ipay/id689963454?l=vi';
  const androidUrl = 'https://play.google.com/store/apps/details?id=com.vietinbank.ipay';

  // Using public high quality QR image generator API so customers can immediately scan directly from the screen
  const iosQr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(iosUrl)}`;
  const androidQr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(androidUrl)}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#005596] via-[#004277] to-[#002f5a] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <Smartphone className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-sm">
            <Smartphone className="w-3.5 h-3.5 text-yellow-300" />
            <span>Ngân Hàng Số Vạn Năng</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Tải Ứng Dụng VietinBank iPay Mobile
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Quét mã QR bằng điện thoại của Quý khách hoặc nhấn nút bên dưới để tải và trải nghiệm ngay hệ sinh thái tài chính số hiện đại, bảo mật hàng đầu Việt Nam.
          </p>
        </div>
      </div>

      {/* QR Codes Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* iOS Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
            <Apple className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Hệ điều hành iOS</span>
            <h3 className="text-xl font-bold text-slate-900">VietinBank iPay trên iPhone & iPad</h3>
            <p className="text-xs text-slate-500">Tương thích iOS 13.0 trở lên</p>
          </div>

          {/* QR Code */}
          <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl shadow-inner group">
            <img
              src={iosQr}
              alt="QR Code Tải iPay iOS"
              className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl object-contain mx-auto"
            />
            <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
              <QrCode className="w-3.5 h-3.5 text-[#005596]" />
              <span>Dùng camera iPhone quét mã tải ngay</span>
            </div>
          </div>

          <a
            href={iosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-md"
          >
            <Apple className="w-5 h-5" />
            <span>Mở Trên App Store</span>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* Android Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#00875a] text-white flex items-center justify-center shadow-md">
            <Download className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Hệ điều hành Android</span>
            <h3 className="text-xl font-bold text-slate-900">VietinBank iPay trên Android</h3>
            <p className="text-xs text-slate-500">Samsung, Xiaomi, Oppo, Vivo...</p>
          </div>

          {/* QR Code */}
          <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl shadow-inner group">
            <img
              src={androidQr}
              alt="QR Code Tải iPay Android"
              className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl object-contain mx-auto"
            />
            <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
              <QrCode className="w-3.5 h-3.5 text-[#00875a]" />
              <span>Dùng camera điện thoại quét mã tải ngay</span>
            </div>
          </div>

          <a
            href={androidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-semibold text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-md"
          >
            <Download className="w-5 h-5" />
            <span>Mở Trên Google Play</span>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h4 className="text-lg font-bold text-slate-900 text-center sm:text-left">
          Đặc Quyền Vượt Trội Khi Sử Dụng VietinBank iPay
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Miễn 100% Phí Dịch Vụ</p>
              <p className="text-xs text-slate-600 mt-1">Phí chuyển tiền liên ngân hàng 24/7, duy trì tài khoản, thông báo biến động số dư OTT.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Sinh Trắc Học Chuẩn 2345</p>
              <p className="text-xs text-slate-600 mt-1">Xác thực khuôn mặt thông minh và chip NFC CCCD an toàn tuyệt đối, chống gian lận.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-600 text-white flex-shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Cộng Lãi Tiết Kiệm Online</p>
              <p className="text-xs text-slate-600 mt-1">Gửi tiết kiệm trên iPay nhận lãi suất cao hơn gửi tại quầy từ 0.2% - 0.4%/năm.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-600 text-white flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Vạn Năng Tiện Ích</p>
              <p className="text-xs text-slate-600 mt-1">Đặt lịch hẹn tại quầy, nộp thuế eTax, đặt vé máy bay, phòng khách sạn, xem phim trọn gói.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
