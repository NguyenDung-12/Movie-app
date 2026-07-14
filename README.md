# 🎬 Movie App Project

Dự án ứng dụng xem thông tin phim, xây dựng trên nền tảng React Native (Expo).

## 🛠 1. Môi trường cài đặt (Prerequisites)

Để dự án này hoạt động, bạn cần cài đặt các công cụ sau trên máy tính:

- **Node.js**: Phiên bản LTS (Long Term Support).
- **Git**: Để quản lý phiên bản code.
  - **Khởi tạo Git**: `git init`
  - **Liên kết với GitHub**: `git remote add origin <link-repo>`
  - **Đặt nhánh chính**: `git branch -M main`
  - **Cập nhật lên Git**:
    ```bash
    git remote add origin "......link"
    git branch -M main
    git add .
    git commit -m "feat: mô tả thay đổi"
    git push -u origin main
    git push -u origin main --force ép buộc push <dangerous>
    ```
- **VS Code**: Trình soạn thảo mã nguồn.
- **Expo Go**: Cài đặt trên điện thoại để xem ứng dụng thời gian thực.

## 🚀 2. Cách khởi chạy dự án

Để chạy ứng dụng trên máy của bạn, hãy thực hiện các bước sau trong Terminal:

1. **Clone dự án**: `git clone <link-repo>`
2. **Di chuyển vào thư mục**: `cd movie-app`
3. **Cài đặt thư viện**: `npm install`
4. **Khởi chạy**: `npx expo start`

## 📝 3. Nhật ký phát triển (Project Logs)

- **10/07/2026**: Khởi tạo dự án `movie-app` với Expo SDK 57. Cấu hình ESLint và Prettier.

- **11/07/2026**: Xây dựng cấu trúc MovieCard và xử lý lỗi môi trường.
  - Tạo `src/components/MovieCard.tsx` và cấu hình `src/app/index.tsx`.
  - Khắc phục lỗi xung đột phiên bản React (`19.2.7` vs `19.2.3`).

- **11/07/2026**: Kiểm chứng và xử lý lỗi hiển thị Component.
  - Xác định vấn đề CORS khi lấy ảnh TMDB trên trình duyệt.
  - Quyết định: Nâng cấp thư viện `Image` và dùng `FlatList`.

- **11/07/2026**: Nâng cấp thư viện hình ảnh và chuẩn hóa giao diện.
  - Tích hợp `expo-image` thay thế `react-native` Image.
  - Hiệu chỉnh `contentFit`, `transition`.

- **11/07/2026**: Thêm tính năng tương tác cho `MovieCard`.
  - Bọc `TouchableOpacity` và thêm hàm `handleCardPress`.

- **11/07/2026**: Chuyển đổi sang danh sách động với `FlatList`.
  - Tối ưu hiệu năng, thiết lập `numColumns={2}` dàn trang dạng lưới.

- **11/07/2026**: Tái cấu trúc (Refactor) code.
  - Tách danh sách phim vào `src/data/movies.ts`.
  - Cập nhật `HomeScreen` import dữ liệu module ngoài.

- **12/07/2026**:
  - Hạ tầng API: Hoàn thiện `api.js` sử dụng `axios`.
  - \*\*Giao diện danh sách: Triển khai `index.tsx` với `FlatList`.
  - Xử lý trạng thái: Tích hợp loading (spinner) và xử lý lỗi (error handling).
  - Tích hợp TMDB: Kết nối API thực từ TMDB, hiển thị poster động.

- **13/07/2026**: Hoàn thiện cấu trúc UI, Navigation và xử lý lỗi tích hợp Component.
  - Sửa lỗi hệ thống: Giải quyết triệt để lỗi Element type is invalid: got: object trong `HomeScreen` bằng cách chuẩn hóa toàn bộ các tệp `component` sang export default và loại bỏ các dấu ngoặc nhọn {} không cần thiết khi import.
  - Tái cấu trúc file: Tách biệt `SearchBar.tsx` và `SectionHeader.tsx` thành các tệp tin độc lập, khắc phục xung đột xuất khẩu (export) và lỗi cú pháp khi gộp chung tệp.
  - Tối ưu giao diện: Đưa toàn bộ các thành phần `Header, SearchBar, và SectionHeader vào ListHeaderComponent` của FlatList để đảm bảo tính đồng bộ khi cuộn trang và tránh lỗi lồng ghép view.
  - Hoàn thiện Navigation: Cấu hình `_layout.tsx` trong thư mục (tabs) để khởi tạo thanh điều hướng `(Bottom Tabs) với hai tab "Home" và "Explore"`, sử dụng @expo/vector-icons và thiết lập màu sắc đồng bộ với giao diện tối của ứng dụng.
  - Kiểm chứng (Debug): Sử dụng kỹ thuật loại trừ `(comment code) và in log (console.log)` để xác định chính xác vị trí lỗi trong quy trình render của `HomeScreen`.
