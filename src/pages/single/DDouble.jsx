import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';


import DelDoubleAvail from '../del-double/DelDoubleAvail';

const DDouble = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='title'>Deluxe Double</h1>
          <DelDoubleAvail />
        </div>
      </div>
    </div>
  );
};

export default DDouble;
