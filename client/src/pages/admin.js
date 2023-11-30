import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import AdminVisaCard from '../components/ui/adminVisaCard';

const AdminPage = () => {
  const [visas, setVisas] = useState([]);
  const [category, setCategory] = useState('pending');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all visas from your API
        const response = await axios.get('https://kenyaevisa.mytests.online/api/allVisas');
        setVisas(response.data);
        console.log(visas)
      } catch (error) {
        console.error('Error fetching visas:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredVisas = visas.filter((visa) => visa.status === category);

  const handleSignOut = () => {
    // Clear the admin data from local storage
    localStorage.removeItem('adminData');
     window.location.href = '/signin'; // Uncomment this line if you want to redirect to the sign-in page
  };


  return (
    <div style={{ overflow: 'auto', padding: 10, marginTop: "80px",  minHeight: '100vh', }}>
      <FormControl variant="outlined">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="pending">Pending Visas</MenuItem>
          <MenuItem value="processed">Processed Visas</MenuItem>
        </Select>
      </FormControl>

      {filteredVisas.map((visa) => (
        <AdminVisaCard key={visa._id} visa={visa} />
      ))}


<Button variant="outlined" onClick={handleSignOut} style={{ marginTop: '10px' }}>
        Sign Out
      </Button>
    </div>
  );
};

export default AdminPage;
