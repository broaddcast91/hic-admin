import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';


import DelSingleAvail from '../del-single/DelSingleAvail';

const DSingle = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='title'>Deluxe Single</h1>
          <DelSingleAvail />
        </div>
      </div>
    </div>
  );
};

export default DSingle;
