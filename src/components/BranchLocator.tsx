import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  ExternalLink, 
  Clock, 
  Search, 
  Building, 
  Navigation,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { BRANCHES_DATA, BRANCH_HOURS } from '../data/branchData';
import { BranchItem } from '../types';

export const BranchLocator: React.FC = () => {
  const [selectedBranchId, setSelectedBranchId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = ['all', 'TP.HCM', 'Đà Nẵng', 'Quảng Nam', 'Hà Nội'];

  const filteredBranches = BRANCHES_DATA.filter((b) => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || b.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const selectedBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#005596] via-[#004277] to-[#002f5a] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold backdrop-blur-sm">
            <Building className="w-3.5 h-3.5 text-yellow-300" />
            <span>Mạng Lưới 155 Chi Nhánh & Hơn 1.000 PGD Toàn Quốc</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Điểm Giao Dịch VietinBank
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Tra cứu nhanh thông tin địa chỉ, chỉ đường Google Maps, hotline liên hệ trực tiếp và thời gian mở cửa phục vụ tại các điểm giao dịch VietinBank.
          </p>
        </div>
      </div>

      {/* Operating Hours Notice Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#005596] flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">Thời gian giao dịch tiêu chuẩn</h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              <strong className="text-slate-900">Thứ 2 đến thứ 6:</strong> Sáng từ 07:30 AM Đến 11:30 AM | Chiều từ 01:00 PM Đến 04:30 PM
            </p>
            <p className="text-xs text-rose-600 font-semibold mt-0.5">
              Thứ 7 - Chủ nhật: Nghỉ giao dịch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
          <Phone className="w-4 h-4 text-[#c4161c]" />
          <span>Tổng đài CSKH 24/7: <strong className="text-[#c4161c]">1900 558 868</strong></span>
        </div>
      </div>

      {/* Selection & Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Quick Dropdown as specified in prompt: "Khách hàng chọn tên chi nhánh trong danh sách 155 chi nhánh của VietinBank: Bắc Đà Nẵng, Hội An, TP.HCM, CN 3 – TP.HCM" */}
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Chọn chi nhánh / Phòng giao dịch:
            </label>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold bg-white text-sm"
            >
              {BRANCHES_DATA.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.region})
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Tìm kiếm theo tên hoặc tuyến đường:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nhập tên chi nhánh, đường..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:border-[#005596] focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
          <span className="text-xs font-medium text-slate-500 mr-1">Khu vực:</span>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRegion === reg
                  ? 'bg-[#005596] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {reg === 'all' ? 'Tất cả 155 Chi nhánh' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Branch Highlight Card */}
      {selectedBranch && (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image section */}
            <div className="lg:col-span-5 bg-slate-100 relative min-h-[260px] lg:min-h-full">
              {selectedBranch.imageUrl ? (
                <img
                  src={selectedBranch.imageUrl}
                  alt={selectedBranch.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.branch-fallback')) {
                      const div = document.createElement('div');
                      div.className = 'branch-fallback w-full h-full min-h-[260px] flex items-center justify-center bg-gradient-to-br from-[#005596] to-blue-900 text-white font-bold text-lg p-6 text-center';
                      div.innerText = selectedBranch.name;
                      parent.appendChild(div);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full min-h-[260px] flex items-center justify-center bg-[#005596] text-white font-bold">
                  {selectedBranch.name}
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#005596] text-xs font-bold shadow">
                  {selectedBranch.region}
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#005596] uppercase tracking-wider">
                    Điểm Giao Dịch Được Chọn
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {selectedBranch.name}
                  </h3>
                </div>

                <div className="space-y-3 text-sm">
                  {/* Address with Google Maps link */}
                  <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 leading-snug">
                        {selectedBranch.address}
                      </p>
                      <a
                        href={selectedBranch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#005596] hover:underline"
                      >
                        <Navigation className="w-3.5 h-3.5 text-blue-600" />
                        <span>Mở bản đồ chỉ đường Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Phone with call action */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#005596]" />
                      <div>
                        <span className="text-xs text-slate-500 block">Số điện thoại bàn / Hotline:</span>
                        <span className="font-mono font-bold text-slate-900 text-base">{selectedBranch.phone}</span>
                      </div>
                    </div>
                    <a
                      href={`tel:${selectedBranch.phone.replace(/[^0-9]/g, '')}`}
                      className="px-4 py-2 rounded-xl bg-[#c4161c] hover:bg-[#a51217] text-white font-bold text-xs shadow transition-all hover:scale-105"
                    >
                      Gọi ngay
                    </a>
                  </div>

                  {/* Working hours */}
                  <div className="flex items-start gap-3 p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs text-slate-700">
                    <Clock className="w-4 h-4 text-[#005596] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#005596]">Thời gian mở cửa đón khách:</p>
                      <p className="mt-0.5">{BRANCH_HOURS.weekdays}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                <a
                  href={selectedBranch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#005596] hover:bg-[#003f75] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Dẫn Đường Bằng Google Maps</span>
                </a>

                <a
                  href={`tel:${selectedBranch.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c4161c]" />
                  <span>Gọi {selectedBranch.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table list of branches as specified in PDF */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-lg font-bold text-slate-900">
          Danh Sách Điểm Giao Dịch Chi Nhánh 3 & Trọng Điểm
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-3 px-3 text-center">Stt</th>
                <th className="py-3 px-4">Chi nhánh / PGD</th>
                <th className="py-3 px-4">Địa chỉ</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4 text-center">Bản đồ</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBranches.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedBranchId(item.id)}
                  className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${
                    selectedBranchId === item.id ? 'bg-blue-50/80 font-medium' : ''
                  }`}
                >
                  <td className="py-3.5 px-3 text-center font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                    {item.address}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                    <a
                      href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-[#c4161c] hover:underline"
                    >
                      {item.phone}
                    </a>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <a
                      href={item.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#005596] font-semibold text-xs transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Maps</span>
                    </a>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => setSelectedBranchId(item.id)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#005596] hover:text-white text-slate-700 font-semibold text-xs transition-colors"
                    >
                      Xem vị trí
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
