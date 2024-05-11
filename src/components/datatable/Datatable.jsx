// import React, { useState, useEffect } from 'react';
// import './datatable.scss';
// import { DataGrid } from '@mui/x-data-grid';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { userColumns, userRows } from '../../datatablesource';

// import { Dialog } from '@headlessui/react';

// /**
//  * Datatable component that displays room data fetched from an API.
//  * It includes functionality to fetch room details and display them in a DataGrid component.
//  */
// const Datatable = () => {
//   // State to hold the data fetched from the API
//   const [data, setData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null); // State to hold selected row data
//   const [price, setPrice] = useState('');
//   const [roomType, setRoomType] = useState('');
//   const [isPriceValid, setIsPriceValid] = useState(false); // State to manage price validity
//   const [errorMessage, setErrorMessage] = useState('');

//   // Function to handle opening the dialog and set selected row data
//   const handleOpenDialog = (rowData) => {
//     setSelectedRow(rowData);
//     setRoomType(rowData.username);
//     setPrice(rowData.price !== null && rowData.price !== undefined ? rowData.price : ''); // Set price to the price data of the selected row
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   useEffect(() => {
//     // Reset state when dialog is opened
//     if (openDialog) {
//       setPrice('');
//       setIsPriceValid(false);
//     }
//   }, [openDialog]);
//   /**
//    * Effect hook to fetch room data when the component mounts.
//    * It fetches room details along with their prices and updates the state.
//    */
//   useEffect(() => {
//     const fetchData = async () => {
//       // Retrieve authentication token and user ID from local storage
//       const token = localStorage.getItem('authToken');
//       const storedUserId = localStorage.getItem('userID');

//       try {
//         // Fetch room data from the API
//         const response = await axios.get(
//           `https://hic-backend.onrender.com/getRooms/${storedUserId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const prices = response.data.data;

//         // Map over the original rows to include price information
//         const updatedData = userRows.map((row) => {
//           const priceInfo = prices.find((price) => price._id === row.ObjectID);
//           return {
//             ...row,
//             price: priceInfo ? priceInfo.price : null, // Add price information to each row
//           };
//         });

//         // Update state with the new data including prices
//         console.log(updatedData);
//         setData(updatedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this effect runs once on mount

//   // Define the action column for the DataGrid
//   const actionColumn = [
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 200,
//       renderCell: (params) => {
//         // Render a link for each row's action
//         return (
//           <div className='cellAction'>
//             <Link to={params.row.link} style={{ textDecoration: 'none' }}>
//               <div className='viewButton'>View Status</div>
//             </Link>
//             <button
//               onClick={() => handleOpenDialog(params.row)}
//               className='deleteButton'
//             >
//               Edit
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   // const userRows = [
//   //   {
//   //     id: 1,
//   //     username: 'Standard Single',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Standard+Single/128',
//   //     status: 'available',
//   //     roomid: 'HIC-SS',
//   //     available: 10,
//   //     link: '/viewstandardsingleavail',
//   //     ObjectID: '661901d82831864696c9ff70',
//   //   },
//   //   {
//   //     id: 2,
//   //     username: 'Standard Double',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Standard+Double/128',
//   //     roomid: 'HIC-SD',
//   //     status: 'no-room',
//   //     available: 6,
//   //     link: '/viewstandardoubleavail',
//   //     ObjectID: '661902052831864696c9ff72',
//   //   },
//   //   {
//   //     id: 3,
//   //     username: 'Executive Single',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Executive-Single/128',
//   //     roomid: 'HIC-ES',
//   //     status: 'on-hold',
//   //     available: 4,
//   //     link: '/viewexecutivesingleavail',
//   //     ObjectID: '661902282831864696c9ff74',
//   //   },
//   //   {
//   //     id: 4,
//   //     username: 'Executive Double',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Executive-Double/128',
//   //     roomid: 'HIC-ED',
//   //     status: 'available',
//   //     available: 4,
//   //     link: '/viewexecutivedoubleavail',
//   //     ObjectID: '661902402831864696c9ff76',
//   //   },
//   //   {
//   //     id: 5,
//   //     username: 'Deluxe Single',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Deluxe-Single/128',
//   //     roomid: 'HIC-DS',
//   //     status: 'no-room',
//   //     available: 3,
//   //     link: '/viewdeluxesingleavail',
//   //     ObjectID: '661902732831864696c9ff78',
//   //   },
//   //   {
//   //     id: 6,
//   //     username: 'Deluxe Double',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Deluxe-Double/128',
//   //     roomid: 'HIC-DD',
//   //     status: 'available',
//   //     available: 2,
//   //     link: '/viewdeluxedoubleavail',
//   //     ObjectID: '661902892831864696c9ff7a',
//   //   },
//   //   {
//   //     id: 7,
//   //     username: 'Suite Single',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Suit-Single/128',
//   //     roomid: 'HIC-SS',
//   //     status: 'no-room',
//   //     available: 2,
//   //     link: '/viewsuitesingleavail',
//   //     ObjectID: '6619029d2831864696c9ff7c',
//   //   },
//   //   {
//   //     id: 8,
//   //     username: 'Suite Double',
//   //     img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Suit-Double/128',
//   //     roomid: 'HIC-SD',
//   //     status: 'available',
//   //     available: 1,
//   //     link: '/viewsuitedoubleavail',
//   //     ObjectID: '661902bf2831864696c9ff7e',
//   //   },
//   // ];

//   const handlePriceChange = (e) => {
//     const inputPrice = e.target.value;
//     if (inputPrice.length <= 4 && /^\d*$/.test(inputPrice)) {
//       setPrice(inputPrice);
//       setIsPriceValid(true);
//       setErrorMessage('');
//     } else {
//       setIsPriceValid(false);
//       setErrorMessage('Please enter a valid price (four digits)');
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle submit logic
//   };

//   // Render the datatable component
//   return (
//     <div className='datatable'>
//       <div className='datatableTitle'>Rooms</div>
//       {/* Render the DataGrid with the fetched data */}
//       <DataGrid
//         className='datagrid'
//         rows={data}
//         columns={userColumns.concat(actionColumn)} // Combine original columns with the action column
//         pageSize={9}
//         rowsPerPageOptions={[9]}
//         checkboxSelection
//       />
//       {/* Dialog component for updating price */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         {/* Overlay with a higher z-index */}
//         <div
//           className='fixed inset-0 bg-black opacity-30 z-50'
//           onClick={handleCloseDialog}
//         ></div>
//         {/* Dialog content */}
//         <div className='dialogContent bg-white rounded-lg p-8 w-96'>
//           <Dialog.Title className='text-xl font-bold mb-4 text-orange-600'>
//             Edit Price
//           </Dialog.Title>
//           <Dialog.Description>
//             {/* Form for updating the price */}
//             <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
//               {/* Input field for selecting room type */}
//               <div>
//                 <label
//                   htmlFor='roomType'
//                   className='block text-sm font-medium text-gray-700'
//                 >
//                   Room Type:
//                 </label>
//                 <select
//                   id='roomType'
//                   name='roomType'
//                   className='mt-1 p-2 block w-full border-gray-300 rounded-3xl border shadow-sm focus:ring-orange-500 focus:border-orange-500'
//                   value={roomType}
//                   onChange={(e) => setRoomType(e.target.value)}
//                 >
//                   {/* Map over userRows and render username options */}
//                   {userRows.map((row) => (
//                     <option key={row.ObjectID} value={row.username}>
//                       {row.username}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* Input field for updating the price */}
//               <div>
//                 <label
//                   htmlFor='price'
//                   className='block text-sm font-medium text-gray-700'
//                 >
//                   Price:
//                 </label>
//                 <input
//                   type='number'
//                   id='price'
//                   name='price'
//                   className='mt-1 p-1 block w-full border-gray-300 rounded-3xl shadow-sm focus:ring-orange-500 focus:border-orange-500 border'
//                   value={price}
//                   onChange={handlePriceChange}
//                   maxLength={4}
//                 />
//                 {/* Error message */}
//                 {errorMessage && (
//                   <p className='text-red-500 text-sm'>{errorMessage}</p>
//                 )}
//               </div>
//               {/* Buttons to update the price and close */}
//               <div className='flex justify-center mt-10'>
//                 <button
//                   type='submit'
//                   className={`bg-orange-500 text-white px-4 py-2 rounded-3xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-xl ${
//                     isPriceValid ? '' : 'opacity-50 cursor-not-allowed'
//                   }`}
//                   disabled={!isPriceValid}
//                 >
//                   Update Price
//                 </button>
//                 <button
//                   className='closeButton bg-white text-red-600 border px-4 py-2 rounded-3xl ml-4 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-xl'
//                   onClick={handleCloseDialog}
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </Dialog.Description>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default Datatable;
