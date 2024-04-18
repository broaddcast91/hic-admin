import './feedback.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const FeedbackTable = () => {
  const rows = [
    {
      id: 1143155,
      date: '12/2/2024',
      name: 'Varada',
      phone: 9185236341,
      email: 'varadaraj@gmail.com',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSkQioZ5788cxvvxaTNv27bDm11yX5pcUOrNF8z0wvQ&s',
      roomtype: 'Single Room',
      roomno: 'SS101',
      rating: '4',
      status: 'Approved',
      subject: 'Room Service',
      comments: 'Room Spray name?',
    },
    {
      id: 1143155,
      date: '12/2/2024',
      name: 'Devaraj',
      phone: 9185236341,
      email: 'salaar@gmail.com',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSkQioZ5788cxvvxaTNv27bDm11yX5pcUOrNF8z0wvQ&s',
      roomtype: 'Suite',
      roomno: 'SS101',
      rating: '5',
      status: 'Approved',
      subject: 'Laundry',
      comments: 'My dupatta is missing',
    },
    {
      id: 1143155,
      date: '12/2/2024',
      name: 'Aadhya',
      phone: 9185236341,
      email: 'cuteaadhya@gmail.com',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSkQioZ5788cxvvxaTNv27bDm11yX5pcUOrNF8z0wvQ&s',
      roomtype: 'Single Room',
      roomno: 'SS101',
      rating: '4',
      status: 'Approved',
      subject: 'Food',
      comments: 'Breakfast is good',
    },
    {
      id: 1143155,
      date: '12/2/2024',
      name: 'Rudra',
      phone: 9185236341,
      email: 'rockingrudra@gmail.com',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSkQioZ5788cxvvxaTNv27bDm11yX5pcUOrNF8z0wvQ&s',
      roomtype: 'Executive Room',
      roomno: 'SS101',
      rating: '2',
      status: 'Pending',
      subject: 'Room Service',
      comments: 'Need extra blanket',
    },
    {
      id: 1143155,
      date: '12/2/2024',
      name: 'Raja',
      phone: 9185236341,
      email: 'rajasalaar@gmail.com',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSkQioZ5788cxvvxaTNv27bDm11yX5pcUOrNF8z0wvQ&s',
      roomtype: 'Suite',
      roomno: 'SS101',
      rating: '4',
      status: 'Pending',
      subject: 'Room Service',
      comments: 'Hi room service is good',
    },
  ];
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Id
            </TableCell>

            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Date
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Name
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Phone
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Email
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Room Type
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Room No
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Room Status
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Rating
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Subject
            </TableCell>
            <TableCell
              className='tableCell'
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Comments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='tableCell'>{row.id}</TableCell>
              <TableCell className='tableCell'>{row.date}</TableCell>
              <TableCell className='tableCell'>{row.name}</TableCell>
              <TableCell className='tableCell'>{row.phone}</TableCell>
              <TableCell className='tableCell'>{row.email}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.img} alt='' className='image' />
                  {row.roomtype}
                </div>
              </TableCell>
              <TableCell className='tableCell'>{row.roomno}</TableCell>

              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
              <TableCell className='tableCell'>{row.rating}</TableCell>
              <TableCell className='tableCell'>{row.subject}</TableCell>
              <TableCell className='tableCell'>{row.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackTable;
