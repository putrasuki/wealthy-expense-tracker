# Wealthy — Catatan Keuangan Pribadi

Pelacak pengeluaran & kekayaan pribadi berbasis browser, tanpa build step.

**Live:** https://wealthy-vercel.vercel.app

## Fitur

- Multi-dompet (tunai, bank, e-wallet, kartu kredit) dengan saldo otomatis
- Pemasukan, pengeluaran, dan transfer antar-dompet
- Kategori bawaan **dan kategori kustom** yang bisa diketik sendiri
- Transaksi berulang (harian/mingguan/bulanan/tahunan)
- Anggaran per kategori + *safe-to-spend* harian
- Dashboard: **tren kekayaan 12 bulan**, arus kas, donut kategori, insight otomatis
- **Navigasi bulan** untuk melihat arsip bulan sebelumnya
- **Quick add** (shortcut `N` / `/`) dan **undo hapus** 6,5 detik
- Target tabungan dengan estimasi waktu tercapai
- Filter/pencarian, edit/hapus transaksi
- Export/import JSON & CSV
- Dark/light mode, responsif
- **Installable PWA** — bisa dipasang di home screen HP dan dipakai offline

Data disimpan di `localStorage` browser. Aplikasi dimulai dalam kondisi kosong (tanpa data contoh).

## Struktur

```
index.html                 struktur halaman
styles.css                 sistem desain editorial (kertas & tinta)
app.js                     state, logika, dan render
manifest.webmanifest       metadata PWA
sw.js                      service worker (cache offline)
icon-192.png, icon-512.png ikon aplikasi
vendor/chart.umd.min.js    Chart.js lokal (tidak bergantung CDN)
```

## Buka aplikasi

**URL produksi: https://wealthy-vercel.vercel.app**

Tidak perlu login. Buka URL itu di browser HP, lalu pasang ke home screen:

- **Android / Chrome:** menu `⋮` → **Tambahkan ke Layar Utama** / *Install app*
- **iPhone / Safari:** tombol **Bagikan** → **Tambahkan ke Layar Utama**

Setelah terpasang, app bisa dibuka seperti aplikasi biasa dan tetap jalan tanpa internet. Tombol **Pasang** juga tersedia di menu **Pengaturan & Data**.

Data **tidak** tersinkron otomatis antar perangkat. Untuk memindahkan data ke HP, export JSON di perangkat lama lalu import di perangkat baru lewat **Pengaturan & Data**.

## Jalankan lokal (opsional)

`http://localhost:8000` hanya untuk salinan di komputer sendiri, bukan alamat versi live.

```powershell
python -m http.server 8000
```

lalu buka http://localhost:8000

## Deploy

Push ke `main` akan otomatis deploy via Vercel (repo ini sudah terhubung).

Kalau mengedit di folder `Foler rpl`, salinkan **semua** aset sebelum push:

```powershell
$src='C:\Users\Danie\Downloads\Foler rpl'
$dst='C:\Users\Danie\wealthy-vercel'
Copy-Item "$src\index.html","$src\styles.css","$src\app.js","$src\manifest.webmanifest","$src\sw.js","$src\icon-192.png","$src\icon-512.png" $dst -Force
Copy-Item "$src\vendor\chart.umd.min.js" "$dst\vendor\chart.umd.min.js" -Force
cd $dst
git add -A
git commit -m "update wealth tracker"
git push
```

Deploy manual:
```powershell
vercel --prod --yes
```

Catatan: jika mengubah aset yang di-cache, naikkan versi `CACHE` di `sw.js` agar HP mengunduh versi baru.
