import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { isEmpty } from '../utils/isEmpty';
import { BASE_URL } from '../constants';

const LogIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState({});
  const [verificationSentResponse, setVerificationSentResponse] = useState({});

  const handleSubmitForm = (values) => {
    setIsLoading(true);
    const userData = {
      email: values.email,
      password: values.password,
    };
    console.log(userData);
    axios
      .post(`${BASE_URL}/user/login`, userData)
      .then(async (response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsLoading(false);
        navigate('/chat');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          !isEmpty(error) &&
            !isEmpty(error.response) &&
            !isEmpty(error.response.data) &&
            !isEmpty(error.response.data.message) &&
            setLoginError({
              message: error.response.data.message,
              statusCode: error.response.status,
            });
          setVerificationSentResponse({});
          console.log('server responded');
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
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: (values) => handleSubmitForm(values),
  });

  const handleResendVerification = () => {
    setIsLoading(true);
    const userData = {
      email: formik.values.email,
      password: formik.values.password,
    };
    console.log(userData);
    axios
      .post(`${BASE_URL}/user/verify/resend`, userData)
      .then(async (response) => {
        // await localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response);
        setIsLoading(false);
        setVerificationSentResponse({
          message: response.data.message,
          statusCode: response.status,
        });
        setLoginError({});
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          !isEmpty(error) &&
            !isEmpty(error.response) &&
            !isEmpty(error.response.data) &&
            !isEmpty(error.response.data.message) &&
            setVerificationSentResponse({
              message: error.response.data.message,
              statusCode: error.response.status,
            });
          setLoginError({});
          console.log('server responded');
        } else if (error.request) {
          console.log('network error');
        } else {
          console.log(error);
        }

        setIsLoading(false);
      });
  };

  return (
    <div className='container'>
      <h1>Login into your account</h1>
      {!isEmpty(loginError) ? (
        <div className='my-4 mx-2 p-2 text-base  bg-red-300'>
          <div>{loginError.message}</div>
          {loginError.statusCode === 403 ? (
            <div>
              <div className='inline-block align-baseline font-bold text-sm'>
                Didn't get email verification?{' '}
                <button
                  className=' text-blue-500 hover:text-blue-800 cursor-pointer'
                  onClick={handleResendVerification}
                >
                  Resend
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {!isEmpty(verificationSentResponse) ? (
        <div
          className={`  ${
            verificationSentResponse.statusCode === 200 ||
            verificationSentResponse.statusCode === 202
              ? 'text-success'
              : verificationSentResponse.statusCode === 201
              ? 'text-normal'
              : 'text-error'
          }`}
        >
          <div>{verificationSentResponse.message}</div>
        </div>
      ) : (
        <></>
      )}

      <form
        className='form-container'
        onSubmit={formik.handleSubmit}
      >
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

        {isLoading ? (
          <div className=''>
            <h1>Loading</h1>
          </div>
        ) : (
          <button type='submit'>Login</button>
        )}
        {!isLoading ? (
          <div className=' '>
            Don't have an account?{' '}
            <Link
              className=' '
              to='/register'
            >
              Register
            </Link>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default LogIn;
