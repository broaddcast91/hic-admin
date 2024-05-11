import React, { useState, useEffect } from 'react';
import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userColumns, userRows } from '../../datatablesource';

import { Dialog } from '@headlessui/react';

/**
 * Datatable component that displays room data fetched from an API.
 * It includes functionality to fetch room details and display them in a DataGrid component.
 */
const Datatable = () => {
  // State to hold the data fetched from the API
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // State to hold selected row data

  // Function to handle opening the dialog and set selected row data
  const handleOpenDialog = (rowData) => {
    setSelectedRow(rowData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /**
   * Effect hook to fetch room data when the component mounts.
   * It fetches room details along with their prices and updates the state.
   */
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve authentication token and user ID from local storage
      const token = localStorage.getItem('authToken');
      const storedUserId = localStorage.getItem('userID');

      try {
        // Fetch room data from the API
        const response = await axios.get(
          `https://hic-backend.onrender.com/getRooms/${storedUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const prices = response.data.data;

        // Map over the original rows to include price information
        const updatedData = userRows.map((row) => {
          const priceInfo = prices.find((price) => price._id === row.ObjectID);
          return {
            ...row,
            price: priceInfo ? priceInfo.price : null, // Add price information to each row
          };
        });

        // Update state with the new data including prices
        console.log(updatedData);
        setData(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
  const roomTypes = ['Standard Room', 'Deluxe Room', 'Suite', 'Family Room'];

  // Define the action column for the DataGrid
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        // Render a link for each row's action
        return (
          <div className='cellAction'>
            <Link to={params.row.link} style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View Status</div>
            </Link>
            <button
              onClick={() => handleOpenDialog(params.row)}
              className='deleteButton'
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  // Render the datatable component
  return (
    <div className='datatable'>
      <div className='datatableTitle'>Rooms</div>
      {/* Render the DataGrid with the fetched data */}
      <DataGrid
        className='datagrid'
        rows={data}
        columns={userColumns.concat(actionColumn)} // Combine original columns with the action column
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {/* Dialog component for updating price */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {/* Overlay with a higher z-index */}
        <div
          className='dialogOverlay fixed inset-0 bg-black opacity-30 z-50'
          onClick={handleCloseDialog}
        ></div>
        {/* Dialog content */}
        <div className='dialogContent'>
          <Dialog.Title>Edit Price</Dialog.Title>
          <Dialog.Description>
            {/* Form for updating the price */}
            <form>
              {/* Input field for selecting room type */}
              <label htmlFor='roomType'>Room Type:</label>
              <select id='roomType' name='roomType'>
                {/* Map over room types and render options */}
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {/* Input field for updating the price */}
              <label htmlFor='price'>Price:</label>
              <input type='number' id='price' name='price' />
              {/* Button to update the price */}
              <button type='submit'>Update Price</button>
            </form>
          </Dialog.Description>
          {/* Close button */}
          <button className='closeButton' onClick={handleCloseDialog}>
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Datatable;
