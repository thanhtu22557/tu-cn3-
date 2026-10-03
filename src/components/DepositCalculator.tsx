import React, { useState, useMemo } from 'react';
import { 
  PiggyBank, 
  Coins, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle,
  Video,
  AlertTriangle
} from 'lucide-react';

const VIETINBANK_TERMS = [
  { months: 1, label: '1 tháng', defaultRate: 2.0 },
  { months: 2, label: '2 tháng', defaultRate: 2.0 },
  { months: 3, label: '3 tháng', defaultRate: 2.3 },
  { months: 6, label: '6 tháng', defaultRate: 3.5 },
  { months: 9, label: '9 tháng', defaultRate: 3.5 },
  { months: 12, label: '12 tháng (1 năm)', defaultRate: 4.8 },
  { months: 18, label: '18 tháng', defaultRate: 4.8 },
  { months: 24, label: '24 tháng (2 năm)', defaultRate: 5.0 },
  { months: 36, label: '36 tháng (3 năm)', defaultRate: 5.0 }
];

const MIN_DEPOSIT = 1000000; // 1.000.000 VND

export const DepositCalculator: React.FC = () => {
  // Raw amount string
  const [depositAmountStr, setDepositAmountStr] = useState<string>('50000000'); // 50 triệu default
  const [selectedTermMonths, setSelectedTermMonths] = useState<number>(12);
  const [interestRateStr, setInterestRateStr] = useState<string>('4.8');
  
  // Touched states for strict validation
  const [amountTouched, setAmountTouched] = useState<boolean>(false);
  const [termTouched, setTermTouched] = useState<boolean>(false);
  const [rateTouched, setRateTouched] = useState<boolean>(false);

  // Parse values
  const numericAmount = useMemo(() => {
    const clean = depositAmountStr.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10) : 0;
  }, [depositAmountStr]);

  const numericRate = useMemo(() => {
    const parsed = parseFloat(interestRateStr);
    return isNaN(parsed) ? 0 : parsed;
  }, [interestRateStr]);

  // Validation rules
  const amountError = useMemo(() => {
    if (!amountTouched && !depositAmountStr) return '';
    if (!depositAmountStr || numericAmount <= 0) {
      return 'Vui lòng nhập số tiền gửi hợp lệ.';
    }
    return '';
  }, [depositAmountStr, numericAmount, amountTouched]);

  const amountWarning = useMemo(() => {
    if (numericAmount > 0 && numericAmount < MIN_DEPOSIT) {
      return `Số tiền gửi tối thiểu tại VietinBank là ${MIN_DEPOSIT.toLocaleString('vi-VN')} VND.`;
    }
    return '';
  }, [numericAmount]);

  const termError = useMemo(() => {
    if (termTouched && !selectedTermMonths) {
      return 'Vui lòng chọn kỳ hạn gửi.';
    }
    return '';
  }, [selectedTermMonths, termTouched]);

  const rateError = useMemo(() => {
    if (!rateTouched && !interestRateStr) return '';
    if (!interestRateStr || numericRate < 0 || numericRate > 30) {
      return 'Vui lòng nhập lãi suất hợp lệ.';
    }
    return '';
  }, [interestRateStr, numericRate, rateTouched]);

  // Handle format display
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountTouched(true);
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    setDepositAmountStr(rawVal);
  };

  // Change term updates rate recommendation
  const handleTermSelect = (months: number) => {
    setTermTouched(true);
    setSelectedTermMonths(months);
    const matched = VIETINBANK_TERMS.find((t) => t.months === months);
    if (matched) {
      setInterestRateStr(matched.defaultRate.toString());
    }
  };

  // Calculate Interest (Tiền lãi thông thường trả lãi sau: Số tiền * Lãi suất / 100 * Số tháng / 12)
  const calculatedInterest = useMemo(() => {
    if (numericAmount <= 0 || !selectedTermMonths || numericRate <= 0) return 0;
    return Math.round((numericAmount * (numericRate / 100) * selectedTermMonths) / 12);
  }, [numericAmount, selectedTermMonths, numericRate]);

  const calculatedTotal = useMemo(() => {
    return numericAmount + calculatedInterest;
  }, [numericAmount, calculatedInterest]);

  // Format currency
  const formatVND = (val: number) => val.toLocaleString('vi-VN');

  const tiktokVideoUrl = 'https://www.tiktok.com/@nguyentrangtkneu/video/7202579533806062875?is_from_webapp=1&sender_device=pc&web_id=7603681770291086866';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#005596] text-xs font-bold uppercase tracking-wider">
            <PiggyBank className="w-3.5 h-3.5" />
            <span>Tiết Kiệm Thông Minh VietinBank</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            Công cụ tính lãi suất tiền gửi sản phẩm tiền gửi thông thường trả lãi sau
          </h2>
          <p className="text-slate-600 text-sm">
            Tính toán chính xác số tiền lãi sinh lời dự tính và tổng tiền nhận được khi đáo hạn theo biểu lãi suất VietinBank.
          </p>
        </div>

        {/* Video guide link */}
        <a
          href={tiktokVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-black hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex-shrink-0"
        >
          <Video className="w-4 h-4 text-rose-400" />
          <span>Video hướng dẫn gửi tiết kiệm</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Section (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#005596]" />
            <span>Thông tin tiền gửi dự tính</span>
          </h3>

          {/* Field 1: Số tiền gửi */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <label htmlFor="deposit-amount">
                Tổng tiền gửi <span className="text-rose-500">*</span>
              </label>
              {numericAmount > 0 && (
                <span className="text-xs text-[#005596] font-mono">
                  {formatVND(numericAmount)} VND
                </span>
              )}
            </div>

            <div className="relative">
              <input
                id="deposit-amount"
                type="text"
                inputMode="numeric"
                value={numericAmount ? formatVND(numericAmount) : depositAmountStr}
                onChange={handleAmountChange}
                onBlur={() => setAmountTouched(true)}
                placeholder="Ví dụ: 50.000.000"
                className={`w-full px-4 py-3.5 pr-14 text-base font-semibold rounded-2xl border transition-all ${
                  amountError
                    ? 'border-rose-500 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>

            {/* Error or Warning */}
            {amountError && (
              <p className="text-xs font-semibold text-rose-600 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{amountError}</span>
              </p>
            )}
            {amountWarning && !amountError && (
              <p className="text-xs font-medium text-amber-600 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{amountWarning}</span>
              </p>
            )}

            {/* Quick Amount Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[10000000, 50000000, 100000000, 500000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmountTouched(true);
                    setDepositAmountStr(amt.toString());
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    numericAmount === amt
                      ? 'bg-blue-50 border-[#005596] text-[#005596] font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {amt >= 1000000000 ? `${amt / 1000000000} Tỷ` : `${amt / 1000000} Triệu`}
                </button>
              ))}
            </div>
          </div>

          {/* Field 2: Kỳ hạn gửi */}
          <div className="space-y-2">
            <label htmlFor="deposit-term" className="block text-sm font-semibold text-slate-700">
              Kỳ hạn (Tháng) <span className="text-rose-500">*</span>
            </label>

            <select
              id="deposit-term"
              value={selectedTermMonths}
              onChange={(e) => handleTermSelect(parseInt(e.target.value, 10))}
              onBlur={() => setTermTouched(true)}
              className="w-full px-4 py-3.5 text-base font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
            >
              {VIETINBANK_TERMS.map((t) => (
                <option key={t.months} value={t.months}>
                  {t.label} (Tham khảo: {t.defaultRate}%/năm)
                </option>
              ))}
            </select>

            {termError && (
              <p className="text-xs font-semibold text-rose-600">{termError}</p>
            )}
          </div>

          {/* Field 3: Lãi suất */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <label htmlFor="deposit-rate">
                Lãi suất <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-500">
                Cho phép điều chỉnh theo thỏa thuận
              </span>
            </div>

            <div className="relative">
              <input
                id="deposit-rate"
                type="number"
                step="0.05"
                min="0"
                max="25"
                value={interestRateStr}
                onChange={(e) => {
                  setRateTouched(true);
                  setInterestRateStr(e.target.value);
                }}
                onBlur={() => setRateTouched(true)}
                className={`w-full px-4 py-3.5 pr-16 text-base font-semibold rounded-2xl border transition-all ${
                  rateError
                    ? 'border-rose-500 bg-rose-50/30 text-rose-900'
                    : 'border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                %/năm
              </span>
            </div>

            {rateError && (
              <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{rateError}</span>
              </p>
            )}
          </div>

          {/* Deposit Notes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <p className="font-bold text-slate-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nguyên tắc tính lãi:</span>
            </p>
            <p>• Trả lãi sau vào ngày đáo hạn hợp đồng tiết kiệm.</p>
            <p>• Công thức: Số tiền lãi = (Số tiền gửi × Lãi suất × Số ngày gửi thực tế) / 365.</p>
            <p>• Khách hàng gửi trên VietinBank iPay được cộng thêm ưu đãi lãi suất tới +0.4%/năm.</p>
          </div>
        </div>

        {/* Right Output Section (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-[#005596] via-[#004780] to-[#002f5a] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between flex-1">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-sm">
                <Coins className="w-3.5 h-3.5 text-yellow-300" />
                <span>Kết Quả Ước Tính</span>
              </span>

              {/* Interest */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                  Tiền lãi dự tính (Số tiền lãi)
                </p>
                <div className="text-2xl sm:text-3xl font-black text-yellow-300 font-mono">
                  {formatVND(calculatedInterest)} <span className="text-base text-white font-sans font-medium">VND</span>
                </div>
              </div>

              {/* Total Money */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                  Tổng tiền (Gốc + Lãi nhận về)
                </p>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {formatVND(calculatedTotal)} <span className="text-base text-blue-200 font-sans font-medium">VND</span>
                </div>
              </div>
            </div>

            {/* Summary List */}
            <div className="pt-6 border-t border-white/15 space-y-2 text-xs text-blue-100">
              <div className="flex justify-between">
                <span>Số tiền gửi ban đầu:</span>
                <span className="font-bold text-white">{formatVND(numericAmount)} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Kỳ hạn đã chọn:</span>
                <span className="font-bold text-white">{selectedTermMonths} tháng</span>
              </div>
              <div className="flex justify-between">
                <span>Lãi suất áp dụng:</span>
                <span className="font-bold text-yellow-300">{numericRate}% / năm</span>
              </div>
            </div>
          </div>

          {/* Quick Counter Advice Card */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white flex-shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold">Tư vấn tiết kiệm tại quầy:</p>
              <p>Quý khách có nhu cầu gửi tiết kiệm số tiền lớn hoặc kỳ hạn linh hoạt, vui lòng liên hệ trực tiếp Giao dịch viên tại quầy để nhận biểu lãi suất ưu đãi đặc quyền.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
