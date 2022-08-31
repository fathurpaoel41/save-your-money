window.onload = function () {
    spillTransaksi();
    reloadTable();
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

    // SIMPAN TOTAL TRANSAKSI
    if (localStorage.getItem("transaksi") == null) {

        arrTransaksi = [obj];
        localStorage.setItem("transaksi", JSON.stringify(arrTransaksi));
    } else {
        let getTransaksi = JSON.parse(localStorage.getItem("transaksi"))

        // SIMPAN RIWAYAT TRANSAKSI
        getTransaksi.push(obj);
        localStorage.setItem("transaksi", JSON.stringify(getTransaksi))
    }

    clearForm();
    spillTransaksi();
    addTable(obj);
    openModal("Transaksi Berhasil Dibuat");
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
    let getTransaksi = JSON.parse(localStorage.getItem("transaksi"));
    let pemasukan = 0;
    let pengeluaran = 0;
    getTransaksi.forEach(res => {
        if (res.kategori === "pemasukan") {
            pemasukan = pemasukan + parseInt(res.total)
        } else {
            pemasukan = pemasukan - parseInt(res.total)
            pengeluaran = pengeluaran + parseInt(res.total)
        }
    })

    spillPemasukan.innerText = `Rp. ${pemasukan}`;
    spillPengeluaran.innerText = `Rp. ${pengeluaran}`;
}

function openModal(text) {
    let modal = document.getElementById("modal");
    let span = document.getElementsByClassName("close")[0];
    let p = document.getElementById("text-modal");

    p.innerHTML = text;
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
}

function closeModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

function closeModalDetailData() {
    let modal = document.getElementById("modalDetail");
    modal.style.display = "none";
}

function closeModalDeleteData() {
    let modal = document.getElementById("deleteTransaksi");
    modal.style.display = "none";
}

function addTable(res) {
    let getDataTransaksi = JSON.parse(localStorage.getItem("transaksi"))
    let key = getDataTransaksi.length
    let table = document.getElementById("table");
    let row = table.insertRow(-1);
    row.id = `baris${key + 1}`;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = key + 1;
    cell2.innerHTML = res.tanggal;
    cell3.innerHTML = res.kategori;
    cell4.innerHTML = `Rp ${res.total} `;
    cell5.innerHTML = `<a id='${key + 1}' class='delete-table' onClick='confirmDeleteData(${key + 1},${res.id})'>delete</a> <a id='${key + 1}' class='detail-table' onClick='detailData(${key + 1},${res.id})'>Detail</a>`
}

function reloadTable() {
    let getDataTransaksi = JSON.parse(localStorage.getItem("transaksi"))
    let table = document.getElementById("table");
    getDataTransaksi.map((res, key) => {
        let row = table.insertRow(-1);
        row.id = `baris${key + 1}`;
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = key + 1;
        cell2.innerHTML = res.tanggal;
        cell3.innerHTML = res.kategori;
        cell4.innerHTML = `Rp ${res.total} `;
        cell5.innerHTML = `<a id='${key + 1}' class='delete-table' onClick='confirmDeleteData(${key + 1},${res.id})'>delete</a> <a id='${key + 1}' class='detail-table' onClick='detailData(${key + 1},${res.id})'>Detail</a>`
    })
}

function confirmDeleteData(key, id) {
    let modal = document.getElementById("deleteTransaksi");
    let span = document.getElementsByClassName("close")[0];
    let p = document.getElementById("text-modal-delete-transaksi");

    p.innerHTML = `<p align='justify'>
    Apakah anda yakin ingin menghapus data transaksi ini ? <br/><br/>
    <center><input type="submit" value="Hapus" onClick="deleteData(${key},${id})"> <input type="submit" value="Batal" onClick="closeModalDeleteData()"></center>
    </p>`;
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
}

function deleteData(key, id) {
    closeModalDeleteData()
    let getTransaksi = JSON.parse(localStorage.getItem('transaksi'));
    let indexIdTransaksi = getTransaksi.findIndex(r => r.id == id);
    getTransaksi.splice(indexIdTransaksi, 1);
    localStorage.setItem("transaksi", JSON.stringify(getTransaksi))
    document.getElementById(`baris${key}`).remove();
    spillTransaksi();
    openModal("Transaksi Berhasil DiHapus");
}

function detailData(key, id) {
    let getTransaksi = JSON.parse(localStorage.getItem("transaksi"));
    getTransaksi = getTransaksi[key - 1]
    let modal = document.getElementById("modalDetail");
    let span = document.getElementsByClassName("close")[0];
    let p = document.getElementById("text-modal-detail");


    p.innerHTML = `<p align='justify'>
    Tanggal : ${getTransaksi.tanggal} <br />
    Kategori : ${getTransaksi.kategori} <br />
    Sub Kategori : ${getTransaksi.sub_kategori} <br />
    Total : ${getTransaksi.total} <br />
    Catatan : ${getTransaksi.catatan} <br />
    </p>`;
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
}