import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  Gift, 
  Phone, 
  ChevronRight, 
  CheckCircle2, 
  X,
  ExternalLink,
  Tag,
  Building2,
  TrendingUp
} from 'lucide-react';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from '../data/productData';
import { CONSULTANT_INFO } from '../data/faqData';
import { ProductItem } from '../types';

export const FeaturedProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [interestedProduct, setInterestedProduct] = useState<ProductItem | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#005596] via-[#004882] to-[#002f5a] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>Sản Phẩm & Ưu Đãi Trọng Điểm</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Sản Phẩm Dịch Vụ Nổi Bật
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Khám phá các sản phẩm, ưu đãi và tiện ích VietinBank đang được giới thiệu tại chi nhánh.
          </p>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {PRODUCT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                isSelected
                  ? 'bg-[#005596] text-white shadow-md shadow-blue-900/20'
                  : 'bg-white text-slate-600 hover:text-[#005596] hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid / Poster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group bg-white rounded-3xl overflow-hidden border-2 border-transparent hover:border-[#c4161c]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
            }}
          >
            {/* Poster Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.poster-fallback')) {
                    const div = document.createElement('div');
                    div.className = 'poster-fallback w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-blue-900 to-[#005596] text-white';
                    div.innerHTML = `<span class="text-xs uppercase font-bold text-yellow-300 mb-2">${prod.categoryLabel}</span><h4 class="font-bold text-base leading-tight">${prod.title}</h4>`;
                    parent.appendChild(div);
                  }
                }}
              />

              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-extrabold shadow-md backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-white" />
                  <span>Nổi bật</span>
                </span>
                {prod.tag && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-yellow-300 text-[11px] font-bold shadow-md backdrop-blur-sm">
                    {prod.tag}
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 rounded-full bg-white/90 text-red-600 flex items-center justify-center shadow-md">
                  <Gift className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Poster Info & Actions */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#005596] uppercase tracking-wider block">
                  {prod.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005596] transition-colors line-clamp-2">
                  {prod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setInterestedProduct(prod)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#005596] to-[#004780] hover:from-[#c4161c] hover:to-[#a51217] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Tôi quan tâm</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: "Tôi quan tâm" Callback as explicitly required */}
      {interestedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#005596] to-[#003b6d] p-6 text-white relative">
              <button
                onClick={() => setInterestedProduct(null)}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Gift className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">
                    Thông Tin Tư Vấn Sản Phẩm
                  </span>
                  <h3 className="text-lg font-bold leading-snug">
                    {interestedProduct.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Notification Body matching prompt exactly */}
            <div className="p-6 space-y-5">
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-2 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">
                  Cảm ơn Quý khách đã quan tâm đến sản phẩm/dịch vụ này. Quý khách vui lòng liên hệ cán bộ VietinBank tại quầy để được tư vấn chi tiết.
                </p>
                <p className="text-slate-600 font-medium pt-2 border-t border-blue-200/60">
                  Hoặc liên hệ <span className="font-bold text-[#005596]">Chuyên viên tư vấn {CONSULTANT_INFO.name}</span> –{' '}
                  <span className="font-bold text-[#c4161c]">{CONSULTANT_INFO.phoneDisplay}</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`tel:${CONSULTANT_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#c4161c] hover:bg-[#a51217] text-white font-bold text-sm shadow-md shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Phone className="w-4 h-4 animate-pulse" />
                  <span>Gọi Ngay ({CONSULTANT_INFO.phoneDisplay})</span>
                </a>
                <button
                  onClick={() => setInterestedProduct(null)}
                  className="px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
