export const userColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'user',
    headerName: 'Room Type',
    width: 230,
    renderCell: (params) => {
      return (
        <div className='cellWithImg'>
          <img className='cellImg' src={params.row.img} alt='avatar' />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: 'roomid',
    headerName: 'Room Id',
    width: 230,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
  },
  {
    field: 'available',
    headerName: 'Available',
    width: 100,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: 'Standard Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Standard+Single/128',
    status: 'available',
    roomid: 'HIC-SS',
    available: 10,
    link: '/viewstandardsingleavail',
    ObjectID: '661901d82831864696c9ff70',
  },
  {
    id: 2,
    username: 'Standard Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Standard+Double/128',
    roomid: 'HIC-SD',
    status: 'no-room',
    available: 6,
    link: '/viewstandardoubleavail',
    ObjectID: '661902052831864696c9ff72',
  },
  {
    id: 3,
    username: 'Executive Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Executive-Single/128',
    roomid: 'HIC-ES',
    status: 'on-hold',
    available: 4,
    link: '/viewexecutivesingleavail',
    ObjectID: '661902282831864696c9ff74',
  },
  {
    id: 4,
    username: 'Executive Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Executive-Double/128',
    roomid: 'HIC-ED',
    status: 'available',
    available: 4,
    link: '/viewexecutivedoubleavail',
    ObjectID: '661902402831864696c9ff76',
  },
  {
    id: 5,
    username: 'Deluxe Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Deluxe-Single/128',
    roomid: 'HIC-DS',
    status: 'no-room',
    available: 3,
    link: '/viewdeluxesingleavail',
    ObjectID: '661902732831864696c9ff78',
  },
  {
    id: 6,
    username: 'Deluxe Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Deluxe-Double/128',
    roomid: 'HIC-DD',
    status: 'available',
    available: 2,
    link: '/viewdeluxedoubleavail',
    ObjectID: '661902892831864696c9ff7a',
  },
  {
    id: 7,
    username: 'Suite Single',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Suit-Single/128',
    roomid: 'HIC-SS',
    status: 'no-room',
    available: 2,
    link: '/viewsuitesingleavail',
    ObjectID: '6619029d2831864696c9ff7c',
  },
  {
    id: 8,
    username: 'Suite Double',
    img: 'https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Suit-Double/128',
    roomid: 'HIC-SD',
    status: 'available',
    available: 1,
    link: '/viewsuitedoubleavail',
    ObjectID: '661902bf2831864696c9ff7e',
  },
];
