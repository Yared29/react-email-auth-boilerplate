import React from 'react';

export const LogIn = () => {
  return (
    <div className='container'>
      <h1>Login into your account</h1>
      <div className='form-container'>
        <label for='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Your email..'
        />
        <label for='password'>Password</label>
        <input
          type='text'
          id='password'
          name='password'
          placeholder='Your password..'
        />
        <button>Register</button>
      </div>
    </div>
  );
};
