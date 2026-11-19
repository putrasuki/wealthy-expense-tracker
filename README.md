# Wealthy — Catatan Keuangan Pribadi

Pelacak pengeluaran & keuangan pribadi berbasis browser, tanpa build step.

**Live:** https://wealthy-vercel.vercel.app

## Fitur

- Multi-dompet (tunai, bank, e-wallet, kartu kredit) dengan saldo otomatis
- Pemasukan, pengeluaran, dan transfer antar-dompet
- Transaksi berulang (harian/mingguan/bulanan/tahunan)
- Anggaran per kategori + *safe-to-spend* harian
- Dashboard: net worth, arus kas, komposisi pengeluaran, insight otomatis
- Target tabungan dengan estimasi waktu tercapai
- Filter/pencarian, edit/hapus transaksi
- Export/import JSON & CSV
- Dark/light mode, responsif

Data disimpan di `localStorage` browser. Aplikasi dimulai dalam kondisi kosong (tanpa data contoh).

## Struktur

```
index.html   struktur halaman
styles.css   sistem desain editorial (kertas & tinta)
app.js       state, logika, dan render
```

## Jalankan lokal

```powershell
python -m http.server 8000
```

Lalu buka http://localhost:8000

## Deploy

Push ke `main` akan otomatis deploy via Vercel (repo ini sudah terhubung).

Deploy manual:
```powershell
vercel --prod --yes
```
