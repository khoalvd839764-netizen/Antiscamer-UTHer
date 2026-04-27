# 📥 CÁCH TẢI SOURCE CODE VỀ MÁY

## 🎯 CÁCH 1: TẢI TRỰC TIẾP TỪ FIGMA MAKE (KHUYÊN DÙNG)

### Bước 1: Tìm nút Export/Download
1. Trong giao diện Figma Make
2. Tìm nút **"Export"** hoặc **"Download"** (thường ở góc trên)
3. Hoặc biểu tượng **⬇️** / **📥**

### Bước 2: Chọn định dạng
- Chọn **"Download as ZIP"** hoặc **"Export Project"**
- File sẽ tải về máy với tên dạng: `anti-scamer.zip`

### Bước 3: Giải nén và mở
1. Giải nén file ZIP vừa tải
2. Mở VS Code
3. **File → Open Folder** → Chọn thư mục vừa giải nén
4. Chạy `pnpm install` → `pnpm dev`

---

## 🎯 CÁCH 2: COPY THỦ CÔNG (NẾU KHÔNG CÓ NÚT DOWNLOAD)

### Bước 1: Tạo folder trên máy
1. Tạo folder mới: `Anti-Scamer`
2. Mở folder này trong VS Code

### Bước 2: Copy từng file
Tạo các file sau và copy nội dung:

#### 📄 File gốc (root folder):
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `index.html`
- `pnpm-workspace.yaml`
- `postcss.config.mjs`
- `.npmrc`
- `README.md`
- `HUONG_DAN_CHAY_VSCODE.md`

#### 📁 Folder `src/`:
```
src/
├── main.tsx
├── app/
│   ├── App.tsx
│   ├── Root.tsx
│   ├── routes.tsx
│   ├── components/
│   │   ├── BottomNav.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── switch.tsx
│   │   │   └── sonner.tsx
│   │   └── figma/
│   │       └── ImageWithFallback.tsx
│   └── pages/
│       ├── Welcome.tsx
│       ├── Home.tsx
│       ├── CheckPage.tsx
│       ├── Community.tsx
│       ├── Family.tsx
│       ├── ChatAI.tsx
│       ├── EmergencySupport.tsx
│       └── ElderHome.tsx
└── styles/
    ├── fonts.css
    └── theme.css
```

### Bước 3: Cài đặt và chạy
```bash
pnpm install
pnpm dev
```

---

## 🎯 CÁCH 3: SỬ DỤNG LỆNH ZIP (NHANH NHẤT)

### Nếu bạn có quyền truy cập Terminal của Figma Make:

```bash
# Tạo file zip toàn bộ project
zip -r anti-scamer-source.zip . -x "node_modules/*" ".git/*" "dist/*"

# Hoặc dùng tar
tar -czf anti-scamer-source.tar.gz --exclude=node_modules --exclude=.git --exclude=dist .
```

File ZIP sẽ được tạo, sau đó tải về máy.

---

## 🎯 CÁCH 4: SỬ DỤNG GIT (NẾU CÓ REPOSITORY)

### Nếu code đã được push lên GitHub/GitLab:

```bash
# Clone về máy
git clone https://github.com/your-username/anti-scamer.git

# Vào folder
cd anti-scamer

# Cài đặt
pnpm install

# Chạy
pnpm dev
```

---

## ✅ SAU KHI TẢI VỀ - CHECKLIST

- [ ] Đã có folder project trên máy
- [ ] Đã mở folder trong VS Code
- [ ] Đã có file `package.json` trong folder
- [ ] Đã cài Node.js (v18+)
- [ ] Đã cài pnpm: `npm install -g pnpm`
- [ ] Chạy: `pnpm install`
- [ ] Chạy: `pnpm dev`
- [ ] Mở: http://localhost:5173

---

## 🐛 LỖI THƯỜNG GẶP

### Lỗi: "Cannot find package.json"
**Nguyên nhân:** Mở sai folder
**Giải pháp:** Đảm bảo mở đúng folder chứa `package.json`

### Lỗi: "pnpm: command not found"
**Giải pháp:**
```bash
npm install -g pnpm
```

### Thiếu file
**Giải pháp:** Download lại hoặc check xem có file nào bị bỏ sót không

---

## 📞 LƯU Ý QUAN TRỌNG

1. **KHÔNG tải folder `node_modules`** - Quá nặng (hàng trăm MB)
   - Chỉ cần `package.json`, sau đó chạy `pnpm install`

2. **KHÔNG cần folder `dist`** - Đây là folder build
   - Sẽ tự tạo khi chạy `pnpm build`

3. **Các file cần thiết nhất:**
   - `package.json` ⭐ (Quan trọng nhất)
   - `vite.config.ts`
   - `index.html`
   - Folder `src/` (toàn bộ)
   - Folder `src/styles/`

---

## 🎉 KẾT QUẢ MONG ĐỢI

Sau khi hoàn thành, bạn sẽ có:
- ✅ Folder project đầy đủ trên máy
- ✅ Có thể chỉnh sửa code trong VS Code
- ✅ Chạy `pnpm dev` được
- ✅ Xem app trên http://localhost:5173
- ✅ Có thể commit lên Git
- ✅ Có thể deploy lên hosting

**Chúc bạn tải code thành công!** 🚀
