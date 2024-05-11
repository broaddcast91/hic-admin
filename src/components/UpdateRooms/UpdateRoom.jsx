import './updateroom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
// import Chart from '../../components/chart/Chart';
import UpdateForm from '../updatedatatable/UpdateForm';
import AvailTable from '../table/AvailTable';

const UpdateRoom = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />

        <div className='bottom'>
          <h1 className='pageTitle'>Create Availability</h1>
          <UpdateForm />
        </div>
        <div className='bottom'>
          <h1 className='pageTitle'>Edit Availability</h1>
          <AvailTable />
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
