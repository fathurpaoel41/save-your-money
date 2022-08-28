// window.onload = function () {
//     let transaksi = localStorage.getItem("transaksi");
//     if (transaksi == false) {
//         let arr = []
//         localStorage.setItem("transaksi", JSON.stringify(arr))
//     }
//     console.log(transaksi)
// }

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

function simpan_transaksi() {
    let total = document.getElementById("total").value;
    let sub_kategori = document.getElementById("kategori").value;
    let catatan = document.getElementById("catatan").value;
    let tanggal = document.getElementById("tanggal").value;
    let kategori = cari_kategori(sub_kategori);
    let arrTransaksi = null;
    let totalTransaksi = null;
    let obj = {
        id: Date.now(),
        kategori: kategori,
        sub_kategori: sub_kategori,
        total: total,
        catatan: catatan,
        tanggal: tanggal
    }

    total = parseInt(total)

    // SIMPAN TOTAL TRANSAKSI
    if (localStorage.getItem("transaksi") == null || localStorage.getItem("totalTransaksi") == null) {
        arrTransaksi = [obj];
        localStorage.setItem("transaksi", JSON.stringify(arrTransaksi));
        if (kategori == "pemasukan") {
            localStorage.setItem("totalTransaksi", total);
        } else {
            localStorage.setItem("totalTransaksi", -total);
        }
    } else {
        let getTransaksi = JSON.parse(localStorage.getItem("transaksi"))
        let getTotalTransaksi = parseInt(localStorage.getItem("totalTransaksi"));
        if (kategori == "pemasukan") {
            totalTransaksi = getTotalTransaksi + total
            localStorage.setItem("totalTransaksi", totalTransaksi);
        } else {
            totalTransaksi = getTotalTransaksi - total
            localStorage.setItem("totalTransaksi", totalTransaksi);
        }

        // SIMPAN RIWAYAT TRANSAKSI
        getTransaksi.push(obj);
        localStorage.setItem("transaksi", JSON.stringify(getTransaksi))
    }
}

function cari_kategori(kategori) {
    let result = null;
    const arrPemasukan = ["gaji", "pemasukan tambahan"];
    const arrPengeluaran = ["makanan", "bayar hutang", "perawatan"];
    const checkPemasukan = arrPemasukan.some((x) => x === kategori);
    if (checkPemasukan) {
        result = "pemasukan";
    } else {
        const checkPengeluaran = arrPengeluaran.some((x) => x === kategori);
        if (checkPengeluaran) {
            result = "pengeluaran"
        }
    }
    return result;
}