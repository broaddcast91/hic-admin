import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@headlessui/react';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { BiRefresh } from 'react-icons/bi';

const AvailTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [sub, setSub] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [setUpdatedTotalRooms] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        setLoading(true);
        const res = await axios.get(
          `https://hic-backend.onrender.com/getBookedRooms`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data.data);
        setLoading(false);
        setSub(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [sub]);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setUpdatedTotalRooms(row.totalRooms); // Set the initial value to the current total rooms
    setIsPopupOpen(true);
  };

  //  const handleStatusChange = (row, newStatus) => {
  //     const token = localStorage.getItem('authToken');
  //     const storedUserId = localStorage.getItem('userID');

  //     setSub(true);
  //     axios
  //       .put(
  //         `https://hic-backend.onrender.com/updateStatus/${row.id}/${storedUserId}`,
  //         { tototalRooms: newStatus },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //  };

  const handleClose = async () => {
    if (selectedRow) {
      const token = localStorage.getItem('authToken');
      const storedUserId = localStorage.getItem('userID');
      console.log('Updating total rooms:', selectedRow.noOfRoomsAvailable); // Use the updated value from the dropdown
      console.log('selectedRow:', selectedRow);
      console.log('storedUserId:', storedUserId);
      setSub(true);
      await axios
        .put(
          `https://hic-backend.onrender.com/updateBookings/${selectedRow.id}/${storedUserId}`,
          { noOfRoomsAvailable: selectedRow.noOfRoomsAvailable }, // Use the updated value from the dropdown
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log('Update response:', response);
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedRow.id
                ? {
                    ...item,
                    noOfRoomsAvailable: selectedRow.noOfRoomsAvailable,
                  } // Update the state with the new value
                : item
            )
          );
          setSub(true); // Trigger a re-fetch of data
        })
        .catch((error) => {
          console.error('Update error:', error.message);
          setError(error.message); // Assuming you have an error state set up
        });
    }
    setIsPopupOpen(false);
    setSelectedRow(null);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const roomTypeMapping = {
    '661901d82831864696c9ff70': 'Standard Room | Single',
    '661902052831864696c9ff72': 'Standard Room | Double',
    '661902282831864696c9ff74': 'Executive room | Single',
    '661902402831864696c9ff76': 'Executive room | Double',
    '661902732831864696c9ff78': 'Deluxe Room | Single',
    '661902892831864696c9ff7a': 'Deluxe Room | Double',
    '6619029d2831864696c9ff7c': 'Deluxe Suite | Single',
    '661902bf2831864696c9ff7e': 'Deluxe Suite | Double',
  };

  const columns = [
    { field: 'no', headerName: 'Sr. No.', width: 90 },
    { field: 'totalRooms', headerName: 'Total Rooms', flex: 1 },
    {
      field: 'noOfRoomsAvailable',
      headerName: 'No. of Room Available',
      flex: 1,
    },
    { field: 'notAvailableRooms', headerName: 'Not Available Rooms', flex: 1 },
    {
      field: 'bookedDate',
      headerName: 'Booked Date',
      flex: 1,
      renderCell: (params) => formatDate(params.row.bookedDate),
    },
    {
      field: 'roomType',
      headerName: 'Room',
      flex: 1,
      renderCell: (params) => roomTypeMapping[params.row.roomType] || 'N/A',
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditClick(params.row)}
          size='small'
          color='black'
          marginLeft='20px'
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows = data.map((item, index) => ({
    id: item._id,
    no: index + 1,
    ...item,
  }));

  const handleDownloadCSV = () => {
    const csvData = [];
    const headers = columns.map((column) => column.headerName);
    csvData.push(headers);

    rows.forEach((item) => {
      const row = columns.map((column) => item[column.field]);
      csvData.push(row);
    });

    const csvContent = csvData.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Availability.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <IconButton
          color='primary'
          onClick={handleDownloadCSV}
          sx={{
            marginLeft: '10px',
            backgroundColor: 'white',
            fontSize: '14px',
            padding: '5px',
            minWidth: 'auto',
            height: '25px',
            color: '#fb923c',
            '&:hover': {
              color: '#dc2625',
            },
          }}
        >
          <DownloadIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <div className='flex justify-between md:hidden'>
        <div className='flex'>{/* Additional buttons or components */}</div>
        <div className='flex'>
          <BiRefresh
            className='mx-4 cursor-pointer text-3xl duration-500 hover:rotate-180'
            onClick={() => setSub(true)}
          />
        </div>
      </div>

      <div className='overflow-hidden'>
        <Box
          m='0 20px 0 0'
          height='75vh'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              paddingBottom: '5px',
              paddingTop: '5px',
            },
            '& .MuiDataGrid-columnHeaders': {
              background: '#fb923c',
              borderBottom: 'none',
              color: 'white',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text ': {
              color: '#fb923c',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#e6e6e6',
              borderRadius: '100px',
              height: '5px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#e6e6e6',
            },
          }}
        >
          {loading ? (
            <div>Loading</div>
          ) : error ? (
            'No data found.'
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: CustomToolbar }}
            />
          )}
        </Box>{' '}
        {/* Popup Dialog */}
        <Dialog open={isPopupOpen} onClose={handleClose}>
          {/* Overlay */}
          <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />

          {/* Dialog Panel */}
          <Dialog.Panel className='fixed inset-1/3 w-1/3 bg-white p-6 rounded shadow-lg'>
            {/* Dialog Title */}
            <Dialog.Title className='text-lg font-semibold mb-4 text-gray-800'>
              Edit Details
            </Dialog.Title>

            {/* Dialog Description and Form */}
            <Dialog.Description className='text-gray-600 mb-6'>
              Edit No.of Rooms Available
            </Dialog.Description>

            {/* Form Input */}
            {/* Form Input */}
            <select
              value={selectedRow ? selectedRow.noOfRoomsAvailable : ''}
              onChange={(e) => {
                // Correctly update the selectedRow state with the new value
                setSelectedRow({
                  ...selectedRow,
                  noOfRoomsAvailable: e.target.value,
                });
              }}
              className='w-1/2 px-5 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            >
              {Array.from(
                { length: selectedRow ? selectedRow.totalRooms : 1 },
                (_, i) => i + 1
              ).map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>

            {/* Save and Cancel buttons */}
            <div className='flex justify-end mt-4'>
              <button
                onClick={handleClose}
                className='px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400'
              >
                Cancel
              </button>
              <button
                onClick={handleClose}
                className='px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-blue-300'
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </>
  );
};

export default AvailTable;
