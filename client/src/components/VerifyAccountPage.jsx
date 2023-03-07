import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from '../utils/isEmpty';
import { BASE_URL } from '../constants';

const VerifyAccountPage = () => {
  const { confirmationCode } = useParams();
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  const [verificationSentResponse, setVerificationSentResponse] = useState({});

  useEffect(() => {
    console.log('confirm called');
    setIsConfirmationLoading(true);
    axios
      .get(`${BASE_URL}/user/verifyUser/${confirmationCode}`)
      .then((response) => {
        console.log('confirm ', response);
        setIsConfirmationLoading(false);
        setVerificationSentResponse({
          message: response.data.message,
          statusCode: response.status,
        });
      })
      .catch((error) => {
        if (error.response) {
          !isEmpty(error) &&
            !isEmpty(error.response) &&
            !isEmpty(error.response.data) &&
            !isEmpty(error.response.data.message) &&
            setVerificationSentResponse({
              message: error.response.data.message,
              statusCode: error.response.status,
            });

          console.log('confirm er ', error.response);
          console.log('server responded');
        } else if (error.request) {
          console.log('network error');
        } else {
          console.log('confirm error ', error);
        }
        setIsConfirmationLoading(false);
      });
  }, []);
  return (
    <div className='activate-container'>
      {isConfirmationLoading ? (
        <div className='activate-content'>
          <div>
            <div class='lds-dual-ring'></div>
          </div>
          <div>Confirming account ...</div>
        </div>
      ) : (
        <div className='activate-content'>
          <div>Account Verification</div>

          {!isEmpty(verificationSentResponse) ? (
            <div
              className={`text-message ${
                verificationSentResponse.statusCode === 200 ||
                verificationSentResponse.statusCode === 202
                  ? 'text-success'
                  : verificationSentResponse.statusCode === 201
                  ? 'text-normal'
                  : 'text-error'
              }`}
              style={{
                padding: '10px',
                margin: '10px',
              }}
            >
              <div>{verificationSentResponse.message}</div>
            </div>
          ) : (
            <></>
          )}
          {verificationSentResponse.statusCode === 200 ||
          verificationSentResponse.statusCode === 201 ||
          verificationSentResponse.statusCode === 202 ? (
            <div>
              <Link
                to='/login'
                className='toggle-button'
              >
                Go to Sign In
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyAccountPage;
