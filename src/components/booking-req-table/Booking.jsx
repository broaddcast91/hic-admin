import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import axios from 'axios';
// import { AiOutlineMenu } from "react-icons/ai";
import { BiRefresh } from 'react-icons/bi';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const Booking = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [sub, setSub] = useState(false);

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
          `https://hic-backend.onrender.com/getGuest/${storedUserId}`,
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

  const handleStatusChange = (row, newStatus) => {
    const token = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userID');

    setSub(true);
    axios
      .put(
        `https://hic-backend.onrender.com/updateStatus/${row.id}/${storedUserId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const statusOptions = ['Pending', 'Approved', 'Rejected'];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const columns = [
    { field: 'no', headerName: 'Sr. No.', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'checkindate',
      headerName: 'CheckIn',
      width: 150,
      renderCell: (params) => formatDate(params.row.checkindate),
    },
    {
      field: 'checkoutdate',
      headerName: 'CheckOut',
      width: 150,
      renderCell: (params) => formatDate(params.row.checkoutdate),
    },
    { field: 'roomtype', headerName: 'Room', width: 230 },
    // { field: "message", headerName: "Message", width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row, e.target.value)}
          style={{
            backgroundColor:
              params.row.status === 'Pending'
                ? '#f8f8ea'
                : params.row.status === 'Approved'
                ? '#ddebdc'
                : '#fff5f4',
            fontSize: '1.0rem',
            border: 'none', // Remove the border
            width: '9.0rem',
            height: '2rem',
            // marginLeft: "-.25rem",
            color:
              params.row.status === 'Pending'
                ? '#dcaa2e' // Example color for Pending status
                : params.row.status === 'Approved'
                ? '#058105' // Example color for Approved status
                : '#dc143c', // Example color for Rejected status
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    { field: 'date', headerName: 'Date', width: 110 },
    { field: 'time', headerName: 'Time', width: 110 },
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
    a.download = 'Booking Request.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Custom toolbar with the download button

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
              // getRowHeight={() => "auto"}
              rows={rows}
              columns={columns}
              components={{ Toolbar: CustomToolbar }}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default Booking;
