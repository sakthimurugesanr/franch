import React, { useState, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Slide, CircularProgress } from '@mui/material';
import FileUpload from './FileUpload';
import ExportedData from './ExportedData';  // Import the new component

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd');
};

const formatAmount = (amount) => {
  const number = parseFloat(amount);
  return isNaN(number) ? '0.00' : number.toFixed(2);
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} timeout={20} />
));

const sortByDate = (order) => (a, b) => {
  const dateA = new Date(a.order_date);
  const dateB = new Date(b.order_date);
  return order === 'asc' ? dateA - dateB : dateB - dateA;
};

const DataTable = () => {
  const [data, setData] = useState([]);
  const [editingData, setEditingData] = useState([]);
  const [deleting, setDeleting] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [exportData, setExportData] = useState([]);  // State to hold exported data

  useEffect(() => {
    setEditingData([...data].sort(sortByDate(sortOrder)));
  }, [data, sortOrder]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/waybills');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleExport = useCallback(() => {
    const exportData = data.map((row, index) => ({
      S_No: index + 1,
      Date: formatDate(row.order_date),
      Order_ID: row.order_id,
      Cannote_No: `${row.waybill_no}`,
      Destination: row.destination_city,
      Weight: row.weight,
      RS_PS: formatAmount(row.amount)
    }));

    setExportData(exportData);  // Store the data in the state

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const headers = {
      A1: 'S.No',
      B1: 'Date',
      C1: 'Order_ID',
      D1: 'Cannote_No',
      E1: 'Destination',
      F1: 'Weight',
      G1: 'RS_PS'
    };

    for (const [cell, value] of Object.entries(headers)) {
      worksheet[cell].v = value;
    }

    worksheet['!cols'] = [
      { width: 10 }, { width: 15 }, { width: 15 }, { width: 20 },
      { width: 20 }, { width: 10 }, { width: 15 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Waybill Data');
    XLSX.writeFile(workbook, 'Waybill_Data.xlsx');
  }, [data]);

  const handleDelete = useCallback((waybill_no) => {
    setDeleting(waybill_no);
    setOpenDeleteDialog(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await fetch(`http://localhost:5000/waybills/${deleting}, { method: 'DELETE' }`);
      setData(prevData => prevData.filter(item => item.waybill_no !== deleting));
      setOpenDeleteDialog(false);
      setDeleting(null);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  }, [deleting]);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleting(null);
  };

  const handleExportAndDelete = useCallback(async () => {
    handleExport();

    try {
      await fetch('http://localhost:5000/waybills', { method: 'DELETE' });
      setData([]);
      console.log('All records deleted successfully');
    } catch (error) {
      console.error('Error deleting records:', error);
    }
  }, [handleExport]);

  const handleInputChange = (index, field, value) => {
    const newData = [...editingData];
    newData[index][field] = value;
    setEditingData(newData);
  };

  const handleSaveChanges = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all(editingData.map(item => 
        fetch(`http://localhost:5000/waybills/${item.waybill_no}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      ));
      alert('Update successfully');
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error updating data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [editingData, fetchData]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="datatable">
      <FileUpload onDataFetched={fetchData} />
      <button onClick={handleExportAndDelete}>Export</button>
      <button onClick={handleSaveChanges}>Update</button>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
                  Date {sortOrder === 'asc' ? '▲' : '▼'}
                </th>
                <th>Order_ID</th>
                <th>Cannote_No</th>
                <th>Destination City</th>
                <th>Weight</th>
                <th>RS/PS</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {editingData.map((row, index) => (
                <tr key={row.waybill_no}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="date"
                      value={formatDate(row.order_date)}
                      onChange={(e) => handleInputChange(index, 'order_date', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.order_id}
                      onChange={(e) => handleInputChange(index, 'order_id', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.waybill_no}
                      onChange={(e) => handleInputChange(index, 'waybill_no', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.destination_city}
                      onChange={(e) => handleInputChange(index, 'destination_city', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.weight}
                      onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.amount}
                      onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDelete(row.waybill_no)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} TransitionComponent={Transition}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this record?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
      <ExportedData exportData={exportData} />  {/* Render the new component and pass the exported data */}
    </div>
  );
};

export default DataTable;