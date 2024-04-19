import React, { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    // Clear the user session data from local storage
    localStorage.removeItem('userData');

    // Redirect to the specified URL after logout
    window.location.href = 'https://hic2.netlify.app/';
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
