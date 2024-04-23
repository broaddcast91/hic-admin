import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const UpdateForm = () => {
  // State variables for form fields
  const [roomType, setRoomType] = useState('');
  const [noOfRoomsAvailable, SetNoOfRoomsAvailable] = useState('');
  const [totalRooms, SetTotalRooms] = useState('');
  const [bookedDate, setBookedDate] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get userId and token from local storage
    const storedUserId = localStorage.getItem('userID');
    const storedToken = localStorage.getItem('authToken');

    // Create data object for POST request
    const data = {
      // userId: storedUserId,
      totalRooms,
      roomType,
      noOfRoomsAvailable,
      bookedDate,
    };

    try {
      // Make POST request to the backend with token in headers
      const response = await axios.post(
        `https://hic-backend.onrender.com/bookedRooms/${storedUserId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      // Handle success response
      console.log('Reservation successful:', response.data);
      window.alert('Room information updated successfully!');
    } catch (error) {
      // Handle error
      console.error('Error while making reservation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap'>
      <h2 className='text-lg font-semibold mb-4 w-full'>
        Create Room Availability
      </h2>

      {/* Room Type and Number of Available Total Rooms */}
      <div className='mb-4 w-full md:w-1/2 pr-4'>
        <div className='flex'>
          {/* Room Type */}
          <div className='w-full pr-2'>
            <label htmlFor='roomType' className='block mb-1'>
              Select Room Type
            </label>
            <select
              id='roomType'
              className='w-full p-2 border border-gray-300 rounded-3xl'
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value='' disabled>
                Select Room Type
              </option>
              <option value='661901d82831864696c9ff70'>
                Standard Room | Single
              </option>
              <option value='661902052831864696c9ff72'>
                Standard Room | Double
              </option>
              <option value='661902282831864696c9ff74'>
                Executive room | Single
              </option>
              <option value='661902402831864696c9ff76'>
                Executive room | Double
              </option>
              <option value='661902732831864696c9ff78'>
                Deluxe Room | Single
              </option>
              <option value='661902892831864696c9ff7a'>
                Deluxe Room | Double
              </option>
              <option value='6619029d2831864696c9ff7c'>
                Deluxe Suite | Single
              </option>
              <option value='661902bf2831864696c9ff7e'>
                Deluxe Suite | Double
              </option>
            </select>
          </div>
          {/* Number of Available Total Rooms */}
          <div className='w-full pl-2'>
            <label htmlFor='totalRooms' className='block mb-1'>
              Number of Available Total Rooms
            </label>
            <input
              type='number'
              id='totalRooms'
              className='w-full p-2 border border-gray-300 rounded-3xl'
              value={totalRooms}
              onChange={(e) => SetTotalRooms(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Number of Available Rooms and Booked Date */}
      <div className='mb-4 w-full md:w-1/2 pr-4'>
        <div className='flex'>
          {/* Number of Available Rooms */}
          <div className='w-full pr-2'>
            <label htmlFor='noOfRoomsAvailable' className='block mb-1'>
              Number of Available Rooms
            </label>
            <input
              type='number'
              id='noOfRoomsAvailable'
              className='w-full p-2 border border-gray-300 rounded-3xl'
              value={noOfRoomsAvailable}
              onChange={(e) => SetNoOfRoomsAvailable(parseInt(e.target.value))}
            />
          </div>
          {/* Booked Date */}
          <div className='w-full pl-2'>
            <label htmlFor='bookedDate' className='block mb-1'>
              Booked Date
            </label>
            <DatePicker
              selected={bookedDate}
              onChange={(date) => setBookedDate(date)}
              className='w-full p-2 border border-gray-300 rounded-3xl'
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='w-full bg-orange-400 text-white py-2 rounded-3xl hover:bg-orange-600 md:col-span-2'
      >
        Submit
      </button>
    </form>
  );
};

export default UpdateForm;
