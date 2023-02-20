import React from 'react';

const LogIn = () => {
  return (
    <div className='container'>
      <h1>Login into your account</h1>
      <div className='form-container'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Your email..'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          id='password'
          name='password'
          placeholder='Your password..'
        />
        <button>Login</button>
      </div>
    </div>
  );
};

export default LogIn;
