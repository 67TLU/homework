# 🌿 CampusMind — Student Wellbeing Hub
> **Website Showcase · BTL-02 · CSE122**  
> *“Từ ngữ cảnh, đến sản phẩm — Từng phần của web, thành một slide.”*

CampusMind là nền tảng điều phối hỗ trợ sức khỏe tinh thần toàn diện dành cho sinh viên đại học. Dự án hiện thực hóa trọn vẹn 16 slide trình chiếu của đồ án BTL-02, hỗ trợ 4 vai trò người dùng, 17 màn hình tương tác, 3 trải nghiệm AI có giải thích (Explainable AI), và đáp ứng chuẩn thiết kế Design System 8 tokens.

---

## 🎯 Bảng Đối Chiếu 16 Slide & Các Màn Hình Ứng Dụng

| Slide | Tên Màn Hình / Phân Hệ | Đường Dẫn Mô Phỏng | Chức Năng Chính & Đặc Điểm |
| :--- | :--- | :--- | :--- |
| **01** | **Giới thiệu & Tổng quan** | Modal Slide Deck | Thống kê: 4 vai trò, 17 màn hình, 3 AI, 3 breakpoint, Design System. |
| **02** | **Hero & Điều hướng** | `https://campusmind.edu.vn/` | Header sticky, lời hứa sản phẩm, thanh tìm kiếm nhanh có gợi ý, 4 lối vào dịch vụ trong 3 giây. |
| **03** | **Danh mục Dịch vụ** | `/services` | Lưới thẻ 12 dịch vụ, chip lọc danh mục, sắp xếp, card AI Navigator khởi động khảo sát. |
| **04** | **Thư viện Self-help & AI-2** | `/resources` | 48 nội dung theo chủ đề, lưu bookmark, **AI-2 Resource Recommender** có lý giải minh bạch (*Vì sao có kết quả này?*). |
| **05** | **Hồ sơ Chuyên viên** | `/counselors/nguyen-minh-ha` | TS. Nguyễn Minh Hà (9 năm KN), đánh giá 4.9, quote, lưới khung giờ trống theo tuần với 4 trạng thái màu. |
| **06** | **Bảng điều khiển Sinh viên & AI-1** | `/student/dashboard` | Lê Ngọc An (K64), 4 thẻ KPI, tiến trình 4/6 buổi, biểu đồ năng lượng, **AI-1 Support Navigator** phân loại nhu cầu không chẩn đoán. |
| **07** | **Luồng Đặt lịch 4 Bước** | `/student/booking` | Wizard 4 bước: Dịch vụ → Khung giờ → Thông tin → Xác nhận; kiểm tra email hợp lệ tại chỗ, gợi ý chuẩn bị AI-2. |
| **08** | **Quản lý Lịch hẹn & Drawer** | `/student/appointments` | Bảng 18 lịch hẹn, bộ lọc trạng thái, drawer chi tiết, chính sách an toàn không xóa vật lý (chỉ lưu trữ). |
| **09** | **Lịch tuần & Hàng đợi Chuyên viên** | `/counselor/schedule` | Lưới lịch trực tuần, 4 KPI, phân bố chủ đề tháng 6, duyệt hoặc từ chối yêu cầu chờ duyệt tức thì. |
| **10** | **Ghi chú Buổi tư vấn & AI-3** | `/counselor/session-note/APT-1042` | APT-1042, bộ đếm ký tự, tự động lưu, **AI-3 Counselor Summary Assistant** tóm tắt 3 câu & 3 hành động, có nút thử nghiệm trạng thái lỗi. |
| **11** | **Bảng điều phối Quản trị** | `/admin/dashboard` | KPI hệ thống (284 lịch hẹn, 1.240 tài khoản), biểu đồ xu hướng tuần 1-8 (+12.4%), tỷ lệ theo vai trò, nhật ký hoạt động. |
| **12** | **CRUD Dịch vụ & Người dùng** | `/admin/services` | Thêm / sửa / bật-tắt toggle / lưu trữ dịch vụ, hành động hàng loạt, modal xác nhận bảo vệ thao tác nhạy cảm. |
| **13** | **Xác thực & Trạng thái lỗi** | `/login`, `/404`, `/403` | Form đăng nhập kiểm tra lỗi inline, trang 404 Không tìm thấy trang, trang 403 Không có quyền truy cập. |
| **14** | **Responsive 3 Breakpoints** | Top Bar Simulator | Giả lập Desktop (1440px 12 cột), Tablet (768px 6 cột), Mobile (390px 4 cột vùng chạm ≥ 44px). |
| **15** | **Design System 8 Tokens** | `/design-system` | Thư viện 8 tokens màu, font Fraunces + Be Vietnam Pro, nguyên tắc chấm tròn + chữ cho mọi trạng thái. |
| **16** | **Tổng kết Đồ án** | Modal Slide Deck | BTL-02 · CSE122 · Nhóm 3 sinh viên. |

---

## 🤖 3 Trải Nghiệm AI Có Giải Thích (Explainable AI)

1. **AI-1 Support Navigator (Sinh viên - Slide 06)**:
   - Phân loại nhu cầu sơ bộ qua bộ 4 câu hỏi định hướng.
   - Tuyệt đối tuân thủ nguyên tắc đạo đức: **chỉ điều hướng, không chẩn đoán bệnh lý y khoa**.
   - Cung cấp nút *Chấp nhận gợi ý*, *Sửa*, *Tạo lại*, *Từ chối*.
2. **AI-2 Resource Recommender (Thư viện & Đặt lịch - Slide 04 & 07)**:
   - Gợi ý tài nguyên kèm giải thích minh bạch: *“Dựa trên 2 tài nguyên bạn đã lưu về chủ đề lo âu, thời lượng bạn thường xem (5–8 phút) và mục tiêu 'quản lý căng thẳng' trong hồ sơ của bạn.”*
   - Tích hợp chéo vào luồng đặt lịch: gợi ý bài tập thở 4-7-8 trước buổi hẹn để sinh viên chuẩn bị tốt nhất.
3. **AI-3 Counselor Summary Assistant (Chuyên viên - Slide 10)**:
   - Hỗ trợ chuyên viên tóm tắt diễn biến buổi tư vấn thành 3 câu súc tích và đề xuất 3 hành động tiếp theo có thời hạn.
   - Nguyên tắc **Human-in-the-loop**: Chuyên viên luôn là người đọc, chỉnh sửa và phê duyệt cuối cùng.
   - Cơ chế xử lý trường hợp ngoại lệ (Edge Case): Có switch mô phỏng thông báo lỗi khi nội dung ghi chú quá ngắn.

---

## 🎨 Design System (Slide 15)

- **Thang màu 8 Tokens**:
  - `Sage` (`#2F7A66`): Màu chủ đạo, dịu nhẹ, tạo sự tin cậy.
  - `Sage Deep` (`#1C5344`): Màu nhấn đậm, thanh điều hướng và tiêu đề lớn.
  - `Amber · AI` (`#D79B34`): Nhận diện các tính năng AI thông minh.
  - `Clay · Alert` (`#C4643F`): Cảnh báo, hủy lịch, lỗi nhập liệu.
  - `Ink` (`#16241D`): Chữ hiển thị chính độ tương phản cao.
  - `Paper` (`#F2EEE6`): Nền ấm áp gợi cảm giác trang giấy tự nhiên.
  - `Sage Tint` (`#DCEAE3`): Nền thẻ phụ, badge thông tin mềm mại.
  - `Sky · Info` (`#3B6E92`): Trạng thái thông tin và dịch vụ trực tuyến.
- **Phông chữ**:
  - **Fraunces**: Serif đương đại cho các tiêu đề cảm xúc, ấm áp.
  - **Be Vietnam Pro**: Sans-serif hiện đại cho các thông số vận hành, bảng biểu và nhãn form.
- **Quy tắc Trạng thái Accessibility**:
  - Mọi trạng thái (Hoạt động, Đang chờ, Đã hủy, Đã lưu trữ) **luôn luôn** đi kèm chấm tròn màu (dot) + nhãn chữ (text), không dùng màu sắc làm tín hiệu nhận diện duy nhất.

---

## 🚀 Hướng Dẫn Chạy & Trải Nghiệm Website

### Cách 1: Chạy máy chủ cục bộ bằng Python (Khuyên Dùng)
Mở PowerShell hoặc Command Prompt tại thư mục dự án và chạy:
```powershell
python -m http.server 3000
```
Sau đó mở trình duyệt và truy cập: **`http://localhost:3000`**

### Cách 2: Mở trực tiếp file HTML
Bạn có thể mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Brave) mà không cần cài đặt thêm thư viện hay phần mềm trung gian.

---

## 🧭 Hướng Dẫn Dành Cho Người Chấm Điểm / Giảng Viên

1. **Thanh Toolbar BTL trên cùng**:
   - Bấm nút **"16 Slide Showcase Deck"** để xem danh mục toàn bộ 16 slide và bấm chuyển màn hình ngay tức thì.
   - Sử dụng menu **"Đóng vai"** để chuyển đổi giữa 4 vai trò:
     - 🎓 **Sinh viên**: Khám phá Dashboard, làm quiz AI-1, đặt lịch 4 bước, quản lý lịch hẹn qua Drawer.
     - 🧑‍⚕️ **Chuyên viên**: Xem lịch tuần, phân bố chủ đề, duyệt hàng đợi, viết ghi chú và thử nghiệm AI-3.
     - 🛡️ **Quản trị viên**: Xem KPI toàn trường, biểu đồ xu hướng, thực hiện CRUD dịch vụ.
     - 👤 **Khách**: Xem Landing page Hero, tìm kiếm nhanh dịch vụ, trang đăng nhập inline validation.
   - Thử nghiệm 3 nút **[🖥️ Full] [📱 Tablet] [📲 Mobile]** để kiểm tra tính tương thích Responsive của ứng dụng ngay trên trình duyệt mà không cần mở DevTools F12.

