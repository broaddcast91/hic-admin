import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';


import ExeDoubleAvail from '../exe-double/ExeDoubleAvail';

const EDouble = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='title'>Executive Double</h1>
          <ExeDoubleAvail />
        </div>
      </div>
    </div>
  );
};

export default EDouble;
