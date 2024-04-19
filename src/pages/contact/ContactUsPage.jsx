import './contactus.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
// import Chart from '../../components/chart/Chart';
import { Navigate } from 'react-router-dom';

import ContactList from '../../components/contact-us-table/ContactTable';

const ContactUsPage = () => {
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
        {/* <div className='top'>
          <div className='left'>
            <div className='editButton'>Edit</div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img
                src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                alt=''
                className='itemImg'
              />
              <div className='details'>
                <h1 className='itemTitle'>Krishna</h1>
                <div className='detailItem'>
                  <span className='itemKey'>Email:</span>
                  <span className='itemValue'>janedoe@gmail.com</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Phone:</span>
                  <span className='itemValue'>+1 2345 67 89</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Address:</span>
                  <span className='itemValue'>
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Country:</span>
                  <span className='itemValue'>USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3 / 1} title='User Spending ( Last 6 Months)' />
          </div>
        </div> */}
        <div className='bottom'>
          <h1 className='pageTitle'>Contact Us</h1>
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
