import './updateroom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
// import Chart from '../../components/chart/Chart';
import UpdateForm from '../updatedatatable/UpdateForm';
// import List from '../../components/table/Table';

const UpdateRoom = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='pageTitle'>Create Rooms</h1>
          <UpdateForm />
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
