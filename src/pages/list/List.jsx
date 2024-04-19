import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import { Navigate } from 'react-router-dom';

const List = () => {
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
        <Datatable />
      </div>
    </div>
  );
};

export default List;
