import { Article, Category } from "./types";

export const BLOG_NAME = "Tinhocvanphong247";

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: '10 Phím tắt Excel "thần thánh" dân văn phòng phải biết',
    slug: "10-phim-tat-excel-than-thanh",
    excerpt:
      "Tăng tốc độ làm việc của bạn lên gấp đôi với những phím tắt Excel cực kỳ hữu ích này. Từ tính tổng nhanh đến lọc dữ liệu...",
    category: Category.EXCEL,
    author: "Nguyễn Văn A",
    date: "2023-10-15",
    imageUrl: "https://picsum.photos/800/400?random=1",
    readTime: "5 phút",
    content: `
# 10 Phím tắt Excel "thần thánh"

Excel là công cụ không thể thiếu, và phím tắt là chìa khóa để làm chủ nó. Dưới đây là danh sách 10 phím tắt bạn cần thuộc lòng:

1. **Alt + =**: Tự động tính tổng (AutoSum). Đặt ô chuột dưới cột số liệu và nhấn tổ hợp này.
2. **Ctrl + Shift + L**: Bật/tắt bộ lọc (Filter). Rất tiện khi xử lý bảng dữ liệu lớn.
3. **Ctrl + ;**: Chèn ngày hiện tại.
4. **Ctrl + Shift + :**: Chèn giờ hiện tại.
5. **F4**: Lặp lại thao tác vừa làm hoặc cố định tham chiếu ô (tuyệt đối/tương đối) trong công thức.

### Tại sao nên dùng phím tắt?
Sử dụng phím tắt giúp bạn tiết kiệm thời gian di chuyển chuột, giữ tay trên bàn phím và duy trì sự tập trung.

> "Người thành thạo Excel không phải là người biết mọi hàm, mà là người biết cách kết hợp chúng nhanh nhất."
    `,
  },
  {
    id: "2",
    title: "Cách tạo Mục lục tự động trong Word chỉ với 3 bước",
    slug: "tao-muc-luc-tu-dong-word",
    excerpt:
      "Đừng làm mục lục thủ công nữa! Hướng dẫn chi tiết cách tạo mục lục tự động cập nhật số trang chuẩn chỉnh chuyên nghiệp.",
    category: Category.WORD,
    author: "Trần Thị B",
    date: "2023-10-18",
    imageUrl: "https://picsum.photos/800/400?random=2",
    readTime: "4 phút",
    content: `
# Tạo mục lục tự động trong Word

Làm báo cáo hay luận văn mà gõ mục lục bằng tay là một sai lầm lớn. Hãy làm theo 3 bước sau:

### Bước 1: Gán Heading
Bôi đen các tiêu đề chương/mục và chọn Style **Heading 1**, **Heading 2**, **Heading 3** trên thanh công cụ Home.

### Bước 2: Chèn mục lục
Đặt con trỏ chuột vào trang bạn muốn chèn mục lục (thường là trang đầu hoặc cuối).
Vào tab **References** -> **Table of Contents** -> Chọn mẫu mục lục bạn thích.

### Bước 3: Cập nhật mục lục
Khi nội dung thay đổi, chỉ cần chuột phải vào mục lục -> **Update Field** -> **Update entire table**.

Đơn giản vậy thôi!
    `,
  },
  {
    id: "3",
    title: "Hàm VLOOKUP và HLOOKUP: Khi nào dùng cái nào?",
    slug: "phan-biet-vlookup-hlookup",
    excerpt:
      "Hai hàm dò tìm kinh điển trong Excel. Bài viết này sẽ giúp bạn hiểu rõ bản chất và không bao giờ nhầm lẫn giữa chúng nữa.",
    category: Category.EXCEL,
    author: "Lê Văn C",
    date: "2023-10-20",
    imageUrl: "https://picsum.photos/800/400?random=3",
    readTime: "6 phút",
    content: `
# Phân biệt VLOOKUP và HLOOKUP

Cả hai đều là hàm dò tìm, nhưng hướng dò tìm khác nhau:

- **VLOOKUP (Vertical Lookup)**: Dò tìm theo **cột** (dọc). Dùng khi bảng tham chiếu của bạn có tiêu đề nằm ngang và dữ liệu chạy dọc xuống.
- **HLOOKUP (Horizontal Lookup)**: Dò tìm theo **hàng** (ngang). Dùng khi bảng tham chiếu có tiêu đề nằm dọc và dữ liệu chạy ngang sang phải.

### Cú pháp cơ bản
\`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\`

Trong đó:
- \`lookup_value\`: Giá trị cần tìm.
- \`table_array\`: Bảng dữ liệu tìm kiếm.
- \`col_index_num\`: Số thứ tự cột chứa kết quả trả về.
- \`[range_lookup]\`: 0 là tìm chính xác, 1 là tìm tương đối.
    `,
  },
  {
    id: "4",
    title: "5 Mẹo thiết kế Slide PowerPoint đẹp như Designer",
    slug: "meo-thiet-ke-slide-dep",
    excerpt:
      "Không cần khiếu thẩm mỹ cao siêu, chỉ cần tuân thủ 5 nguyên tắc này, slide của bạn sẽ trở nên chuyên nghiệp và thu hút ngay lập tức.",
    category: Category.POWERPOINT,
    author: "Phạm D",
    date: "2023-10-22",
    imageUrl: "https://picsum.photos/800/400?random=4",
    readTime: "7 phút",
    content: `
# Thiết kế Slide đẹp không khó

1. **Nguyên tắc 6x6**: Không quá 6 dòng chữ trên 1 slide, mỗi dòng không quá 6 từ.
2. **Sử dụng hình ảnh chất lượng cao**: Tránh ảnh vỡ hạt, có watermark. Dùng Unsplash hoặc Pexels.
3. **Phối màu tương phản**: Nền tối chữ sáng hoặc ngược lại. Đừng dùng quá 3 màu chủ đạo.
4. **Khoảng trắng (White space)**: Đừng cố nhồi nhét. Để khoảng trống cho mắt người xem "thở".
5. **Đồng bộ font chữ**: Chỉ dùng tối đa 2 font chữ (1 cho tiêu đề, 1 cho nội dung) xuyên suốt bài thuyết trình.
    `,
  },
  {
    id: "5",
    title: "Bảo mật file Excel bằng mật khẩu",
    slug: "bao-mat-excel",
    excerpt:
      "Dữ liệu lương thưởng, nhân sự cần được bảo mật? Xem ngay cách đặt mật khẩu cho file Excel để người lạ không thể mở được.",
    category: Category.EXCEL,
    author: "Admin",
    date: "2023-10-25",
    imageUrl: "https://picsum.photos/800/400?random=5",
    readTime: "3 phút",
    content: `
# Cách đặt mật khẩu cho file Excel

Để bảo vệ file Excel quan trọng:

1. Mở file Excel cần khóa.
2. Vào **File** -> **Info**.
3. Chọn **Protect Workbook** -> **Encrypt with Password**.
4. Nhập mật khẩu của bạn và xác nhận lại.

**Lưu ý:** Nếu quên mật khẩu, bạn gần như không thể khôi phục lại file, hãy ghi nhớ nó cẩn thận!
    `,
  },
  {
    id: "6",
    title: "Sử dụng Mail Merge để gửi email hàng loạt",
    slug: "mail-merge-word",
    excerpt:
      "Gửi 1000 email mời họp chỉ trong 5 phút với tính năng Mail Merge kết hợp giữa Word và Excel.",
    category: Category.WORD,
    author: "Admin",
    date: "2023-10-26",
    imageUrl: "https://picsum.photos/800/400?random=6",
    readTime: "8 phút",
    content: `
# Mail Merge (Trộn thư) là gì?

Mail Merge giúp bạn tạo ra hàng loạt văn bản giống nhau nhưng khác nhau ở các trường thông tin cụ thể (như Tên, Địa chỉ, Số tiền...).

### Quy trình cơ bản:
1. Chuẩn bị file Excel chứa danh sách người nhận (Cột: Họ tên, Email...).
2. Soạn thảo mẫu thư trong Word.
3. Vào tab **Mailings** -> **Start Mail Merge**.
4. Chọn **Select Recipients** -> **Use an Existing List** -> Chọn file Excel ở bước 1.
5. Chèn các trường dữ liệu vào vị trí thích hợp bằng **Insert Merge Field**.
6. Chọn **Finish & Merge** để xuất ra file hoặc gửi email trực tiếp.
    `,
  },
];
