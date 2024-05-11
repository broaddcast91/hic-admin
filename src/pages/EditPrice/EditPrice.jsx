import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import axios from 'axios';

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
import './editprice.scss';

const userRows = [
  {
    id: 1,
    username: 'Standard Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Standard+Single/128',
    status: 'available',
    roomid: 'HIC-SS',
    available: 10,
    link: '/viewstandardsingleavail',
    ObjectID: '661901d82831864696c9ff70',
  },
  {
    id: 2,
    username: 'Standard Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Standard+Double/128',
    roomid: 'HIC-SD',
    status: 'no-room',
    available: 6,
    link: '/viewstandardoubleavail',
    ObjectID: '661902052831864696c9ff72',
  },
  {
    id: 3,
    username: 'Executive Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Executive-Single/128',
    roomid: 'HIC-ES',
    status: 'on-hold',
    available: 4,
    link: '/viewexecutivesingleavail',
    ObjectID: '661902282831864696c9ff74',
  },
  {
    id: 4,
    username: 'Executive Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Executive-Double/128',
    roomid: 'HIC-ED',
    status: 'available',
    available: 4,
    link: '/viewexecutivedoubleavail',
    ObjectID: '661902402831864696c9ff76',
  },
  {
    id: 5,
    username: 'Deluxe Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Deluxe-Single/128',
    roomid: 'HIC-DS',
    status: 'no-room',
    available: 3,
    link: '/viewdeluxesingleavail',
    ObjectID: '661902732831864696c9ff78',
  },
  {
    id: 6,
    username: 'Deluxe Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Deluxe-Double/128',
    roomid: 'HIC-DD',
    status: 'available',
    available: 2,
    link: '/viewdeluxedoubleavail',
    ObjectID: '661902892831864696c9ff7a',
  },
  {
    id: 7,
    username: 'Suite Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Suit-Single/128',
    roomid: 'HIC-SS',
    status: 'no-room',
    available: 2,
    link: '/viewsuitesingleavail',
    ObjectID: '6619029d2831864696c9ff7c',
  },
  {
    id: 8,
    username: 'Suite Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Suit-Double/128',
    roomid: 'HIC-SD',
    status: 'available',
    available: 1,
    link: '/viewsuitedoubleavail',
    ObjectID: '661902bf2831864696c9ff7e',
  },
];

const EditPrice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [sub, setSub] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [updatedTotalRooms, setUpdatedTotalRooms] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authToken');
        const storedUserId = localStorage.getItem('userID');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        setLoading(true);
        const res = await axios.get(
          `https://hic-backend.onrender.com/getRooms/${storedUserId}`,
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
    // setUpdatedTotalRooms(row.totalRooms); // Set the initial value to the current total rooms
    setIsPopupOpen(true);
  };

  const handleEditLink = (row) => {
    const matchedRow = userRows.find((userRow) => userRow.ObjectID === row._id);
    if (matchedRow && matchedRow.link) {
      window.location.href = matchedRow.link;
    } else {
      // Handle case when no matching row or link is found
      console.error('No matching row or link found.');
    }
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
      console.log('Updating the room price:', selectedRow._id); // Use the updated value from the dropdown
      console.log('selectedRow:', selectedRow);
      console.log('storedUserId:', storedUserId);
      setSub(true);
      const requestData = {
        _id: selectedRow._id,
        price: selectedRow.price, // Assuming the price is also updated from the dropdown
      };
      await axios
        .put(
          `https://hic-backend.onrender.com/updateRooms/${storedUserId}?roomID=${selectedRow._id}`,
          requestData, // Use the updated value from the dropdown
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
                    _id: selectedRow._id,
                    price: selectedRow.price,
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

  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // }

  // const roomTypeMapping = {
  //   '661901d82831864696c9ff70': 'Standard Room | Single',
  //   '661902052831864696c9ff72': 'Standard Room | Double',
  //   '661902282831864696c9ff74': 'Executive room | Single',
  //   '661902402831864696c9ff76': 'Executive room | Double',
  //   '661902732831864696c9ff78': 'Deluxe Room | Single',
  //   '661902892831864696c9ff7a': 'Deluxe Room | Double',
  //   '6619029d2831864696c9ff7c': 'Deluxe Suite | Single',
  //   '661902bf2831864696c9ff7e': 'Deluxe Suite | Double',
  // };

  const columns = [
    { field: 'no', headerName: 'Sr. No.', width: 90 },
    { field: '_id', headerName: 'Rooms', flex: 4 },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      renderCell: (params) => (
        <span className=''>
          ₹ <span className='font-bold'>{params.value}</span>
        </span>
      ),
    },
    {
      field: 'view',
      headerName: 'View Status',
      flex: 2,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditLink(params.row)}
          size='small'
          color='black'
          marginLeft='20px'
        >
          <button className='bg-orange-400 rounded-3xl hover:bg-orange-700 text-white text-sm font-light py-2 px-4'>
            View
          </button>
        </IconButton>
      ),
    },
    {
      field: 'edit',
      headerName: 'Update Price',
      flex: 2,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditClick(params.row)}
          size='small'
          color='black'
          marginLeft='20px'
        >
          <button className='bg-red-400 hover:bg-orange-700 text-white font-light py-2 px-4 text-sm rounded-3xl'>
            Edit
          </button>
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
          <Dialog.Panel className='fixed inset-1/3 w-1/3 bg-white p-6 rounded-3xl shadow-lg'>
            {/* Dialog Title */}
            <Dialog.Title className='text-lg font-semibold mb-4 text-orange-500'>
              Edit Price
            </Dialog.Title>
            {/* Dialog Description and Form */}
            <Dialog.Description className='text-gray-600 mb-6'>
              Update the Price of the Room Section
            </Dialog.Description>
            {/* Form Input */}
            {/* Form Input */}

            <input
              type='number'
              value={selectedRow ? selectedRow.price : ''}
              onChange={(e) => {
                // Correctly update the selectedRow state with the new value
                setSelectedRow({
                  ...selectedRow,
                  price: e.target.value,
                });
              }}
              className='w-24 px-5 py-2 border rounded-3xl focus:outline-none focus:ring focus:ring-blue-300'
            />

            {/* Save and Cancel buttons */}
            <div className='flex justify-end mt-4'>
              <button
                onClick={handleClose}
                className='px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-3xl hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400'
              >
                Cancel
              </button>
              <button
                onClick={handleClose}
                className='px-4 py-2 bg-orange-400 text-white rounded-3xl hover:bg-orange-600 focus:outline-none focus:ring focus:ring-blue-300'
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

export default EditPrice;
