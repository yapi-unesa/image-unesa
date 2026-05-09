# IMAGE UNESA - Website Resmi

Website resmi untuk **IMAGE (Ikatan Mahasiswa Gresik) Universitas Negeri Surabaya**.

## 🚀 Teknologi yang Digunakan

- **[Svelte](https://svelte.dev/)**: Framework JavaScript untuk membangun antarmuka pengguna yang reaktif tanpa *virtual DOM overhead*.
- **[Vite](https://vitejs.dev/)**: *Build tool* dan *dev server* yang sangat cepat.
- **Vanilla CSS**: Digunakan untuk tata letak dan desain visual (mendukung efek *Glassmorphism*, kustomisasi variabel warna cerah ala akademik).

## 🎨 Tampilan Visual

Desain website ini mengusung tema terang (*Light Mode*) dengan palet warna utama:
- **Biru Unesa** (`#00428a`)
- **Putih Bersih** (`#ffffff`)
- **Oranye Aksen** (`#ea580c`)

---

## 🛠️ Persyaratan Sistem

Sebelum memulai kontribusi, pastikan perangkat Anda sudah terinstal:
- **[Node.js](https://nodejs.org/)** (versi 16 atau lebih baru)
- **NPM** (sudah satu paket dengan Node.js) atau **Yarn**

## 💻 Panduan Instalasi & Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di komputer lokal Anda:

1. **Clone repository ini** (jika sudah di-push ke GitHub):
   ```bash
   git clone https://github.com/username-kalian/image-unesa.git
   cd "image-unesa"
   ```
   *(Catatan: Sesuaikan URL repository jika sudah diunggah ke GitHub)*

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (*Development Server*)**:
   ```bash
   npm run dev
   ```

4. **Buka di Browser**:
   Buka alamat yang tertera di terminal, biasanya `http://localhost:5173/`. Setiap perubahan pada kode akan secara otomatis dimuat ulang (*Hot Module Replacement*).

## 📁 Struktur Direktori Utama

Berikut adalah penjelasan singkat tentang file dan folder penting dalam proyek ini:

```text
├── public/                 # File statis seperti gambar (hero_bg.png, dll) dan favicon
├── src/
│   ├── assets/             # (Opsional) Aset tambahan seperti logo atau font
│   ├── lib/                # (Opsional) Komponen Svelte yang dapat digunakan ulang
│   ├── App.svelte          # Komponen utama yang menampung seluruh tampilan website
│   ├── app.css             # File CSS global (berisi variabel warna & styling)
│   └── main.js             # Entry point untuk merender aplikasi Svelte
├── index.html              # Template HTML utama
├── package.json            # Daftar dependensi dan script NPM
└── vite.config.js          # Konfigurasi Vite
```

## 🤝 Panduan Berkolaborasi (Contribute)

Untuk Anda dan tim yang ingin mengerjakan proyek ini secara bersamaan, sangat disarankan menggunakan alur kerja GitHub standar:

1. **Buat Branch Baru**: Setiap mengerjakan fitur atau perbaikan baru, buatlah *branch* tersendiri.
   ```bash
   git checkout -b nama-fitur-kalian
   ```
2. **Lakukan Commit secara berkala**: Buat pesan *commit* yang jelas.
   ```bash
   git commit -m "feat: menambahkan halaman galeri kegiatan"
   ```
3. **Push ke GitHub**:
   ```bash
   git push origin nama-fitur-kalian
   ```
4. **Buat Pull Request (PR)**: Minta anggota tim lain untuk me-review kode sebelum digabungkan (*merge*) ke *branch* utama (`main` atau `master`).

---

Dibuat dengan ❤️ untuk **IMAGE UNESA**.
