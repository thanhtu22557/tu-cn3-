import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Table, 
  Calendar, 
  ChevronRight, 
  X, 
  Printer, 
  TrendingDown,
  Info,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { LoanScheduleRow } from '../types';

export const LoanCalculator: React.FC = () => {
  // Input states (NO SLIDER! Strictly input as specified in requirements)
  const [loanAmountStr, setLoanAmountStr] = useState<string>('500000000'); // 500 triệu default
  const [loanDurationMonths, setLoanDurationMonths] = useState<number>(24); // 24 tháng default
  const [annualRateStr, setAnnualRateStr] = useState<string>('8.5'); // 8.5%/năm
  const [disbursementDate, setDisbursementDate] = useState<string>('2026-01-10'); // Ví dụ như trong tài liệu
  const [paymentCycle, setPaymentCycle] = useState<'monthly' | 'quarterly' | 'sixMonths' | 'yearly'>('monthly');
  const [paymentDueDay, setPaymentDueDay] = useState<number>(25); // Mặc định ngày 25 hàng tháng
  const [roundingUnit, setRoundingUnit] = useState<1 | 1000>(1000); // Làm tròn 1đ hoặc 1.000đ

  // Modal State for "Xem chi tiết"
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Parse numeric values
  const loanAmount = useMemo(() => {
    const clean = loanAmountStr.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10) : 0;
  }, [loanAmountStr]);

  const annualRate = useMemo(() => {
    const p = parseFloat(annualRateStr);
    return isNaN(p) ? 0 : p;
  }, [annualRateStr]);

  // Determine number of periods and rate per period
  const { totalPeriods, periodMonths, periodRate } = useMemo(() => {
    let monthsPerCycle = 1;
    let rateDivisor = 12;

    if (paymentCycle === 'monthly') {
      monthsPerCycle = 1;
      rateDivisor = 12;
    } else if (paymentCycle === 'quarterly') {
      monthsPerCycle = 3;
      rateDivisor = 4;
    } else if (paymentCycle === 'sixMonths') {
      monthsPerCycle = 6;
      rateDivisor = 2;
    } else if (paymentCycle === 'yearly') {
      monthsPerCycle = 12;
      rateDivisor = 1;
    }

    const periods = Math.max(1, Math.ceil(loanDurationMonths / monthsPerCycle));
    const pRate = (annualRate / 100) / rateDivisor;

    return {
      totalPeriods: periods,
      periodMonths: monthsPerCycle,
      periodRate: pRate
    };
  }, [paymentCycle, loanDurationMonths, annualRate]);

  // Rounding helper
  const roundValue = (val: number, unit: 1 | 1000) => {
    if (unit === 1000) {
      return Math.round(val / 1000) * 1000;
    }
    return Math.round(val);
  };

  // Generate repayment schedule with decreasing balance
  const scheduleRows = useMemo<LoanScheduleRow[]>(() => {
    if (loanAmount <= 0 || totalPeriods <= 0) return [];

    const rows: LoanScheduleRow[] = [];
    const disbDateObj = new Date(disbursementDate);
    
    // Gốc trả mỗi kỳ đều nhau
    const basePrincipalPerPeriod = roundValue(loanAmount / totalPeriods, roundingUnit);

    let currentRemaining = loanAmount;
    let accumulatedPrincipalPaid = 0;

    for (let period = 1; period <= totalPeriods; period++) {
      // 1. Calculate Period Date based on disbursement date + paymentDueDay
      const nextDate = new Date(disbDateObj);
      nextDate.setMonth(nextDate.getMonth() + period * periodMonths);
      // set specific payment due day
      const maxDaysInMonth = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();
      const actualDueDay = Math.min(paymentDueDay, maxDaysInMonth);
      nextDate.setDate(actualDueDay);

      const dayStr = String(nextDate.getDate()).padStart(2, '0');
      const monthStr = String(nextDate.getMonth() + 1).padStart(2, '0');
      const yearStr = nextDate.getFullYear();
      const dateFormatted = `${dayStr}/${monthStr}/${yearStr}`;

      // 2. Gốc kỳ này: nếu là kỳ cuối, điều chỉnh sai lệch làm tròn
      let periodPrincipal = basePrincipalPerPeriod;
      if (period === totalPeriods) {
        periodPrincipal = loanAmount - accumulatedPrincipalPaid;
      }

      // 3. Lãi kỳ = Dư nợ đầu kỳ * Lãi suất kỳ
      const periodInterest = roundValue(currentRemaining * periodRate, roundingUnit);

      // 4. Tổng = Gốc + Lãi
      const totalPayment = periodPrincipal + periodInterest;

      // 5. Cập nhật dư nợ
      const nextRemaining = Math.max(0, currentRemaining - periodPrincipal);

      rows.push({
        period,
        dateStr: dateFormatted,
        remainingPrincipal: currentRemaining,
        principal: periodPrincipal,
        interest: periodInterest,
        totalPayment: totalPayment
      });

      accumulatedPrincipalPaid += periodPrincipal;
      currentRemaining = nextRemaining;
    }

    return rows;
  }, [loanAmount, totalPeriods, periodMonths, periodRate, disbursementDate, paymentDueDay, roundingUnit]);

  // Summary Totals
  const { totalInterestPaid, totalAmountPaid, firstPeriodPayment, lastPeriodPayment } = useMemo(() => {
    if (scheduleRows.length === 0) {
      return { totalInterestPaid: 0, totalAmountPaid: 0, firstPeriodPayment: 0, lastPeriodPayment: 0 };
    }
    const totInt = scheduleRows.reduce((acc, row) => acc + row.interest, 0);
    const totAll = scheduleRows.reduce((acc, row) => acc + row.totalPayment, 0);
    return {
      totalInterestPaid: totInt,
      totalAmountPaid: totAll,
      firstPeriodPayment: scheduleRows[0]?.totalPayment || 0,
      lastPeriodPayment: scheduleRows[scheduleRows.length - 1]?.totalPayment || 0
    };
  }, [scheduleRows]);

  const formatVND = (val: number) => val.toLocaleString('vi-VN');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#005596] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Kế Hoạch Tài Chính VietinBank</span>
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Bảng Tính Lãi Suất & Lịch Trả Nợ Khoản Vay
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Phương thức: <strong className="text-[#005596]">Trả gốc đều, lãi tính trên dư nợ giảm dần</strong>. Giúp Quý khách tối ưu chi phí lãi vay và chủ động kế hoạch trả nợ.
          </p>
        </div>

        <button
          onClick={() => setShowDetailModal(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#005596] hover:bg-[#003b6d] text-white font-bold text-sm shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <Table className="w-4 h-4" />
          <span>Xem Chi Tiết Lịch Trả Nợ</span>
        </button>
      </div>

      {/* Main Grid: Form Inputs (Left) and Results Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step 1: Input form (NO SLIDERS - Strictly inputs as instructed) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bước 1</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Nhập thông tin khoản vay</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Số tiền vay */}
            <div className="sm:col-span-2 space-y-2">
              <label htmlFor="loan-amount" className="block text-sm font-semibold text-slate-700">
                Số tiền vay (VND) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="loan-amount"
                  type="text"
                  inputMode="numeric"
                  value={loanAmount ? formatVND(loanAmount) : loanAmountStr}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '');
                    setLoanAmountStr(clean);
                  }}
                  placeholder="Ví dụ: 500.000.000"
                  className="w-full px-4 py-3.5 pr-14 text-base font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  VND
                </span>
              </div>
              {/* Quick Select Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[100000000, 300000000, 500000000, 1000000000, 2000000000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setLoanAmountStr(v.toString())}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      loanAmount === v
                        ? 'bg-blue-50 border-[#005596] text-[#005596] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {v >= 1000000000 ? `${v / 1000000000} Tỷ` : `${v / 1000000} Triệu`}
                  </button>
                ))}
              </div>
            </div>

            {/* Thời gian vay (tháng) */}
            <div className="space-y-2">
              <label htmlFor="loan-duration" className="block text-sm font-semibold text-slate-700">
                Thời gian vay (Tháng) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="loan-duration"
                  type="number"
                  min="1"
                  max="360"
                  value={loanDurationMonths}
                  onChange={(e) => setLoanDurationMonths(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full px-4 py-3.5 pr-16 text-base font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Tháng
                </span>
              </div>
            </div>

            {/* Lãi suất (%/năm) */}
            <div className="space-y-2">
              <label htmlFor="annual-rate" className="block text-sm font-semibold text-slate-700">
                Lãi suất (%/Năm) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="annual-rate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="30"
                  value={annualRateStr}
                  onChange={(e) => setAnnualRateStr(e.target.value)}
                  className="w-full px-4 py-3.5 pr-16 text-base font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  %/Năm
                </span>
              </div>
            </div>

            {/* Ngày giải ngân */}
            <div className="space-y-2">
              <label htmlFor="disburse-date" className="block text-sm font-semibold text-slate-700">
                Ngày giải ngân
              </label>
              <div className="relative">
                <input
                  id="disburse-date"
                  type="date"
                  value={disbursementDate}
                  onChange={(e) => setDisbursementDate(e.target.value)}
                  className="w-full px-4 py-3.5 text-sm font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* Chu kỳ trả nợ */}
            <div className="space-y-2">
              <label htmlFor="pay-cycle" className="block text-sm font-semibold text-slate-700">
                Chu kỳ trả nợ
              </label>
              <select
                id="pay-cycle"
                value={paymentCycle}
                onChange={(e) => setPaymentCycle(e.target.value as 'monthly' | 'quarterly' | 'sixMonths' | 'yearly')}
                className="w-full px-4 py-3.5 text-sm font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
              >
                <option value="monthly">Hằng tháng (Lãi suất/12)</option>
                <option value="quarterly">Hằng quý (Lãi suất/4)</option>
                <option value="sixMonths">6 tháng (Lãi suất/2)</option>
                <option value="yearly">Hằng năm (Lãi suất năm)</option>
              </select>
            </div>

            {/* Ngày trả nợ định kỳ */}
            <div className="space-y-2">
              <label htmlFor="due-day" className="block text-sm font-semibold text-slate-700">
                Ngày trả nợ định kỳ
              </label>
              <div className="relative">
                <input
                  id="due-day"
                  type="number"
                  min="1"
                  max="31"
                  value={paymentDueDay}
                  onChange={(e) => setPaymentDueDay(Math.min(31, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                  className="w-full px-4 py-3.5 pr-28 text-base font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  hàng tháng
                </span>
              </div>
            </div>

            {/* Quy tắc làm tròn */}
            <div className="space-y-2">
              <label htmlFor="rounding" className="block text-sm font-semibold text-slate-700">
                Quy tắc làm tròn
              </label>
              <select
                id="rounding"
                value={roundingUnit}
                onChange={(e) => setRoundingUnit(parseInt(e.target.value, 10) as 1 | 1000)}
                className="w-full px-4 py-3.5 text-sm font-semibold rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
              >
                <option value={1000}>Làm tròn đến 1.000 đồng (chuẩn ngân hàng)</option>
                <option value={1}>Làm tròn đến đơn vị đồng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Overview Result & Click to View Detail */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-[#003b6d] via-[#005596] to-[#0284c7] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between flex-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-sm">
                  <DollarSign className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Dư Nợ Giảm Dần</span>
                </span>
                <span className="text-xs text-blue-200">
                  Tổng {totalPeriods} kỳ thanh toán
                </span>
              </div>

              {/* Payment First Month (Cao nhất) */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                    Số tiền trả kỳ đầu tiên (Cao nhất)
                  </p>
                  <TrendingDown className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-300 font-mono">
                  {formatVND(firstPeriodPayment)} <span className="text-base text-white font-sans font-medium">VND</span>
                </div>
                <p className="text-[11px] text-blue-100">
                  Gốc: {formatVND(scheduleRows[0]?.principal || 0)}đ + Lãi: {formatVND(scheduleRows[0]?.interest || 0)}đ
                </p>
              </div>

              {/* Payment Last Month (Thấp nhất) */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                  Số tiền trả kỳ cuối cùng (Thấp nhất)
                </p>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {formatVND(lastPeriodPayment)} <span className="text-sm text-blue-200 font-sans font-medium">VND</span>
                </div>
              </div>

              {/* Totals */}
              <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 space-y-2 text-xs text-blue-100">
                <div className="flex justify-between">
                  <span>Tổng tiền lãi phải trả:</span>
                  <span className="font-bold text-yellow-300">{formatVND(totalInterestPaid)} VND</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 text-sm text-white">
                  <span>Tổng số tiền gốc + lãi:</span>
                  <span className="font-black font-mono">{formatVND(totalAmountPaid)} VND</span>
                </div>
              </div>
            </div>

            {/* Click to open Detail */}
            <div className="pt-6">
              <button
                onClick={() => setShowDetailModal(true)}
                className="w-full py-4 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-sm transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
              >
                <span>Xem chi tiết lịch trả nợ</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#005596] flex-shrink-0 mt-0.5" />
            <p>
              Sai lệch do làm tròn được tự động bù trừ chuẩn xác vào kỳ trả nợ cuối cùng theo đúng quy tắc nghiệp vụ ngân hàng VietinBank.
            </p>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL: Bảng tính lịch trả nợ với dư nợ giảm dần */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#005596] to-[#003b6d] text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">
                  Bảng Kê Chi Tiết Khoản Vay
                </span>
                <h3 className="text-lg sm:text-2xl font-bold mt-0.5">
                  Bảng tính lịch trả nợ với dư nợ giảm dần
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  Số tiền vay: {formatVND(loanAmount)} VND | Kỳ hạn: {loanDurationMonths} tháng | Lãi suất: {annualRate}%/năm
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="In bảng lịch trả nợ"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Đóng bảng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Table Body */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-3 px-3 sm:px-4 text-center">Stt</th>
                      <th className="py-3 px-3 sm:px-4">Kỳ trả nợ</th>
                      <th className="py-3 px-3 sm:px-4 text-right">Số gốc còn lại (Dư nợ)</th>
                      <th className="py-3 px-3 sm:px-4 text-right">Gốc</th>
                      <th className="py-3 px-3 sm:px-4 text-right">Lãi</th>
                      <th className="py-3 px-3 sm:px-4 text-right text-[#005596]">Tổng Gốc + Lãi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {/* Kỳ 0: Giải ngân ban đầu */}
                    <tr className="bg-blue-50/40 font-medium">
                      <td className="py-2.5 px-3 sm:px-4 text-center text-slate-400">0</td>
                      <td className="py-2.5 px-3 sm:px-4 font-mono text-slate-500">
                        {new Date(disbursementDate).toLocaleDateString('vi-VN')} (Giải ngân)
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-right font-mono font-bold text-slate-900">
                        {formatVND(loanAmount)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-right">-</td>
                      <td className="py-2.5 px-3 sm:px-4 text-right">-</td>
                      <td className="py-2.5 px-3 sm:px-4 text-right">-</td>
                    </tr>

                    {scheduleRows.map((row) => (
                      <tr key={row.period} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-slate-500">
                          {row.period}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 font-mono text-slate-600">
                          {row.dateStr}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-right font-mono">
                          {formatVND(row.remainingPrincipal)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-right font-mono font-medium">
                          {formatVND(row.principal)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-right font-mono text-amber-600 font-medium">
                          {formatVND(row.interest)}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-right font-mono font-bold text-[#005596]">
                          {formatVND(row.totalPayment)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Dòng TỔNG */}
                  <tfoot>
                    <tr className="bg-slate-800 text-white font-bold border-t-2 border-slate-900">
                      <td colSpan={2} className="py-3.5 px-3 sm:px-4 uppercase tracking-wider text-xs sm:text-sm">
                        TỔNG CỘNG
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-right text-slate-400 font-mono text-xs">
                        -
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-right font-mono">
                        {formatVND(loanAmount)}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-right font-mono text-yellow-300">
                        {formatVND(totalInterestPaid)}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-right font-mono text-emerald-300 text-sm sm:text-base">
                        {formatVND(totalAmountPaid)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Lịch trả nợ mang tính chất tham khảo dựa trên giả định ngày giải ngân và chu kỳ thanh toán.
              </span>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#005596] hover:bg-[#003f75] text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                Đóng Bảng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
