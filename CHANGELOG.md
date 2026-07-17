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
- **15/07/2026**: Nâng cấp giao diện Home Screen và triển khai nền tảng Movie Detail.
  - Hoàn thiện giao diện: Thiết kế lại `HomeScreen` theo phong cách ứng dụng xem phim với giao diện tối, bổ sung `Header`, `SearchBar`, `HeroBanner`, `SectionHeader` và tối ưu bố cục hiển thị.
  - Xây dựng Component: Tạo `HeroBanner.tsx` để hiển thị bộ phim nổi bật đầu trang và `HorizontalMovieList.tsx` để tái sử dụng cho các danh sách phim cuộn ngang.
  - Mở rộng API: Bổ sung các hàm `getTrendingMovies()`, `getTopRatedMovies()` và `getMovieDetail()` trong `services/api.ts`, đồng thời mở rộng interface `Movie` và `MovieDetail` để hỗ trợ đầy đủ dữ liệu từ TMDB.
  - Hoàn thiện danh sách phim: Tích hợp ba nhóm dữ liệu gồm `Trending Movies`, `Top Rated Movies` và `Popular Movies`, kết hợp `FlatList` cùng các danh sách cuộn ngang nhằm tạo giao diện tương tự các ứng dụng xem phim phổ biến.
  - Nâng cấp `MovieCard`: Bổ sung hiển thị điểm đánh giá, năm phát hành và cấu hình điều hướng bằng `Expo Router` để chuyển sang màn hình chi tiết phim thông qua `router.push()` và Dynamic Route (`/movie/[id]`).
  - Khắc phục lỗi tích hợp: Xử lý lỗi import API, lỗi thiếu thuộc tính `id`, cập nhật Typed Routes của Expo Router và sửa các lỗi TypeScript phát sinh khi đồng bộ giữa `MovieCard`, `HorizontalMovieList` và `HomeScreen`.
  - Chuẩn bị Movie Detail: Khởi tạo cấu trúc `app/movie/[id].tsx`, xây dựng API lấy thông tin chi tiết phim và sẵn sàng triển khai giao diện hiển thị poster, backdrop, đánh giá, thời lượng và nội dung mô tả của từng bộ phim.
- **15/07/2026**: Hoàn thiện Movie Detail Screen, mở rộng API và tối ưu kiến trúc Component.
  - Hoàn thiện giao diện: Xây dựng `MovieDetailScreen` hiển thị đầy đủ thông tin phim gồm `Backdrop`, tên phim, điểm đánh giá, năm phát hành, thời lượng, thể loại và `Overview`, đồng thời bổ sung nút quay lại (`Back Button`) và nút yêu thích (`Favorite`) bằng `Ionicons`.
  - Mở rộng API: Bổ sung các hàm `getMovieVideos()`, `getMovieCredits()` và `getSimilarMovies()` trong `services/api.ts`, đồng thời xây dựng các interface `MovieVideo`, `CastMember` và `SimilarMovie` để chuẩn hóa dữ liệu trả về từ TMDB.
  - Phát triển tính năng Trailer: Tích hợp chức năng `Watch Trailer`, lấy danh sách video từ TMDB, lọc trailer chính thức trên YouTube và mở bằng `Linking.openURL()`.
  - Tái cấu trúc Component: Tách riêng `CastList.tsx` và `SimilarMovies.tsx` thành các Component độc lập, giúp giảm độ phức tạp của `MovieDetailScreen`, tăng khả năng tái sử dụng và thuận tiện cho việc bảo trì.
  - Hoàn thiện hiển thị dữ liệu: Tích hợp API `Credits` để hiển thị danh sách diễn viên theo `Horizontal FlatList`, đồng thời tích hợp API `Similar Movies` để hiển thị các bộ phim liên quan và tái sử dụng `MovieCard` cho chức năng điều hướng.
  - Chuẩn hóa TypeScript: Thay thế kiểu dữ liệu `any` bằng interface `MovieVideo`, đồng bộ kiểu dữ liệu giữa `API`, `Component` và `MovieDetailScreen` nhằm tăng tính an toàn của mã nguồn.
  - Khắc phục lỗi tích hợp: Sửa lỗi điều hướng `Expo Router`, lỗi truyền tham số `id`, lỗi hiển thị `Movie not found`, đồng thời xử lý các lỗi TypeScript phát sinh khi đồng bộ giữa `MovieCard`, `MovieGrid`, `SimilarMovies` và `MovieDetailScreen`.
  - Kiểm chứng (Debug): Sử dụng `console.log()` để kiểm tra giá trị `id`, dữ liệu trả về từ các API `Movie Detail`, `Credits` và `Similar Movies`, qua đó xác định và khắc phục các lỗi phát sinh trong quá trình tích hợp.
- **18/07/2026**: Hoàn thiện các chức năng tìm kiếm, yêu thích, phân trang và tối ưu trải nghiệm sử dụng trên Movie App.
  - Hoàn thiện `Similar Movies`: Bổ sung interface `SimilarMovie`, xây dựng hàm `getSimilarMovies()` trong `services/api.ts` và hoàn thiện component `SimilarMovies.tsx` để hiển thị danh sách phim tương tự dưới dạng cuộn ngang. Cho phép người dùng nhấn vào từng phim để tiếp tục mở `Movie Detail`.
  - Hoàn thiện chức năng yêu thích: Cài đặt `@react-native-async-storage/async-storage`, tạo `services/favorites.ts` và xây dựng các hàm `getFavoriteMovies()`, `isMovieFavorite()` và `toggleFavoriteMovie()` để lưu trạng thái yêu thích trên thiết bị.
  - Nâng cấp `Movie Detail`: Kết nối nút trái tim với `AsyncStorage`, kiểm tra trạng thái yêu thích khi mở phim và cho phép thêm hoặc xóa phim khỏi danh sách yêu thích. Trạng thái vẫn được giữ sau khi đóng và mở lại ứng dụng.
  - Xây dựng tab `Favorites`: Tạo màn hình `app/(tabs)/favorites.tsx`, bổ sung tab `Favorites` vào Bottom Tab Navigation và hiển thị danh sách phim đã lưu bằng `FlatList`. Sử dụng `useFocusEffect()` để tự động cập nhật dữ liệu mỗi khi người dùng quay lại tab.
  - Hoàn thiện tìm kiếm trong `Explore`: Bổ sung hàm `searchMovies()` sử dụng endpoint `/search/movie`, xây dựng giao diện tìm kiếm phim theo tên và xử lý các trạng thái `Loading`, chưa tìm kiếm, không tìm thấy kết quả và hiển thị danh sách kết quả dạng lưới.
  - Kết nối tìm kiếm từ `Home` sang `Explore`: Cập nhật `SearchBar` trên `HomeScreen`, truyền từ khóa bằng `router.push()` và nhận dữ liệu bằng `useLocalSearchParams()` để tự động tìm kiếm khi chuyển sang tab `Explore`.
  - Khắc phục lỗi `SearchBar` trên Android: Xử lý tình trạng ký tự tự động bị xóa khi nhập bằng cách đưa `Header` và `SearchBar` ra ngoài `ListHeaderComponent` của `FlatList`, giúp `TextInput` không bị render lại liên tục.
  - Hoàn thiện ảnh thay thế trong `Movie Detail`: Kiểm tra `backdrop_path`, sử dụng `poster_path` làm ảnh thay thế khi phim không có backdrop và hiển thị giao diện mặc định khi phim không có cả hai loại ảnh.
  - Bổ sung `Pull to Refresh`: Tích hợp `RefreshControl` vào `HomeScreen`, cho phép kéo xuống để tải lại `Popular Movies`, `Trending Movies` và `Top Rated Movies`. Bổ sung thời gian cập nhật gần nhất để nhận biết quá trình tải lại đã hoàn tất.
  - Triển khai `Infinite Scroll` cho `Popular Movies`: Cập nhật `getPopularMovies()` để nhận tham số `page`, sử dụng `onEndReached` để tự động tải trang tiếp theo và nối dữ liệu mới vào danh sách hiện tại. Bổ sung kiểm tra trùng `id`, trạng thái `loadingMore` và giới hạn tải khi không còn dữ liệu.
  - Tối ưu quá trình tải thêm phim: Điều chỉnh cách tải và render danh sách để tốc độ tải trang tiếp theo nhanh và ổn định hơn, đồng thời kiểm tra cảnh báo hiệu năng của `VirtualizedList`.
  - Cải thiện giao diện `Home`: Bổ sung nút cuộn lên đầu danh sách khi người dùng đã kéo xuống sâu, giúp quay lại phần đầu trang nhanh hơn. Loại bỏ nút `See All` khỏi các tiêu đề `Trending Movies` và `Top Rated Movies` vì chưa có màn hình danh sách riêng.
  - Hoàn thiện phân trang tìm kiếm: Thay đổi dữ liệu trả về của `searchMovies()` gồm `results`, `page` và `total_pages`. Khi kéo xuống cuối kết quả, ứng dụng tự động tải trang tiếp theo, loại bỏ phim trùng và nối vào danh sách hiện tại.
  - Hiển thị thông tin trang tìm kiếm: Bổ sung số lượng phim đã tải và trạng thái trang hiện tại theo định dạng như `73 results for “Avengers”` và `Page 4/4`. Đưa phần thông tin này ra ngoài `FlatList` để luôn cố định bên dưới ô tìm kiếm khi người dùng cuộn danh sách.
  - Sửa lỗi tìm kiếm nhiều lần: Tách logic thành `performSearch()` và `handleSearch()`, sử dụng `useCallback()` và `useRef()` để tránh từ khóa từ `Home` liên tục ghi đè lên nội dung đang nhập trong `Explore`. Người dùng hiện có thể xóa, chỉnh sửa và tìm kiếm từ khóa mới bình thường.
  - Dọn dẹp mã nguồn: Xóa các `console.log()` debug như `Navigate to`, log của `SectionHeader` và log lỗi ảnh không cần thiết. Giữ nguyên kiểu trả về của `formatPosterUrl()` để tránh phát sinh lỗi TypeScript trong `(tabs)`, `SimilarMovies` và `[id].tsx`.
  - Quản lý phiên bản bằng Git: Tạo các mốc lưu cho `Similar Movies`, chức năng `Favorites`, tab `Favorites`, tìm kiếm `Explore`, sửa lỗi `SearchBar` trên Android, `Pull to Refresh`, `Infinite Scroll` và phân trang tìm kiếm nhằm đảm bảo có thể khôi phục project về từng trạng thái ổn định.
