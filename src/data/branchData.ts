import { BranchItem } from '../types';

export const BRANCH_HOURS = {
  weekdays: 'Sáng từ 07:30 AM Đến 11:30 AM | Chiều từ 01:00 PM Đến 04:30 PM',
  weekend: 'Nghỉ giao dịch (Thứ 7 & Chủ nhật)',
  emergencyHotline: '1900 558 868'
};

export const BRANCHES_DATA: BranchItem[] = [
  {
    id: 1,
    name: 'Chi nhánh 3 – TP. Hồ Chí Minh (Trụ sở CN)',
    address: '461, 463, 465 Nguyễn Đình Chiểu và số 39, 41 Cao Thắng, Phường Bàn Cờ, Quận 3, TP. Hồ Chí Minh',
    phone: '028.38350317',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/Hoi-so.jpg',
    mapUrl: 'https://maps.app.goo.gl/vMvjvxLD33yUHaae8',
    region: 'TP.HCM',
    isMain: true
  },
  {
    id: 2,
    name: 'PGD Vườn Chuối - CN 3 TP. Hồ Chí Minh',
    address: 'Số 480 đường Nguyễn Đình Chiểu, Phường Bàn Cờ, Quận 3, TP. Hồ Chí Minh',
    phone: '028.39292317',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/PGD-Vuong-Chuoi.jpg',
    mapUrl: 'https://maps.app.goo.gl/my3gSBj83u6YL9376',
    region: 'TP.HCM'
  },
  {
    id: 3,
    name: 'PGD Đô Thành - CN 3 TP. Hồ Chí Minh',
    address: 'Số 464 đường Lê Văn Sỹ, Phường Nhiêu Lộc, Quận 3, TP. Hồ Chí Minh',
    phone: '028.39316487',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/PGD-Do-Thanh.jpg',
    mapUrl: 'https://maps.app.goo.gl/Fxoa34gmF1ZqK1yz5',
    region: 'TP.HCM'
  },
  {
    id: 4,
    name: 'PGD Hai Bà Trưng - CN 3 TP. Hồ Chí Minh',
    address: 'Số 302 đường Hai Bà Trưng, Phường Tân Định, Quận 1, TP. Hồ Chí Minh',
    phone: '028.38298555',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/PGD-Hai-Ba-Trung.jpg',
    mapUrl: 'https://maps.app.goo.gl/AeLEdR8pLnKMu81j9',
    region: 'TP.HCM'
  },
  {
    id: 5,
    name: 'Chi nhánh Bắc Đà Nẵng',
    address: 'Số 36 Bạch Đằng, Phường Thạch Thang, Quận Hải Châu, TP. Đà Nẵng',
    phone: '0236.3822186',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/Hoi-so.jpg',
    mapUrl: 'https://maps.google.com/?q=VietinBank+36+Bach+Dang+Da+Nang',
    region: 'Đà Nẵng'
  },
  {
    id: 6,
    name: 'Chi nhánh Hội An',
    address: 'Số 57 Phan Chu Trinh, Phường Minh An, TP. Hội An, Tỉnh Quảng Nam',
    phone: '0235.3911666',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/PGD-Hai-Ba-Trung.jpg',
    mapUrl: 'https://maps.google.com/?q=VietinBank+57+Phan+Chu+Trinh+Hoi+An',
    region: 'Quảng Nam'
  },
  {
    id: 7,
    name: 'Chi nhánh TP. Hồ Chí Minh (Hội sở Khu vực)',
    address: 'Số 93 - 95 Hàm Nghi, Phường Nguyễn Thái Bình, Quận 1, TP. Hồ Chí Minh',
    phone: '028.38210089',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/Hoi-so.jpg',
    mapUrl: 'https://maps.google.com/?q=VietinBank+93+Ham+Nghi+Quan+1+TPHCM',
    region: 'TP.HCM',
    isMain: true
  },
  {
    id: 8,
    name: 'Chi nhánh Hà Nội (Hội sở chính VietinBank)',
    address: 'Số 108 Trần Hưng Đạo, Phường Cửa Nam, Quận Hoàn Kiếm, TP. Hà Nội',
    phone: '024.39421030',
    imageUrl: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Anh-CN/CN-3/Hoi-so.jpg',
    mapUrl: 'https://maps.google.com/?q=VietinBank+108+Tran+Hung+Dao+Ha+Noi',
    region: 'Hà Nội',
    isMain: true
  }
];
