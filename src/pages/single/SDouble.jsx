import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

// import List from '../../components/table/Table';

import StandardDoubleAvail from '../standard-single/StandardSingleAvail';

const SDouble = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='title'>Standard Double</h1>
          <StandardDoubleAvail />
        </div>
      </div>
    </div>
  );
};

export default SDouble;
