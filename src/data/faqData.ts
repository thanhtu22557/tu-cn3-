import { FaqItem } from '../types';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'quen-mat-khau',
    title: 'Hướng dẫn quên mật khẩu VietinBank iPay',
    description: 'Khôi phục và đặt lại mật khẩu ứng dụng iPay nhanh chóng ngay trên điện thoại di động.',
    videoUrl: 'https://www.youtube.com/watch?v=86r0pxPOzbs',
    steps: [
      {
        step: 1,
        text: 'Ở màn hình đăng nhập, chọn "Quên mật khẩu".',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/1.1.png'
      },
      {
        step: 2,
        text: 'Nhập tên đăng nhập và số điện thoại đã đăng ký dịch vụ, sau đó bấm "Tiếp tục".',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/1.2.png'
      },
      {
        step: 3,
        text: 'Nhập mã OTP được gửi về số điện thoại qua tin nhắn SMS, sau đó bấm "Tiếp tục".',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/1.3.png'
      },
      {
        step: 4,
        text: 'Xác thực khuôn mặt theo yêu cầu trên màn hình. Sau khi hoàn thành, iPay sẽ gửi mật khẩu mới về tin nhắn (SMS). Bấm "Đăng nhập iPay" để tiếp tục.',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/1.4.png'
      },
      {
        step: 5,
        text: 'Nhập mật khẩu theo yêu cầu: Mật khẩu hiện tại (nhập mật khẩu gửi qua tin nhắn SMS) - Mật khẩu mới (mật khẩu quý khách muốn thiết lập). Sau đó bấm "Tiếp tục".',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/1.5.png'
      },
      {
        step: 6,
        text: 'Thực hiện quét khuôn mặt để xác nhận đổi mật khẩu thành công và bắt đầu sử dụng ứng dụng.',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/1.6.png'
      }
    ]
  },
  {
    id: 'dong-the',
    title: 'Hướng dẫn đóng thẻ ATM / Thẻ tín dụng',
    description: 'Thao tác chủ động đóng hoặc khóa thẻ ngân hàng VietinBank an toàn, bảo mật trên ứng dụng.',
    videoUrl: 'https://www.youtube.com/watch?v=acdT3KxET40',
    steps: [
      {
        step: 1,
        text: 'Đăng nhập vào App VietinBank iPay bằng tài khoản của Quý khách.',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/2.1.png'
      },
      {
        step: 2,
        text: 'Tại màn hình chính, vào mục "Danh sách thẻ".',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/2.2.png'
      },
      {
        step: 3,
        text: 'Xem và chọn đúng thẻ cần đóng, bấm vào phần "Xem thêm".',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/2.3.png'
      },
      {
        step: 4,
        text: 'Chọn chức năng "Đóng thẻ" trong danh mục dịch vụ thẻ.',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/2.4.png'
      },
      {
        step: 5,
        text: 'Kiểm tra thông tin chi tiết và nhập mã xác thực OTP.',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/2.5.png'
      },
      {
        step: 6,
        text: 'Xác nhận OTP để hoàn tất đóng thẻ thành công.',
        image: 'https://raw.githubusercontent.com/thanhtu22557/tu-cn3nm/main/2.6.png'
      }
    ]
  },
  {
    id: 'sinh-trac-hoc',
    title: 'Xác thực CCCD gắn chip & Cập nhật sinh trắc học',
    description: 'Cập nhật dữ liệu sinh trắc học khuôn mặt và CCCD gắn chip qua công nghệ NFC theo quy định QĐ 2345/QĐ-NHNN.',
    videoUrl: 'https://www.youtube.com/watch?v=9yYn3SbMT9A',
    steps: [
      {
        step: 1,
        text: 'Đăng nhập ứng dụng VietinBank iPay và chọn "Cập nhật sinh trắc học".',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.1.png'
      },
      {
        step: 2,
        text: 'Kiểm tra lưu ý về thiết bị NFC và click vào nút "Bắt đầu chụp".',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.2.png'
      },
      {
        step: 3,
        text: 'Chụp ảnh mặt trước của Căn cước công dân (CCCD) gắn chip rõ nét, không bị lóa sáng.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.3.png'
      },
      {
        step: 4,
        text: 'Chụp ảnh mặt sau của Căn cước công dân (CCCD) gắn chip.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.4.png'
      },
      {
        step: 5,
        text: 'Xem hướng dẫn quét chip NFC và click vào nút "Đã hiểu".',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.5.png'
      },
      {
        step: 6,
        text: 'Đưa gương mặt vào khung hình để hệ thống đối chiếu sinh trắc học AI.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.6.png'
      },
      {
        step: 7,
        text: 'Đặt mặt trước CCCD áp sát ngay mặt sau điện thoại (vùng anten NFC) và giữ yên để đọc dữ liệu chip.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.7.png'
      },
      {
        step: 8,
        text: 'Kiểm tra toàn bộ thông tin xác thực vừa đọc được và bấm "Tiếp tục" để hoàn tất.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.8.png'
      }
    ]
  },
  {
    id: 'nop-thue',
    title: 'Hướng dẫn nộp thuế điện tử trên VietinBank iPay',
    description: 'Nộp thuế cá nhân, thuế đất, trước bạ hoặc hộ kinh doanh online nhanh chóng, chính xác.',
    videoUrl: 'https://www.youtube.com/watch?v=ASKGDLi1tGE',
    steps: [
      { step: 1, text: 'Đăng nhập ứng dụng VietinBank iPay.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.1.png' },
      { step: 2, text: 'Chọn [Tất cả dịch vụ] trên giao diện chính.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.2.jpg' },
      { step: 3, text: 'Tại màn hình Tất cả dịch vụ, chọn mục [Dịch vụ thanh toán].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.3.jpg' },
      { step: 4, text: 'Chọn tiện ích [Nộp thuế điện tử].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.4.jpg' },
      { step: 5, text: 'Chọn tiếp chức năng [Nộp thuế].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.5.jpg' },
      { step: 6, text: 'Tại màn hình Thuế nội địa, mở danh sách lựa chọn [Hình thức nộp thuế].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.6.jpg' },
      { step: 7, text: 'Chọn [Tự kê khai] để nộp cho chính mình hoặc chọn [Nộp cho người khác]. Trường hợp chọn Truy vấn bằng Mã số thuế chính là số căn cước công dân.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.7.jpg' },
      { step: 8, text: 'Nhấn button [Truy vấn] để hệ thống kết nối với Tổng cục Thuế.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.8.jpg' },
      { step: 9, text: 'Màn hình hiển thị thông tin người nộp thuế và danh sách các khoản chưa nộp. Khách hàng chọn: 1. Tài khoản nguồn; 2. Thông tin người nộp thuế, người nộp thay.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.9.jpg' },
      { step: 10, text: 'Kiểm tra kỹ lưỡng [Danh sách các khoản chưa nộp].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.10.jpg' },
      { step: 11, text: 'Kiểm tra [Thông tin người nộp thuế] để đảm bảo chính xác.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.11.jpg' },
      { step: 12, text: 'Kiểm tra [Số tiền thuế] và [Các thông tin liên quan đến món thuế cần nộp].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.12.jpg' },
      { step: 13, text: 'Kiểm tra lại toàn bộ thông tin và nhấn button [Nộp thuế].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.13.jpg' },
      { step: 14, text: 'Nhập OTP SMS hoặc Soft OTP để xác thực giao dịch.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.14.jpg' },
      { step: 15, text: 'Chọn [Xác nhận & Hoàn tất].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.15.jpg' },
      { step: 16, text: 'Nhận chứng từ nộp NSNN thành công. Quý khách có thể chọn tab [Lịch sử nộp thuế] để tra cứu bất cứ khi nào.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.16.jpg' },
      { step: 17, text: 'Chọn khoảng thời gian truy vấn >> Nhấn chọn [Áp dụng].', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.17.jpg' },
      { step: 18, text: 'Chọn [Chi tiết] để xem toàn bộ thông tin, trạng thái của món thuế.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.18.jpg' },
      { step: 19, text: 'Chọn button [Nhận chứng từ qua Email], Quý khách có thể thay đổi Email nhận chứng từ.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.19.jpg' },
      { step: 20, text: 'Truy cập Email đã đăng ký để nhận Giấy nộp tiền vào Ngân sách Nhà nước (NSNN) có dấu xác nhận điện tử.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.20.jpg' }
    ]
  },
  {
    id: 'dat-lich',
    title: 'Hướng dẫn đặt lịch hẹn giao dịch qua VietinBank iPay',
    description: 'Chủ động chọn giờ, chọn phòng giao dịch gần nhất để được phục vụ ưu tiên, không mất thời gian chờ đợi.',
    steps: [
      { step: 1, text: 'Truy cập ứng dụng VietinBank iPay và click vào thanh tìm kiếm.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.1.jpg' },
      { step: 2, text: 'Gõ từ khóa "đặt lịch".', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.2.jpg' },
      { step: 3, text: 'Chọn "Thêm mới lịch hẹn".', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.3.jpg' },
      { step: 4, text: 'Click vào tab "Thông tin đặt lịch".', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.4.jpg' },
      { step: 5, text: 'Chọn "Loại dịch vụ" Quý khách muốn thực hiện.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.5.jpg' },
      { step: 6, text: 'Chọn "Phòng giao dịch" và lựa chọn chi nhánh / PGD gần bạn nhất.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.6.jpg' },
      { step: 7, text: 'Chọn giờ và ngày giao dịch mong muốn.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.7.jpg' },
      { step: 8, text: 'Nhìn lại ngày và giờ và điều chỉnh phù hợp lịch trình cá nhân.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.8.jpg' },
      { step: 9, text: 'Chốt ngày và giờ đặt lịch, sau đó click "Xác nhận đặt lịch".', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.9.jpg' },
      { step: 10, text: 'Lưu ảnh ngày đặt lịch hoặc mã QR để quét nhận số ưu tiên khi đến quầy giao dịch.', image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.10.jpg' }
    ]
  }
];

export const CONSULTANT_INFO = {
  name: 'Trần Hoàng Trung',
  phone: '0973.874.232',
  phoneDisplay: '0973 874 232',
  role: 'Chuyên viên tư vấn khách hàng VietinBank',
  branch: 'Chi nhánh 3 - TP. Hồ Chí Minh'
};
