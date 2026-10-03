export type TabId = 
  | 'faq' 
  | 'download' 
  | 'game' 
  | 'deposit' 
  | 'loan' 
  | 'products' 
  | 'branches';

export interface FaqStep {
  step: number;
  text: string;
  image?: string;
}

export interface FaqItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  videoUrl?: string;
  steps: FaqStep[];
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'ca-nhan' | 'ho-kinh-doanh' | 'doanh-nghiep' | 'uu-dai' | 'tai-san-bao-dam';
  categoryLabel: string;
  description: string;
  imageUrl: string;
  highlight?: boolean;
  tag?: string;
}

export interface BranchItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  imageUrl?: string;
  mapUrl: string;
  region: string;
  isMain?: boolean;
}

export interface LoanScheduleRow {
  period: number;
  dateStr: string;
  remainingPrincipal: number;
  principal: number;
  interest: number;
  totalPayment: number;
}

export interface GameWinData {
  score: number;
  voucherCode: string;
  reward: string;
  timestamp: string;
}

export interface GameLoseData {
  score: number;
  timestamp: string;
}

declare global {
  interface Window {
    onFlappyVoucherWin?: (data: GameWinData) => void;
    onFlappyVoucherLose?: (data: GameLoseData) => void;
  }
}
