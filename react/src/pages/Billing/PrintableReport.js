import React from "react";

const PrintableReport = React.forwardRef(({ laporan }, ref) => {
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

  return (
    <div ref={ref} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Laporan Transaksi Billing</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Billing</th>
            <th style={thTdStyle}>Tanggal</th>
            <th style={thTdStyle}>Durasi (jam)</th>
            <th style={thTdStyle}>Harga per Jam</th>
            <th style={thTdStyle}>Subtotal</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PrintableReport;