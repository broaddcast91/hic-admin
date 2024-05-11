import './sidebar.scss';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { MdEventAvailable } from 'react-icons/md';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { MdEditCalendar } from 'react-icons/md';

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
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
          <Link to='/users' style={{ textDecoration: 'none' }}>
            <li>
              <MeetingRoomIcon className='icon' />
              <span>Rooms</span>
            </li>
          </Link>

          <Link to='/updateroom' style={{ textDecoration: 'none' }}>
            <li>
              <MdEditCalendar className='icon' />
              <span>Availability</span>
            </li>
          </Link>

          <Link to='/booking' style={{ textDecoration: 'none' }}>
            <li>
              <AddBusinessIcon className='icon' />
              <span>Booking Requests</span>
            </li>
          </Link>
          <Link to='/banquet' style={{ textDecoration: 'none' }}>
            <li>
              <AddBusinessIcon className='icon' />
              <span>Banquet Hall Enquiry</span>
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

          <p className='title'>USER</p>

          <Link to='/logout' style={{ textDecoration: 'none' }}>
            <li>
              <ExitToAppIcon className='icon' />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      {/* <div className='bottom'>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'LIGHT' })}
        ></div>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'DARK' })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
