import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';


import ExeSingleAvail from '../exe-single/ExeSingleAvail';

const ESingle = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='title'>Executive Single</h1>
          <ExeSingleAvail />
        </div>
      </div>
    </div>
  );
};

export default ESingle;
