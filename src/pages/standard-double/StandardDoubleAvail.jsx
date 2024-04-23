import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';

const StandardDoubleAvail = () => {
  const [contactData, setContactData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user ID and token from local storage...');
        const storedUserId = localStorage.getItem('userID');
        const storedToken = localStorage.getItem('authToken');

        if (!storedUserId || !storedToken) {
          console.error('User ID or token not found in local storage');
          return;
        }

        console.log(
          'User ID and token retrieved from local storage:',
          storedUserId,
          storedToken
        );

        const response = await axios.get(
          `https://hic-backend.onrender.com/getbookedRoomsByroomType/661902052831864696c9ff72`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.data.status && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((room) => ({
            ...room,
            bookedDate: formatDate(room.bookedDate),
          }));
          setContactData(formattedData);
          console.log('Contact data:', formattedData);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filter out unwanted keys
  const filteredKeys =
    contactData.length > 0
      ? Object.keys(contactData[0]).filter(
          (key) =>
            ![
              'roomType',
              '_id',
              'notAvailableRooms',
              'createdAt',
              '__v',
              'updatedAt',
              'isDeleted',
              'is_Available',
            ].includes(key)
        )
      : [];

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current page of items
  const currentItems = contactData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='container mx-auto max-w-6xl'>
      {isLoading ? (
        <p>Loading...</p>
      ) : contactData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {filteredKeys.map((key) => (
                  <TableCell
                    key={key}
                    className='bg-orange-400 uppercase'
                    style={{ fontWeight: 'bold' }}
                  >
                    {key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-orange-50' : 'bg-white'}
                >
                  {filteredKeys.map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={filteredKeys.length} align='center'>
                  <Pagination
                    count={Math.ceil(contactData.length / itemsPerPage)} // Calculate total number of pages
                    page={currentPage}
                    onChange={handleChangePage}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default StandardDoubleAvail;
