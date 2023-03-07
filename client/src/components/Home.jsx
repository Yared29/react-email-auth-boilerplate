import React from 'react';

const Home = () => {
  const handleLogout = async () => {
    await localStorage.removeItem('user');

    window.location.reload();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h1
          style={{
            padding: '10px',
            margin: '10px',
          }}
        >
          Home
        </h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 style={{ paddingRight: '10px' }}>Fullname : </h3>
        <h3>{JSON.parse(localStorage.getItem('user')).fullname}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 style={{ paddingRight: '10px' }}>Email : </h3>
        <h3>{JSON.parse(localStorage.getItem('user')).email}</h3>
      </div>
      <div>
        <div
          onClick={handleLogout}
          className='toggle-button'
          style={{ fontSize: '25px' }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Home;
