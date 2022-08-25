function ringkasan_transaksi() {
    document.getElementById("ringkasan_transaksi").style.display = "block";
    document.getElementById("tambah_transaksi").style.display = "none";
    document.getElementById("riwayat_transaksi").style.display = "none";
}

function tambah_transaksi() {
    document.getElementById("ringkasan_transaksi").style.display = "none";
    document.getElementById("tambah_transaksi").style.display = "block";
    document.getElementById("riwayat_transaksi").style.display = "none";
}

function riwayat_transaksi() {
    document.getElementById("ringkasan_transaksi").style.display = "none";
    document.getElementById("tambah_transaksi").style.display = "none";
    document.getElementById("riwayat_transaksi").style.display = "block";
}