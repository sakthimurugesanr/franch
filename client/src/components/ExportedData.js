import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ExportedData = ({ exportData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate Total RS_PS
  const totalRSPS = useMemo(() => {
    return exportData.reduce((total, row) => total + parseFloat(row.RS_PS || 0), 0);
  }, [exportData]);

  // Calculate CGST, SGST, and Grand Total
  const CGST = totalRSPS * 0.09;
  const SGST = totalRSPS * 0.09;
  const grandTotal = totalRSPS + CGST + SGST;

  return (
    <div>
      <button  onClick={handleClickOpen}>
        Show Exported Data
      </button>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Exported Data</DialogTitle>
        <DialogContent>
          <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '24px' }}> <span style={{ color: 'orange ' }}>FRANCH</span><span style={{ color: 'blue ' }}>EXPRESS</span> </h1>
              <p>SENTHUR AGENCIES</p>
              <p>96/114, SAMPATH MILL, THENNAMPALAYAM ROAD, ANNUR-641653</p>
              <p>CELL: 9042088099, 9942788520</p>
              <p>PAN No: BNKPS4314M, GSTIN: 33BNKPS4314M1ZO</p>
            </div>

            {/* Recipient and Invoice Information */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <p><strong>TO:</strong></p>
                <p>M/s. PREETHI DESIGNERS</p>
                <p>132/3-B, AM COLONY</p>
                <p>VOC STREET, ANNUR-641653</p>
                <p>GSTIN: 33GQDPPS510D1ZR</p>
              </div>
              <div>
                <p><strong>DATE:</strong> 10-07-2024</p>
                <p><strong>BILL NO:</strong> 35</p>
                <p><strong>PERIOD:</strong> JUN24-2</p>
              </div>
            </div>

            {/* Table Data */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>S.No</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Order_ID</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Cannote_No</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Destination</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Weight</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>RS_PS</th>
                </tr>
              </thead>
              <tbody>
                {exportData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.S_No}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.Date}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.Order_ID}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.Cannote_No}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.Destination}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.Weight}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.RS_PS}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Calculation Section */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <p><strong>TOTAL: </strong>{totalRSPS.toFixed(2)}</p>
              <p><strong>CGST 9%: </strong>{CGST.toFixed(2)}</p>
              <p><strong>SGST 9%: </strong>{SGST.toFixed(2)}</p>
              <p><strong>GRAND TOTAL: </strong>{grandTotal.toFixed(2)}</p>
            </div>

            {/* Footer Section */}
            <div style={{ marginTop: '20px' }}>
              <p>Issues cheque's or dd's SENTHUR AGENCIES, BANK OF BARODA, ANNUR br.</p>
              <p>ACC NO: 55060200000292, IFSC: BARB0ANNURX.</p>
              <p>FOR SENTHUR AGENCIES</p>
              <p style={{ textAlign: 'right' }}>PROPRIETOR</p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handlePrint} color="primary" variant="contained">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExportedData;