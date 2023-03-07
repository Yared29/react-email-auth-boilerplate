import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { isEmpty } from '../utils/isEmpty';
import { BASE_URL } from '../constants';

const Register = () => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = (values) => {
    setIsLoading(true);
    setVerificationSent(false);
    const userData = {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      retypePassword: values.retypePassword,
    };

    axios
      .post(`${BASE_URL}/user/register`, userData)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setVerificationSent(true);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log('server responded');
          if (
            !isEmpty(error) &&
            !isEmpty(error.response) &&
            !isEmpty(error.response.data) &&
            !isEmpty(error.response.data.errors) &&
            !isEmpty(error.response.data.type)
          ) {
            if (error.response.data.type === 'FORM_ERROR') {
              formik.setErrors(error.response.data.errors);
            }
          }
        } else if (error.request) {
          console.log('network error');
        } else {
          console.log(error);
        }
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required('Required'),
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      retypePassword: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: (values) => handleSubmitForm(values),
  });

  return (
    <div className='container'>
      <form
        className='form-container'
        onSubmit={formik.handleSubmit}
      >
        <h1>Register</h1>
        {verificationSent ? (
          <div className='text-success'>
            Verification code sent successfully to your email.
          </div>
        ) : (
          <></>
        )}
        <div className='input-container'>
          <label htmlFor='fullname'>Full Name</label>
          <input
            type='text'
            id='fullname'
            name='fullname'
            placeholder='Your fullname..'
            onChange={formik.handleChange}
            value={formik.values.fullname}
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <p className='form-error-text'>{formik.errors.fullname}</p>
          )}
        </div>
        <div className='input-container'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Your email..'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className='form-error-text'>{formik.errors.email}</p>
          )}
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Your password..'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <p className='form-error-text'>{formik.errors.password}</p>
          )}
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Retype Password</label>
          <input
            type='password'
            id='retypePassword'
            name='retypePassword'
            placeholder='Your password..'
            onChange={formik.handleChange}
            value={formik.values.retypePassword}
          />
          {formik.errors.retypePassword && formik.touched.retypePassword && (
            <p className='form-error-text'>{formik.errors.retypePassword}</p>
          )}
        </div>
        {isLoading ? (
          <div className=''>
            <div class='lds-dual-ring'></div>
          </div>
        ) : (
          <button type='submit'>Register</button>
        )}
        {!isLoading ? (
          <div className='toggle-text'>
            Already have an account?{' '}
            <Link
              className='toggle-button'
              to='/login'
            >
              Login
            </Link>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default Register;
