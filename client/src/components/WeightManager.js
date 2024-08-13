import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';
import citiesData from './cities.json';

const WeightManager = () => {
  const [weights, setWeights] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [form, setForm] = useState({
    destination_city: '',
    state_code: '',
    region: ''
  });

  const cities = citiesData.map((item) => item.city);

  const cityToStateCode = citiesData.reduce((acc, { city, stateCode }) => {
    acc[city] = stateCode;
    return acc;
  }, {});

  useEffect(() => {
    fetchWeights();
  }, []);

  const fetchWeights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/weights');
      setWeights(response.data);
    } catch (error) {
      console.error('Error fetching weights:', error);
      alert('Failed to fetch weights. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/weights/${id}`);
      fetchWeights();
    } catch (error) {
      console.error('Error deleting weight entry:', error);
      alert('Failed to delete weight entry. Please try again later.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOpenDialog = (entry = null) => {
    setCurrentEntry(entry);
    setForm({
      destination_city: entry ? entry.destination_city : '',
      state_code: entry ? entry.state_code : '',
      region: entry ? entry.region : ''
    });
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', form); // Log form data to check values
    
    try {
      // Handle both create and update
      if (currentEntry && currentEntry.id) {
        await axios.put(`http://localhost:5000/weights/${currentEntry.id}`, form);
      } else {
        await axios.post('http://localhost:5000/weights', form);
      }
      fetchWeights();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving weight entry:', error);
      alert('Failed to save weight entry. Please try again later.');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEntry(null);
  };
    const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="main-content">
     <button
      onClick={() => handleOpenDialog()}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? '#007bff' : '#fc3737', // Blue on hover, orange otherwise
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Smooth transition for color change
      }}
    >
      Add New Weight
    </button>
      <table>
        <thead>
          <tr>
            <th>Destination City</th>
            <th>State Code</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(weights) && weights.map((weight) => (
            <tr key={weight.id}>
              <td>{weight.destination_city}</td>
              <td>{weight.state_code}</td>
              <td>{weight.region}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpenDialog(weight)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(weight.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentEntry ? 'Edit Weight Entry' : 'Add Weight Entry'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option}
              value={form.destination_city}
              onChange={(event, newValue) => {
                setForm(prevForm => ({
                  ...prevForm,
                  destination_city: newValue || '',
                  state_code: cityToStateCode[newValue] || ''
                }));
              }}
              inputValue={form.destination_city}
              onInputChange={(event, newInputValue) => {
                setForm(prevForm => ({
                  ...prevForm,
                  destination_city: newInputValue,
                  state_code: cityToStateCode[newInputValue] || prevForm.state_code
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Destination City"
                  name="destination_city"
                  fullWidth
                  required
                />
              )}
              freeSolo
            />
            <TextField
              margin="dense"
              label="State Code"
              name="state_code"
              type="text"
              fullWidth
              value={form.state_code}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              label="Region"
              name="region"
              select
              fullWidth
              value={form.region}
              onChange={handleFormChange}
              required
            >
              <MenuItem value="Coimbatore & Local">Coimbatore & Local</MenuItem>
              <MenuItem value="Tamil Nadu & Pondicherry">Tamil Nadu & Pondicherry</MenuItem>
              <MenuItem value="Kerala & Karnataka">Kerala & Karnataka</MenuItem>
              <MenuItem value="Andhra Pradesh & Telangana">Andhra Pradesh & Telangana</MenuItem>
              <MenuItem value="North">North</MenuItem>
              <MenuItem value="West">West</MenuItem>
              <MenuItem value="East">East</MenuItem>
              <MenuItem value="North East">North East</MenuItem>
              <MenuItem value="Special Location">Special Location</MenuItem>
            </TextField>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeightManager;