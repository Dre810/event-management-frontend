import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Reports.css';

const dummyReports = [
  {
    eventName: 'City Park Concert',
    date: '2025-09-12',
    ticketsSold: 89,
    revenue: 89000,
  },
  {
    eventName: 'Nairobi Food Festival',
    date: '2025-09-25',
    ticketsSold: 142,
    revenue: 142000,
  },
  {
    eventName: 'Kisumu Music Fest',
    date: '2025-10-05',
    ticketsSold: 201,
    revenue: 201000,
  },
];

export default function Reports() {
  const totalRevenue = dummyReports.reduce((sum, r) => sum + r.revenue, 0);
  const totalTickets = dummyReports.reduce((sum, r) => sum + r.ticketsSold, 0);

  const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.text('Event Sales Report', 14, 20);

  const tableData = dummyReports.map((event) => [
    event.eventName,
    event.date,
    event.ticketsSold,
    `KES ${event.revenue.toLocaleString()}`,
  ]);

  tableData.push([
    'Total',
    '',
    totalTickets,
    `KES ${totalRevenue.toLocaleString()}`,
  ]);

  autoTable(doc, {
    head: [['Event Name', 'Date', 'Tickets Sold', 'Revenue']],
    body: tableData,
    startY: 30,
  });

  doc.save('Event_Sales_Report.pdf');
};


  return (
    <div className="reports-page">
      <h1>📊 Event Sales Report</h1>

      <button className="download-btn" onClick={handleDownloadPDF}>
        📥 Download PDF
      </button>

      <table className="report-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Tickets Sold</th>
            <th>Revenue (KES)</th>
          </tr>
        </thead>
        <tbody>
          {dummyReports.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{event.date}</td>
              <td>{event.ticketsSold}</td>
              <td>{event.revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td><strong>{totalTickets}</strong></td>
            <td><strong>{totalRevenue.toLocaleString()}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
