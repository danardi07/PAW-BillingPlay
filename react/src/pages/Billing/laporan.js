import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Laporan = () => {
  const [laporan, setLaporan] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/transaksi");
        setLaporan(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Gagal mengambil data laporan.");
      }
    };
    fetchData();
  }, []);

  const handleExportPdf = () => {
    const input = componentRef.current;
    if (!input) {
      console.error("Referensi komponen tidak ditemukan.");
      return;
    }

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const fileName = `Laporan-Transaksi-${new Date().toISOString().slice(0, 10)}.pdf`;
        pdf.save(fileName);
      })
      .catch((err) => {
        console.error("Gagal membuat PDF:", err);
        alert("Gagal mengekspor laporan sebagai PDF.");
      });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    fontFamily: "sans-serif",
    background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
    minHeight: "100vh",
    color: "white",
  };

  const tableStyle = {
    width: "90%",
    borderCollapse: "collapse",
    marginTop: "30px",
    backgroundColor: "#3a3f47",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  };

  const thTdStyle = {
    border: "1px solid #555",
    padding: "10px",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Laporan Transaksi Billing</h2>
        {laporan.length > 0 ? (
          <div ref={componentRef}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thTdStyle}>Billing</th>
                  <th style={thTdStyle}>Tanggal</th>
                  <th style={thTdStyle}>Durasi (jam)</th>
                  <th style={thTdStyle}>Harga per Jam</th>
                  <th style={thTdStyle}>Subtotal</th>
                  <th style={thTdStyle}>Metode Pembayaran</th>
                  <th style={thTdStyle}>Foto</th>

                </tr>
              </thead>
              <tbody>
                {laporan.map((t) => (
                  <tr key={t.id}>
                    <td>{t.nama_unit}</td>
                    <td>{new Date(t.start_time).toLocaleString()}</td>
                    <td>{t.durasi}</td>
                    <td>{t.harga_per_jam}</td>
                    <td>{t.subtotal}</td>
                    <td>{t.metode_pembayaran}</td>
                    <td>
                      {t.foto ? (
                        <img
                          src={`http://localhost:3001/uploads/${t.foto}`}
                          alt="foto"
                          style={{ width: "80px", borderRadius: "6px" }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>Loading data...</div>
        )}
      </div>

      {laporan.length > 0 && (
        <button onClick={handleExportPdf} style={buttonStyle}>
          Cetak Laporan ke PDF
        </button>
      )}
    </div>
  );
};

export default Laporan;
