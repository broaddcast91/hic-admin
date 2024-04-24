import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
// import Chart from '../../components/chart/Chart';

import SuitSingleAvail from '../suit-single/SuitSingleAvail';

const SuitSingle = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='title'>Deluxe Suite Single</h1>
          <SuitSingleAvail />
        </div>
      </div>
    </div>
  );
};

export default SuitSingle;
