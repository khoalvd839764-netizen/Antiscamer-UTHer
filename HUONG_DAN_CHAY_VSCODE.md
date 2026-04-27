# 📱 HƯỚNG DẪN CHẠY ANTI SCAMER TRÊN VS CODE

## 🎯 YÊU CẦU HỆ THỐNG

### Phải cài đặt trước:
1. **Node.js** (phiên bản 18 trở lên)
   - Tải tại: https://nodejs.org/
   - Kiểm tra: mở Terminal/CMD gõ `node --version`

2. **pnpm** (package manager)
   - Cài đặt: `npm install -g pnpm`
   - Kiểm tra: `pnpm --version`

3. **Visual Studio Code**
   - Tải tại: https://code.visualstudio.com/

### Extensions nên cài (không bắt buộc nhưng khuyên dùng):
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **Auto Rename Tag**

---

## 🚀 HƯỚNG DẪN CHẠY PROJECT

### BƯỚC 1: Mở project trong VS Code
1. Mở VS Code
2. Chọn **File → Open Folder**
3. Chọn thư mục chứa project này
4. Chờ VS Code load xong

### BƯỚC 2: Mở Terminal trong VS Code
- Cách 1: Nhấn `` Ctrl + ` `` (phím ~ bên dưới ESC)
- Cách 2: Menu **Terminal → New Terminal**
- Cách 3: Menu **View → Terminal**

### BƯỚC 3: Cài đặt dependencies
Trong Terminal, gõ lệnh:
```bash
pnpm install
```
⏳ Chờ khoảng 1-3 phút để cài đặt tất cả packages (tùy tốc độ mạng)

### BƯỚC 4: Chạy Development Server
Sau khi cài xong, gõ lệnh:
```bash
pnpm dev
```

Bạn sẽ thấy output giống như:
```
  VITE v6.3.5  ready in 823 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### BƯỚC 5: Xem ứng dụng trong trình duyệt
1. Mở trình duyệt (Chrome, Edge, Firefox...)
2. Truy cập: **http://localhost:5173**
3. App sẽ hiển thị:
   - **Trên Desktop/Laptop**: Khung iPhone 14 Pro Max đẹp mắt để design
   - **Trên điện thoại thật**: Full screen không bị lỗi lệch

---

## 📱 TEST TRÊN ĐIỆN THOẠI THẬT (CÙNG WIFI)

### Cách 1: Dùng IP Local
1. Trong Terminal VS Code, nhấn `Ctrl + C` để dừng server
2. Chạy lại với option `--host`:
   ```bash
   pnpm dev --host
   ```
3. Lấy IP máy tính:
   - **Windows**: mở CMD gõ `ipconfig` → tìm IPv4 Address
   - **Mac/Linux**: mở Terminal gõ `ifconfig` → tìm inet
   - Ví dụ: `192.168.1.100`

4. Trên điện thoại (cùng WiFi):
   - Mở trình duyệt
   - Truy cập: `http://192.168.1.100:5173`

### Cách 2: Dùng QR Code (nhanh hơn)
1. Cài extension **Live Server** trong VS Code
2. Hoặc dùng tool như ngrok: `npx ngrok http 5173`

---

## ⌨️ CÁC LỆNH THƯỜNG DÙNG

| Lệnh | Mô tả |
|------|-------|
| `pnpm dev` | Chạy development server |
| `pnpm build` | Build production (tạo file tĩnh) |
| `pnpm preview` | Xem bản build sau khi build |
| `Ctrl + C` | Dừng server đang chạy |

---

## 🔧 SỬA CODE VÀ XEM THAY ĐỔI NGAY LẬP TỨC

1. Mở file cần sửa trong VS Code (ví dụ: `src/app/pages/Home.tsx`)
2. Thay đổi code
3. Nhấn `Ctrl + S` để lưu
4. **Trình duyệt tự động reload** (Hot Module Replacement - HMR)
5. Xem thay đổi ngay lập tức!

---

## 📂 CẤU TRÚC PROJECT

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Entry component với Router
│   │   ├── Root.tsx             # Layout chính (iPhone frame/mobile)
│   │   ├── routes.tsx           # Định nghĩa routes
│   │   ├── components/          # Các component dùng chung
│   │   │   ├── ui/              # UI components (buttons, cards...)
│   │   │   └── BottomNav.tsx    # Bottom navigation
│   │   └── pages/               # Các trang chính
│   │       ├── Welcome.tsx      # Trang chào mừng
│   │       ├── Home.tsx         # Trang chủ
│   │       ├── CheckPage.tsx    # Trang kiểm tra
│   │       ├── Community.tsx    # Cộng đồng
│   │       ├── Family.tsx       # Danh bạ gia đình
│   │       ├── ChatAI.tsx       # Trợ lý AI
│   │       ├── EmergencySupport.tsx  # Hỗ trợ 24h
│   │       └── ElderHome.tsx    # Giao diện người cao tuổi
│   ├── styles/
│   │   ├── fonts.css            # Import fonts
│   │   └── theme.css            # Theme CSS (colors, spacing...)
│   └── main.tsx                 # Entry point
├── index.html                   # HTML chính
├── package.json                 # Dependencies và scripts
├── vite.config.ts               # Cấu hình Vite
└── tsconfig.json                # Cấu hình TypeScript
```

---

## 🐛 KHẮC PHỤC LỖI THƯỜNG GẶP

### Lỗi: "pnpm: command not found"
**Giải pháp:**
```bash
npm install -g pnpm
```

### Lỗi: Port 5173 đã được sử dụng
**Giải pháp:** Vite tự động chuyển sang port khác (5174, 5175...)

### Lỗi: Cannot find module 'react'
**Giải pháp:**
```bash
pnpm install
```

### App không tự reload khi sửa code
**Giải pháp:**
1. Dừng server: `Ctrl + C`
2. Chạy lại: `pnpm dev`
3. Clear cache trình duyệt: `Ctrl + Shift + R`

### Lỗi TypeScript (gạch đỏ)
**Giải pháp:** Đây chỉ là cảnh báo, app vẫn chạy được. Có thể bỏ qua hoặc fix theo gợi ý.

---

## 🎨 MẸO LÀM VIỆC HIỆU QUẢ

### 1. Mở nhiều file cùng lúc
- Split editor: `Ctrl + \`
- Switch giữa các file: `Ctrl + Tab`

### 2. Format code tự động
- Cài Prettier extension
- Format: `Shift + Alt + F`
- Hoặc set auto format khi save: Settings → Format On Save

### 3. Xem component tree
- Cài React Developer Tools extension cho Chrome/Firefox
- Mở DevTools → React tab

### 4. Console.log nhanh
- Gõ: `clg` + Tab (với ES7 snippets extension)
- Tự động: `console.log('object', object)`

### 5. Live Share để code cùng nhau
- Cài extension Live Share
- Share link cho đồng đội
- Code real-time cùng lúc!

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Đọc lại hướng dẫn từ đầu
2. Google lỗi với keyword: "vite react [tên lỗi]"
3. Kiểm tra log trong Terminal
4. Xóa `node_modules` và cài lại: `rm -rf node_modules && pnpm install`

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Đã cài Node.js
- [ ] Đã cài pnpm
- [ ] Đã mở project trong VS Code
- [ ] Đã chạy `pnpm install`
- [ ] Đã chạy `pnpm dev`
- [ ] Đã mở http://localhost:5173 và thấy app
- [ ] Đã sửa code và thấy auto-reload

**🎉 Chúc bạn code vui vẻ!**
