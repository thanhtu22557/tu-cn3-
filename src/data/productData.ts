import { ProductItem } from '../types';

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'ca-nhan', label: 'Cá nhân' },
  { id: 'ho-kinh-doanh', label: 'Hộ kinh doanh' },
  { id: 'doanh-nghiep', label: 'Doanh nghiệp' },
  { id: 'uu-dai', label: 'Ưu đãi' },
  { id: 'tai-san-bao-dam', label: 'Tài sản bảo đảm' }
] as const;

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'mo-tk-hkd',
    title: 'Mở tài khoản Hộ kinh doanh',
    category: 'ho-kinh-doanh',
    categoryLabel: 'Dành cho hộ kinh doanh',
    description: 'Miễn 100% phí chuyển khoản, tặng tài khoản số đẹp theo ngày sinh/phong thủy, hỗ trợ gói vay ưu đãi vốn lưu động chỉ từ 5.5%/năm.',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/M%E1%BB%9F%20t%C3%A0i%20kho%E1%BA%A3n%20h%E1%BB%99%20kinh%20doanh.png',
    highlight: true,
    tag: 'Gói Ưu Đãi Chủ Shop'
  },
  {
    id: 'cham-pos-rut-tien',
    title: 'Chạm POS rút tiền',
    category: 'ca-nhan',
    categoryLabel: 'Dành cho khách hàng cá nhân',
    description: 'Rút tiền mặt tiện lợi, an toàn tại các điểm chấp nhận thẻ POS VietinBank mà không cần thẻ vật lý hay tìm kiếm cây ATM.',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Ch%E1%BA%A1m%20POS%20r%C3%BAt%20ti%E1%BB%81n.png',
    highlight: true,
    tag: 'Tiện Ích Mới'
  },
  {
    id: 'thu-ho-khdn',
    title: 'Sản phẩm thu hộ KHDN',
    category: 'doanh-nghiep',
    categoryLabel: 'Dành cho khách hàng doanh nghiệp',
    description: 'Giải pháp thu hộ tự động đa kênh, đối soát dòng tiền tức thì qua API kết nối trực tiếp hệ thống kế toán ERP của doanh nghiệp.',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Thu%20h%E1%BB%99%20KHDN.png',
    highlight: true,
    tag: 'Doanh Nghiệp Số'
  },
  {
    id: 'dau-gia-tsbd',
    title: 'Bán đấu giá tài sản bảo đảm',
    category: 'tai-san-bao-dam',
    categoryLabel: 'Thông tin bán đấu giá tài sản bảo đảm',
    description: 'Danh mục bất động sản, phương tiện vận tải và tài sản bảo đảm thanh lý công khai, minh bạch với mức giá khởi điểm vô cùng hấp dẫn.',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/T%C3%A0i%20s%E1%BA%A3n%20b%E1%BA%A3o%20%C4%91%E1%BA%A3m%201.jpg',
    highlight: true,
    tag: 'Đấu Giá Công Khai'
  },
  {
    id: 'the-eliv3',
    title: 'Thẻ kép Eliv3 - Hoàn tiền giải trí tới 10%',
    category: 'ca-nhan',
    categoryLabel: 'Dành cho khách hàng cá nhân',
    description: 'Thẻ tích hợp 2 trong 1 (Tín dụng & Ghi nợ quốc tế). Hoàn tiền tới 10% các dịch vụ du lịch, ăn uống, xem phim, giải trí và tích điểm thưởng VietinBank Loyalty không giới hạn.',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/Hoi-so.jpg',
    highlight: true,
    tag: 'Ưu Đãi Hot'
  },
  {
    id: 'goi-tin-dung-uu-dai',
    title: 'Gói vay ưu đãi lãi suất cạnh tranh 2026',
    category: 'uu-dai',
    categoryLabel: 'Ưu đãi đang triển khai',
    description: 'Gói vay mua nhà, mua ô tô, tiêu dùng cá nhân và mở rộng kinh doanh với lãi suất cố định ưu đãi chỉ từ 5.6%/năm cùng thời gian phê duyệt siêu tốc.',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/PGD-Hai-Ba-Trung.jpg',
    highlight: true,
    tag: 'Lãi Suất Siêu Tốt'
  }
];
