import './contactable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ContactList = () => {
  const rows = [
    {
      id: 1143155,
      product: 'Single Room',
      img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '1 March',
      amount: 785,
      method: 'Cash on Delivery',
      status: 'Approved',
    },
    {
      id: 2235235,
      product: 'Single Room',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSkQioZ5788cxvvxaTNv27bDm11yX5pcUOrNF8z0wvQ&s',
      customer: 'Subramani',
      date: '1 March',
      amount: 900,
      method: 'Online Payment',
      status: 'Pending',
    },
    {
      id: 2342353,
      product: 'Double Room',
      img: 'https://pbs.twimg.com/media/F-pXGZOaMAEvuyT.jpg:large',
      customer: 'Elisa Das',
      date: '1 March',
      amount: 35,
      method: 'Cash on Delivery',
      status: 'Pending',
    },
    {
      id: 2357741,
      product: 'Exclusive Single',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSieiF5eMlyldihGMtjXFcD3m1rm1tTmk5oftqqOwn0XQ&s',
      customer: 'Antony Das',
      date: '1 March',
      amount: 920,
      method: 'Online',
      status: 'Approved',
    },
    {
      id: 2342355,
      product: 'Exclusive Single',
      img: 'https://i.pinimg.com/736x/0e/a2/1a/0ea21a68dc0f9a85540f6c51938bbd8e.jpg',
      customer: 'Leo Das',
      date: '1 March',
      amount: 2000,
      method: 'Online',
      status: 'Pending',
    },
  ];
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>Tracking ID</TableCell>
            <TableCell className='tableCell'>Product</TableCell>
            <TableCell className='tableCell'>Customer</TableCell>
            <TableCell className='tableCell'>Date</TableCell>
            <TableCell className='tableCell'>Amount</TableCell>
            <TableCell className='tableCell'>Payment Method</TableCell>
            <TableCell className='tableCell'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='tableCell'>{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.img} alt='' className='image' />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className='tableCell'>{row.customer}</TableCell>
              <TableCell className='tableCell'>{row.date}</TableCell>
              <TableCell className='tableCell'>{row.amount}</TableCell>
              <TableCell className='tableCell'>{row.method}</TableCell>
              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactList;
