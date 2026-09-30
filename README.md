# KloStock

**KloStock** adalah PWA sederhana untuk sistem stok toko kelontong. Tagline aplikasi ini adalah **“Belanja harian tanpa ribet.”** Aplikasi dibuat dengan HTML, CSS, JavaScript Vanilla, Local Storage, Chart.js melalui CDN, manifest PWA, dan Service Worker.

## Menjalankan aplikasi

Service Worker hanya dapat bekerja melalui `http://localhost` atau HTTPS. Jalankan server statis sederhana dari folder ini, misalnya:

```bash
python3 -m http.server 8080
```

Kemudian buka `http://localhost:8080` di browser. Tidak ada build step, Node.js, backend, atau database yang diperlukan.

## Struktur penting

- `index.html` — dashboard utama.
- `style.css` — seluruh styling dan responsive layout.
- `app.js` — navigasi umum, splash screen, toast, dan registrasi Service Worker.
- `js/storage.js` — fungsi Local Storage dan data awal.
- `js/dashboard.js` — statistik, grafik, dan barang terbaru.
- `js/barang.js` — tabel, pencarian, filter, dan modal hapus.
- `js/form.js` — form tambah/edit barang.
- `js/detail.js` — halaman detail barang.
- `manifest.json` dan `service-worker.js` — dukungan PWA/offline.

## Data

Data barang disimpan sebagai JSON array pada Local Storage dengan key `klostock_products`. Status otomatis ditentukan dari stok: **Aman** jika lebih dari 10, **Menipis** jika 1–10, dan **Habis** jika 0.

## Catatan offline

Chart.js dimuat dari CDN sehingga grafik akan tampil penuh ketika koneksi tersedia. Halaman, style, JavaScript, dan data Local Storage tetap dapat digunakan offline setelah Service Worker selesai melakukan caching. Untuk menghindari masalah cache ketika mengembangkan, ubah `CACHE_NAME` pada `service-worker.js` setelah perubahan besar.

Dibuat untuk belajar DOM, event, form, JSON, Local Storage, CRUD, grafik, dan PWA.

## Login dan Profile

Aplikasi sekarang memiliki halaman login lokal di `pages/login.html`. Karena aplikasi tidak menggunakan backend, tersedia akun demo:

- Email: `admin@klostock.app`
- Password: `klostock123`

Sesi login disimpan pada Local Storage dengan key `klostock_user`. Halaman stok toko akan mengarahkan pengguna ke login jika belum memiliki sesi. Halaman `pages/profile.html` memungkinkan pengguna mengubah nama, email, dan nama workspace, serta menyediakan tombol keluar.

Splash screen KloStock hanya tampil sekali setelah login pada satu sesi browser. Ketika pengguna mengklik **Dashboard** dari sidebar, halaman tidak lagi menampilkan loading splash berulang-ulang.

## Branding dan mobile

KloStock sekarang menggunakan logo custom berbentuk keranjang belanja berwarna kuning di atas deep teal. Asset tersedia dalam format SVG dan PNG pada folder `assets/`, sedangkan `icon.png` digunakan sebagai ikon PWA. Layout aplikasi bersifat responsive dan mobile-first sehingga dapat digunakan langsung dari browser iPhone, termasuk frame viewport iPhone 17.
