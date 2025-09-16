🌎 Overview

Billing Play adalah aplikasi web berbasis React (frontend) dan Express (backend) yang membantu pengelola rental PlayStation (PS) dalam mencatat, mengelola, dan memantau sesi permainan pelanggan secara efisien.

Fitur utama meliputi:

Pemilihan unit TV/PS yang tersedia untuk pelanggan.

Pencatatan durasi bermain dan perhitungan otomatis biaya berdasarkan tarif per jam.

Pencatatan metode pembayaran (QRIS atau tunai) dan status pemakaian unit.

Manajemen unit PS/TV dan riwayat transaksi secara terpusat.

Aplikasi ini memanfaatkan React untuk antarmuka interaktif, Express untuk RESTful API backend, dan database (misalnya MySQL atau MongoDB) untuk menyimpan data unit, transaksi, dan master data.

Role:

Admin: Mengelola data master seperti daftar unit PS/TV, daftar barang, tarif layanan, dan kasir. Admin tidak menangani transaksi harian.

Kasir: Mencatat transaksi pelanggan, termasuk pemilihan unit PS/TV, durasi bermain, metode pembayaran, dan memantau status unit.

👷‍♀️ Problem Space (Job to be done)

Pengusaha rental PS sering kesulitan dalam mencatat sesi bermain secara akurat dan mengelola transaksi secara efisien. Proses manual dapat menyebabkan kesalahan hitung, hilangnya data, dan pelayanan lambat.

Sebagai kasir, saya ingin mengetahui unit TV/PS yang kosong, mencatat durasi bermain dan unit, menghitung biaya otomatis, menandai pembayaran, serta mengakses riwayat transaksi dan unit.

Sebagai admin, saya ingin mengelola data master seperti unit PS/TV, barang, tarif layanan, dan kasir tanpa terlibat dalam pencatatan transaksi harian.


💻 Tech Stack

Frontend: React, React Router, Axios

Backend: Express.js, Node.js, REST API

Database: MySQL


POST MAN DOKUMENTASI :

![](../react/screenshot/Screenshot%202025-09-16%20093907.png)
![](../react/screenshot/Screenshot%202025-09-16%20093916.png)
![](../react/screenshot/Screenshot%202025-09-16%20093954.png)
![](../react/screenshot/Screenshot%202025-09-16%20094010.png)
