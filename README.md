# 🧾 React Claims Admin

Admin dashboard cho hệ thống **Claims / Bồi thường**, xây dựng bằng **React + TypeScript + Vite**.  
Project này là **frontend-only**, dùng để quản lý claims, users, contracts thông qua backend API riêng.

---

## 1. Yêu cầu môi trường

Trước khi setup, đảm bảo máy đã cài:

- **Node.js >= 20** (khuyên dùng 22)
- **npm >= 10** (khuyên dùng 11)

Kiểm tra nhanh:

```bash
node -v
npm -v
```

---

## 2. Clone source code

```bash
git clone https://github.com/maihuy243/react-claims-admin.git
cd react-claims-admin
```

---

## 3. Cài dependencies (npm)

```bash
npm install
```

---

## 4. Chạy project ở local

```bash
npm run dev
```

Sau khi chạy xong, Vite sẽ hiển thị URL (thường là):

```
http://localhost:5173
```

Mở trình duyệt vào URL trên để sử dụng admin dashboard.

---

## 5. Build production

Dùng khi deploy:

```bash
npm run build
```

Output sẽ nằm trong thư mục:

```
dist/
```

---

## 6. Cấu trúc thư mục `src/`

```
src/
├── api/        # Tầng gọi API backend
├── auth/       # Authentication & authorization
├── components/ # UI components dùng chung
├── configs/    # Cấu hình hệ thống
├── context/    # React Context
├── hooks/      # Custom hooks
├── lib/        # Helper libs
├── model/      # Models / interfaces
├── pages/      # Các màn hình chính
├── routes/     # Routing
├── schema/     # Schema validate
├── store/      # Global state
├── utils/      # Helpers
├── App.tsx
├── main.tsx
└── index.css
```

---

## 7. Ghi chú

- Đây là frontend admin, cần backend API chạy song song
- Không commit node_modules hoặc file môi trường
- Mọi API call phải đi qua thư mục `src/api`

---

## 8. License

Internal use.
