import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import Availability from './pages/availability/Availability';
import BookingRequests from './pages/booking-requests/BookingRequests';
import ContactUsPage from './pages/contact/ContactUsPage';

import FeedbackComp from './pages/feedback/FeedbackComp';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='users'>
              <Route index element={<List />} />
              <Route path=':userId' element={<Single />} />
              <Route
                path='new'
                element={<New inputs={userInputs} title='Add New User' />}
              />
            </Route>
            <Route path='availability'>
              <Route index element={<Availability />} />
              <Route path=':productId' element={<Availability />} />
              <Route
                path='new'
                element={<New inputs={productInputs} title='Add New Product' />}
              />
            </Route>
            <Route path='booking'>
              <Route index element={<BookingRequests />} />
              <Route path=':productId' element={<Availability />} />
              <Route
                path='new'
                element={<New inputs={productInputs} title='Add New Product' />}
              />
            </Route>
            <Route path='contactus'>
              <Route index element={<ContactUsPage />} />
              <Route path=':productId' element={<Availability />} />
              <Route
                path='new'
                element={<New inputs={productInputs} title='Add New Product' />}
              />
            </Route>
            <Route path='feedback'>
              <Route index element={<FeedbackComp />} />
              <Route path=':productId' element={<Availability />} />
              <Route
                path='new'
                element={<New inputs={productInputs} title='Add New Product' />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
