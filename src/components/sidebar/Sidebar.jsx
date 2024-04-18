import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import StoreIcon from '@mui/icons-material/Store';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
// import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { MdEventAvailable } from 'react-icons/md';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FeedbackIcon from '@mui/icons-material/Feedback';

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <img
            src='https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/innercircle/new/images/inner-circle-logo.webp'
            alt=''
            srcset=''
            className='logo'
          />
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <li>
            <DashboardIcon className='icon' />
            <span>Dashboard</span>
          </li>
          <p className='title'>LISTS</p>
          <Link to='/users' style={{ textDecoration: 'none' }}>
            <li>
              <MeetingRoomIcon className='icon' />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to='/availability' style={{ textDecoration: 'none' }}>
            <li>
              <MdEventAvailable className='icon' />
              <span>Availability</span>
            </li>
          </Link>
          <Link to='/booking' style={{ textDecoration: 'none' }}>
            <li>
              <AddBusinessIcon className='icon' />
              <span>Booking Requests</span>
            </li>
          </Link>
          <Link to='/contactus' style={{ textDecoration: 'none' }}>
            <li>
              <ContactMailIcon className='icon' />
              <span>Contact us</span>
            </li>
          </Link>
          <Link to='/feedback' style={{ textDecoration: 'none' }}>
            <li>
              <FeedbackIcon className='icon' />
              <span>Feedback</span>
            </li>
          </Link>
          {/* <p className='title'>USEFUL</p>
          <li>
            <InsertChartIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className='icon' />
            <span>Notifications</span>
          </li>
          <p className='title'>SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className='icon' />
            <span>Settings</span>
          </li> */}
          <p className='title'>USER</p>
          <li>
            <AccountCircleOutlinedIcon className='icon' />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'LIGHT' })}
        ></div>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'DARK' })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
