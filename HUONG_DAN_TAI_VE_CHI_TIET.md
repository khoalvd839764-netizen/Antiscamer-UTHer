# 📥 HƯỚNG DẪN TẢI SOURCE CODE VỀ MÁY CHI TIẾT

## 📊 THÔNG TIN PROJECT

- **Tổng số file code:** 76 files
- **Kích thước:** ~2.3 MB (đã nén, không bao gồm node_modules)
- **Công nghệ:** React + TypeScript + Vite + Tailwind CSS

---

## 🎯 PHƯƠNG ÁN 1: TỪ FIGMA MAKE (DỄ NHẤT)

### Bước 1: Tìm nút Export trong Figma Make
Trong giao diện Figma Make, tìm:
- Nút **"Export code"** / **"Download"** / **"Export project"**
- Thường ở **thanh menu trên** hoặc **menu ⋮ (3 chấm)**
- Icon có thể là: **⬇️**, **📥**, hoặc **</> Export**

### Bước 2: Chọn loại export
- Chọn **"Download source code"** hoặc **"Export as ZIP"**
- File sẽ tự động tải về máy

### Bước 3: Giải nén và sử dụng
```bash
# Windows: Giải nén bằng WinRAR/7-Zip hoặc click phải → Extract
# Mac: Double-click file ZIP
# Linux: unzip anti-scamer.zip

# Sau đó:
cd anti-scamer
pnpm install
pnpm dev
```

---

## 🎯 PHƯƠNG ÁN 2: COPY-PASTE THỦ CÔNG

### Nếu không tìm thấy nút Export, làm theo các bước:

### Bước 1: Tạo cấu trúc folder trên máy

Tạo folder `Anti-Scamer` với cấu trúc:
```
Anti-Scamer/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── figma/
│   │   └── pages/
│   └── styles/
└── (các file gốc)
```

### Bước 2: Copy 10 file quan trọng nhất

#### 1️⃣ package.json
```json
{
  "name": "anti-scamer",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "11.14.0",
    "@emotion/styled": "11.14.1",
    "@mui/icons-material": "7.3.5",
    "@mui/material": "7.3.5",
    "lucide-react": "0.487.0",
    "motion": "12.23.24",
    "react-router": "7.13.0",
    "sonner": "2.0.3",
    "tailwind-merge": "3.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "tailwindcss": "4.1.12",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

#### 2️⃣ vite.config.ts
```typescript
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
```

#### 3️⃣ tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 4️⃣ tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

#### 5️⃣ index.html
*Xem file `CACH_TAI_SOURCODE.md` để lấy nội dung*

#### 6️⃣ src/main.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/fonts.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### 7️⃣ src/app/App.tsx
*Copy từ Figma Make*

#### 8️⃣ src/app/Root.tsx
*Copy từ Figma Make*

#### 9️⃣ src/app/routes.tsx
*Copy từ Figma Make*

#### 🔟 src/styles/theme.css & fonts.css
*Copy từ Figma Make*

### Bước 3: Copy tất cả các trang trong `src/app/pages/`
- Welcome.tsx
- Home.tsx
- CheckPage.tsx
- Community.tsx
- Family.tsx
- ChatAI.tsx
- EmergencySupport.tsx
- ElderHome.tsx

### Bước 4: Copy tất cả components trong `src/app/components/`
- BottomNav.tsx
- ui/ (toàn bộ folder)
- figma/ (toàn bộ folder)

---

## 🎯 PHƯƠNG ÁN 3: SỬ DỤNG GIT (CHUYÊN NGHIỆP)

### Bước 1: Khởi tạo Git repo (trong Figma Make)
```bash
cd /workspaces/default/code
git init
git add .
git commit -m "Initial commit: Anti Scamer app"
```

### Bước 2: Tạo repository trên GitHub
1. Vào https://github.com/new
2. Tạo repo mới: `anti-scamer`
3. **KHÔNG** chọn "Initialize with README"

### Bước 3: Push code lên GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/anti-scamer.git
git branch -M main
git push -u origin main
```

### Bước 4: Clone về máy local
```bash
# Trên máy tính của bạn:
git clone https://github.com/YOUR_USERNAME/anti-scamer.git
cd anti-scamer
pnpm install
pnpm dev
```

---

## 🎯 PHƯƠNG ÁN 4: SHARE QUA GOOGLE DRIVE/DROPBOX

### Bước 1: Tạo file nén (nếu có terminal)
```bash
tar -czf anti-scamer.tar.gz --exclude=node_modules --exclude=.git --exclude=dist .
```

### Bước 2: Upload lên cloud
- Upload file `anti-scamer.tar.gz` lên Google Drive/Dropbox
- Chia sẻ link public
- Tải về máy → Giải nén → Sử dụng

---

## 📋 CHECKLIST SAU KHI TẢI VỀ

### ✅ Kiểm tra file thiết yếu:
```bash
# Chạy lệnh này để check:
ls -1 package.json index.html vite.config.ts src/main.tsx src/app/App.tsx
```

Phải thấy tất cả 5 file này!

### ✅ Cài đặt và chạy:
```bash
# 1. Cài dependencies
pnpm install

# 2. Chạy dev server
pnpm dev

# 3. Mở trình duyệt
# http://localhost:5173
```

---

## 🐛 XỬ LÝ LỖI

### ❌ Lỗi: "Cannot find module"
**Nguyên nhân:** Thiếu dependencies
**Giải pháp:**
```bash
rm -rf node_modules
pnpm install
```

### ❌ Lỗi: "Failed to resolve import"
**Nguyên nhân:** Thiếu file hoặc sai đường dẫn
**Giải pháp:** Kiểm tra lại cấu trúc folder và copy đầy đủ file

### ❌ Lỗi: "Port 5173 already in use"
**Giải pháp:** Vite sẽ tự chuyển sang port khác (5174, 5175...)

---

## 📞 CẦN GIÚP ĐỠ?

1. **Đọc kỹ file:** `HUONG_DAN_CHAY_VSCODE.md`
2. **Check lại:** Đảm bảo có đủ 76 files
3. **Verify:** Chạy `ls -R` để xem cấu trúc folder
4. **Test:** `pnpm dev` phải chạy không lỗi

---

## 🎉 KẾT QUẢ MONG ĐỢI

Sau khi hoàn thành:
- ✅ Có folder `Anti-Scamer` đầy đủ
- ✅ Chạy được `pnpm dev`
- ✅ Mở http://localhost:5173 thấy app
- ✅ Responsive: Desktop có khung iPhone, Mobile full screen
- ✅ Tất cả tính năng hoạt động bình thường

**Size folder sau khi cài:**
- Source code: ~2-3 MB
- node_modules: ~400-500 MB (sau khi pnpm install)
- Tổng: ~500 MB

**Chúc bạn tải về thành công!** 🚀
