/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabId } from './types';
import { Header } from './components/Header';
import { FaqSection } from './components/FaqSection';
import { AppDownloadSection } from './components/AppDownloadSection';
import { FlappyGame } from './components/FlappyGame';
import { DepositCalculator } from './components/DepositCalculator';
import { LoanCalculator } from './components/LoanCalculator';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BranchLocator } from './components/BranchLocator';
import { EndChatModal } from './components/EndChatModal';
import { CounselorContactModal } from './components/CounselorContactModal';
import { CONSULTANT_INFO } from './data/faqData';
import { Phone, MessageSquare, Gamepad2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('faq');
  const [isEndChatOpen, setIsEndChatOpen] = useState<boolean>(false);
  const [isCounselorOpen, setIsCounselorOpen] = useState<boolean>(false);

  const handleReturnHome = () => {
    setActiveTab('faq');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Global Header */}
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onOpenCounselor={() => setIsCounselorOpen(true)} 
      />

      {/* Main Dynamic Workspace */}
      <main className="flex-1 pb-16">
        {activeTab === 'faq' && (
          <FaqSection 
            onEndChat={() => setIsEndChatOpen(true)}
            onOpenCounselor={() => setIsCounselorOpen(true)}
          />
        )}

        {activeTab === 'download' && <AppDownloadSection />}

        {activeTab === 'game' && (
          <FlappyGame onReturnHome={() => setActiveTab('faq')} />
        )}

        {activeTab === 'deposit' && <DepositCalculator />}

        {activeTab === 'loan' && <LoanCalculator />}

        {activeTab === 'products' && <FeaturedProducts />}

        {activeTab === 'branches' && <BranchLocator />}
      </main>

      {/* Global Modals */}
      <EndChatModal 
        isOpen={isEndChatOpen}
        onClose={() => setIsEndChatOpen(false)}
        onReturnHome={handleReturnHome}
      />

      <CounselorContactModal
        isOpen={isCounselorOpen}
        onClose={() => setIsCounselorOpen(false)}
      />

      {/* Floating Action Button (FAB) for fast counter assist */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5">
        {activeTab !== 'game' && (
          <button
            onClick={() => setActiveTab('game')}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-[#c4161c] text-white shadow-lg shadow-red-600/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
            title="Chơi minigame nhận voucher xăng"
          >
            <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        )}

        <button
          onClick={() => setIsCounselorOpen(true)}
          className="w-12 h-12 rounded-full bg-[#005596] text-white shadow-lg shadow-blue-900/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          title="Gọi Chuyên viên tư vấn"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#005596]">VietinBank</span>
            <span>- Ngân Hàng TMCP Công Thương Việt Nam</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <span>Chuyên viên: <strong className="text-slate-800">{CONSULTANT_INFO.name}</strong></span>
            <span>Hotline: <strong className="text-[#c4161c]">{CONSULTANT_INFO.phoneDisplay}</strong></span>
            <span>Tổng đài 24/7: <strong className="text-slate-800">1900 558 868</strong></span>
          </div>

          <p className="text-slate-400">
            Ứng dụng Kiosk Quầy Giao Dịch
          </p>
        </div>
      </footer>
    </div>
  );
}
