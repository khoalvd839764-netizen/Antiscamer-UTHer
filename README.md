# 📱 Anti Scamer - Ứng dụng bảo vệ người dùng khi sử dụng Internet

## 🚀 Quick Start

### Chạy ngay trong 3 bước:

```bash
# 1. Cài đặt dependencies
pnpm install

# 2. Chạy development server
pnpm dev

# 3. Mở trình duyệt: http://localhost:5173
```

---

## 📖 Hướng dẫn chi tiết

👉 **Xem file [HUONG_DAN_CHAY_VSCODE.md](./HUONG_DAN_CHAY_VSCODE.md)** để được hướng dẫn đầy đủ:
- Yêu cầu hệ thống
- Cài đặt từng bước
- Test trên điện thoại thật
- Khắc phục lỗi thường gặp
- Mẹo làm việc hiệu quả

---

## 🎨 Tính năng

### Chế độ Bình thường (4 trang):
- **🏠 Home**: Trang chủ với toggle "Bảo vệ tối đa"
- **✅ Check**: Kiểm tra link/tin nhắn lừa đảo
- **👥 Community**: Cộng đồng chia sẻ (auto-update 8s)
- **👨‍👩‍👧 Family**: Danh bạ gia đình

### Chế độ Người cao tuổi:
- **🛡️ Elder Home**: Giao diện đơn giản với khiên bảo mật lớn
- Toggle bảo vệ tự động
- Danh bạ nhanh (Nhắn tin/Gọi/Trợ giúp)

### Tính năng hỗ trợ:
- **🤖 Chat AI**: Trợ lý AI tư vấn về lừa đảo
- **🆘 Hỗ trợ 24h**: 6 lựa chọn hỗ trợ khẩn cấp

---

## 📐 Thiết kế

- **Responsive**: 
  - Desktop: Khung iPhone 14 Pro Max (430x932px)
  - Mobile: Full screen với safe area
- **UI/UX**: Glass morphism, gradient chuyên nghiệp, animated particles
- **Thông báo**: Toast notification (thay alert() thô)

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool siêu nhanh
- **Tailwind CSS v4** - Utility-first CSS
- **React Router v7** - Routing
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **Motion** (Framer Motion) - Animations

---

## 📂 Cấu trúc Project

```
src/
├── app/
│   ├── App.tsx                # Entry component
│   ├── Root.tsx               # Layout (iPhone frame/mobile)
│   ├── routes.tsx             # Routes definition
│   ├── components/            # Shared components
│   │   ├── ui/                # UI components
│   │   └── BottomNav.tsx      # Bottom navigation
│   └── pages/                 # Main pages
│       ├── Welcome.tsx
│       ├── Home.tsx
│       ├── CheckPage.tsx
│       ├── Community.tsx
│       ├── Family.tsx
│       ├── ChatAI.tsx
│       ├── EmergencySupport.tsx
│       └── ElderHome.tsx
└── styles/                    # Global styles
```

---

## ⌨️ Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

---

## 🌐 Test trên điện thoại

```bash
# Chạy server với --host
pnpm dev --host

# Truy cập từ điện thoại (cùng WiFi):
# http://[IP-máy-tính]:5173
```

---

**Made with ❤️ for Internet Safety**
