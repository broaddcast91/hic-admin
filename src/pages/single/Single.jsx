import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

// import List from '../../components/table/Table';

import StandardSingleAvail from '../standard-single/StandardSingleAvail';

const Single = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='title'>Standard Single</h1>
          <StandardSingleAvail />
        </div>
      </div>
    </div>
  );
};

export default Single;
