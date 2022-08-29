window.onload = function () {
    spillTransaksi();
}

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
    let obj = {
        id: Date.now(),
        kategori: kategori,
        sub_kategori: sub_kategori,
        total: total,
        catatan: catatan,
        tanggal: tanggal
    }

    total = parseInt(total)
    let objTotal = {
        pemasukan: 0,
        pengeluaran: 0
    }

    // SIMPAN TOTAL TRANSAKSI
    if (localStorage.getItem("transaksi") == null || localStorage.getItem("totalTransaksi") == null) {

        arrTransaksi = [obj];
        localStorage.setItem("transaksi", JSON.stringify(arrTransaksi));
        if (kategori == "pemasukan") {
            objTotal = {
                pemasukan: total,
                pengeluaran: 0
            }
            localStorage.setItem("totalTransaksi", JSON.stringify(objTotal));
        } else {
            objTotal = {
                pemasukan: 0,
                pengeluaran: total
            }
            localStorage.setItem("totalTransaksi", JSON.stringify(objTotal));
        }
    } else {
        let getTransaksi = JSON.parse(localStorage.getItem("transaksi"))
        let getTotalTransaksi = JSON.parse(localStorage.getItem("totalTransaksi"));
        objTotal = {
            pemasukan: getTotalTransaksi.pemasukan,
            pengeluaran: getTotalTransaksi.pengeluaran
        }
        if (kategori == "pemasukan") {
            objTotal = {
                pemasukan: objTotal.pemasukan + total,
                pengeluaran: getTotalTransaksi.pengeluaran
            }
            localStorage.setItem("totalTransaksi", JSON.stringify(objTotal));
        } else {
            objTotal = {
                pemasukan: objTotal.pemasukan - total,
                pengeluaran: objTotal.pengeluaran + total
            }
            localStorage.setItem("totalTransaksi", JSON.stringify(objTotal));
        }

        // SIMPAN RIWAYAT TRANSAKSI
        getTransaksi.push(obj);
        localStorage.setItem("transaksi", JSON.stringify(getTransaksi))
    }

    clearForm();
    spillTransaksi();
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

function clearForm() {

    const inputs = document.querySelectorAll('#total, #kategori, #catatan, #tanggal');

    inputs.forEach(input => {
        input.value = '';
    });
}

function spillTransaksi() {
    let spillPemasukan = document.getElementById("spillPemasukan");
    let spillPengeluaran = document.getElementById("spillPengeluaran");
    let getTotalTransaksi = JSON.parse(localStorage.getItem("totalTransaksi"));
    spillPemasukan.innerText = `Rp. ${getTotalTransaksi.pemasukan}`;
    spillPengeluaran.innerText = `Rp. ${getTotalTransaksi.pengeluaran}`;
}