import './availability.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
// import Chart from '../../components/chart/Chart';
import List from '../../components/table/AvailTable';
import { Navigate } from 'react-router-dom';

const Availability = () => {
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
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='pageTitle'>Availability</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Availability;
