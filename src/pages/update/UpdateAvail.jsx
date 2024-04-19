import './update.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

import { Navigate } from 'react-router-dom';
import UpdateDataTable from '../../components/updatedatatable/UpdateDataTable';

const UpdateAvail = () => {
  // Check if the user is authenticated
  const authToken = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userID');
  console.log(userId);
  console.log(authToken);
  // If authentication token and user ID are not present, redirect to login page
  if (!authToken || !userId) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <UpdateDataTable />
      </div>
    </div>
  );
};

export default UpdateAvail;
