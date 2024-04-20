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
} from '@mui/material';

const ContactTable = () => {
  const [contactData, setContactData] = useState([]);
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
          `https://hic-backend.onrender.com/getContactUs/${storedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        const { data } = response.data; // Extracting data from the response

        if (data) {
          console.log('Contact data fetched successfully');
          setContactData(data); // Setting contact data to the extracted data
        } else {
          console.error('Contact data not found in the response');
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
                {Object.keys(contactData[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {contactData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  {Object.values(row).map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ContactTable;
