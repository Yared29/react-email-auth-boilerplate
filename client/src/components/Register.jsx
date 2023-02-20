import React from 'react';

const Register = () => {
  return (
    <div className='container'>
      <h1>Create a new account</h1>
      <div className='form-container'>
        <label for='fullname'>Full Name</label>
        <input
          type='text'
          id='fullname'
          name='fullname'
          placeholder='Your fullname..'
        />
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

export default Register;
