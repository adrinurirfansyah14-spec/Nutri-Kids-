# 🚀 Panduan Setup Awal Frontend React (Untuk Pemula)

Selamat datang di proyek frontend **GetInvestor**! Proyek ini dibangun menggunakan **React** dan **Vite** dengan struktur folder yang dirancang rapi, bersih, dan mudah dipahami oleh pemula.

---

## 📁 Penjelasan Struktur Folder

Berikut adalah susunan folder di dalam direktori proyek:

```text
Nutri-Kids-/
├── public/                 # File aset statis publik (favicon, file publik)
├── src/
│   ├── assets/             # Gambar lokal, logo, ikon SVG/PNG
│   ├── components/         # Komponen reusable (Navbar, Footer, Card, dll.)
│   ├── pages/              # Komponen halaman utuh
│   ├── services/           # Data & integrasi Backend/API
│   ├── styles/             # Pengaturan gaya global (variables.css)
│   ├── App.jsx             # Komponen induk
│   ├── App.css             # Styling layout App & Hero
│   ├── index.css           # Reset CSS dan styling dasar
│   └── main.jsx            # Entry point React
├── dist/                   # Folder hasil build produksi
├── index.html              # Template HTML utama
├── package.json            # Daftar pustaka (dependencies) dan script
├── vite.config.js          # Konfigurasi bundler Vite
└── PANDUAN_PEMULA.md       # Panduan ini
```

---

## ⚡ Cara Menjalankan Proyek

Buka terminal langsung di folder ini (`Nutri-Kids-`), lalu jalankan:

### Jalankan server lokal (Development Mode):
```bash
npm run dev
```

Setelah perintah dijalankan, Vite akan menampilkan tautan lokal (biasanya `http://localhost:5173`). Buka tautan tersebut di browser Anda.

### 3. Menguji build produksi (Opsional):
```bash
npm run build
```

---

## 💡 3 Konsep Inti React yang Digunakan di Proyek Ini

### 1. Komponen (Component)
Komponen adalah potongan kode UI yang berdiri sendiri, seperti balok Lego.
- Contoh: `Navbar.jsx`, `Footer.jsx`, `InvestorCard.jsx`.
- Aturan: Nama fungsi komponen **harus diawali huruf kapital** (contoh: `Navbar`, bukan `navbar`).

### 2. Props (Properties)
Props adalah cara mengirimkan data dari komponen induk (*parent*) ke komponen anak (*child*).
- Di `Home.jsx`, kita memanggil kartu dengan:
  ```jsx
  <InvestorCard investor={item} />
  ```
- Di `InvestorCard.jsx`, kita menerima datanya:
  ```jsx
  export default function InvestorCard({ investor }) {
    return <h3>{investor.name}</h3>;
  }
  ```

### 3. State (`useState`)
State adalah memori komponen. Jika nilainya berubah, tampilan UI akan otomatis diperbarui.
- Di `Home.jsx`, kita menyimpan kata kunci pencarian dan kategori filter:
  ```jsx
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  ```

---

## 🛠️ Langkah Menambah Fitur Baru

### A. Ingin membuat Komponen baru? (Misalnya: `Button.jsx`)
1. Buat file baru di `src/components/Button.jsx`.
2. Buat file styling pasangannya `src/components/Button.css`.
3. Tulis komponen Anda dan ekspor menggunakan `export default Button`.
4. Impor dan gunakan di halaman manapun dengan `import Button from '../components/Button'`.

### B. Ingin menghubungkan ke API Backend nyata?
1. Buka file `src/services/`. Anda bisa membuat file baru misalnya `api.js`.
2. Gunakan fungsi bawaan JavaScript `fetch()` atau pasang pustaka `axios`:
   ```javascript
   export async function getInvestors() {
     const response = await fetch('https://api-backend-kamu.com/api/investors');
     return await response.json();
   }
   ```
3. Di dalam `Home.jsx`, panggil fungsi tersebut menggunakan hook `useEffect`.

---

## 🎨 Mengubah Tema Warna
Anda dapat mengganti warna dasar (misal dari biru ke warna lain) cukup dengan mengubah file:
👉 **`src/styles/variables.css`** pada variabel `--primary` dan `--secondary`. Perubahan akan langsung tercermin di seluruh aplikasi!
