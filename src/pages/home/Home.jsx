import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import { Navigate } from 'react-router-dom';

const Home = () => {
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
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='widgets'>
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='earning' />
          <Widget type='balance' />
        </div>
        <div className='charts'>
          <Featured />
          <Chart title='Last 6 Months (Revenue)' aspect={2 / 1} />
        </div>
        <div className='listContainer'>
          <div className='listTitle'>Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
